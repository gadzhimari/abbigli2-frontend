import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { Icon } from '../../components-lib';

import TagsSearchForm from '../TagsSearchForm';
import UserSearch from '../UserSearch';

import { __t } from './../../i18n/translator';
import './Search.less';

const propTypes = {
  router: PropTypes.object,
  tagList: PropTypes.array,
  dispatch: PropTypes.func,
  params: PropTypes.object,
};

class Search extends Component {
  constructor() {
    super();
    this.state = {
      mode: 'tags',
      request: '',
      userRequest: '',
      results: [],
      usersOpen: false,
    };
  }

  componentDidMount() {
    document.addEventListener('click', ({ target }) => {
      const search = document.querySelector('.search');
      const { usersOpen } = this.state;

      if ((search && !search.contains(target)) && usersOpen) {
        this.setState({ usersOpen: false });
      }
    });
  }

  onTagsCreated = (tags) => {
    const { router, location: { pathname }, query } = this.props;
    const lastQuery = pathname.includes('/find') ? query : {};

    router.push({
      pathname: '/find',
      query: { ...lastQuery, tags }
    });
  }

  deleteTag = (index) => {
    const { router, query } = this.props;
    const oldTags = (query.tags || '').split(',');

    const tags = [
      ...oldTags.slice(0, index),
      ...oldTags.slice(index + 1)
    ].join(',');

    if (tags.length === 0) {
      router.push('/');
    } else {
      router.push({
        pathname: '/find',
        query: { ...query, tags }
      });
    }
  }

  deleteAllTags = () => {
    const { router } = this.props;
    router.push('/');
  }

  searchByTags = () => {
    const { router, tagList, location } = this.props;
    if (location.pathname.includes('/tags/') && !tagList.length) {
      router.push('/');
      return;
    } else if (!tagList.length) {
      return;
    }

    const link = tagList
      .map(tag => tag.text)
      .join(',');

    router.push(`/tags/${link}/new`);
  }

  searchUsers = () => {
    const { userRequest } = this.state;
    const { router } = this.props;

    router.push({
      pathname: '/people',
      query: {
        user: userRequest,
      },
    });
  }

  search = () => {
    const { mode } = this.state;

    if (mode === 'tags') {
      this.searchByTags();
    } else {
      this.searchUsers();
    }
  }

  clearRes = () => {
    this.setState({
      results: [],
      userRequest: '',
      usersOpen: false,
    });
  }

  changeMode = (mode) => {
    this.setState({ mode });
    this.clearRes();
  }

  changeUserRequest = ({ target }) => {
    this.setState({
      userRequest: target.value,
    });
  }


  render() {
    const { mode, userRequest, results, usersOpen } = this.state;
    const { query } = this.props;

    const shouldResultsOpen = usersOpen && results.length > 0 && userRequest.length > 0;
    const tagList = query.tags || '';

    return (
      <div className={`search ${shouldResultsOpen ? 'open-result' : ''}`}>
        <div className="search-input-wrap">
          <div className="search-hide-scroll" />
          {
            mode === 'tags'
              ? (<TagsSearchForm
                onChange={this.onTagsCreated}
                deleteTag={this.deleteTag}
                deleteAllTags={this.deleteAllTags}
                tags={tagList}
              />)
              : <UserSearch
                search={this.searchUsers}
                onChange={this.changeUserRequest}
                value={this.state.userRequest}
              />
          }
          <div className="search-type">
            <div
              className={"search-tags " + (this.state.mode === 'tags' ? 'active' : '')}
              onClick={() => this.changeMode('tags')}
            >
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.99 16">
                <path d="M13.99,4.698l-0.384,1.71h-2.794l-0.714,3.368h3.053l-0.432,1.709H9.74L8.731,16H6.772l0.985-4.516H4.777 L3.817,16H1.858l0.962-4.516H0l0.344-1.709h2.858L3.88,6.408H0.875l0.356-1.71h3.006L5.221,0h1.984L6.23,4.698h2.981L10.222,0h1.942 l-0.983,4.698H13.99z M8.865,6.408H5.861L5.124,9.775H8.14L8.865,6.408z" />
              </svg>
            </div>
            <div
              className={"search-users " + (this.state.mode == 'profiles' ? 'active' : '')}
              onClick={() => this.changeMode('profiles')}
            >
              <Icon
                size="xs"
                glyph="user"
              />
            </div>
          </div>
          <div
            className="search-submit"
            onClick={this.search}
          >
            {__t('Search')}
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = propTypes;

const mapStateToProps = state => ({
  tagList: state.Search.tagList,
  location: state.Location.location,
  query: state.Location.query,
});

export default withRouter(connect(mapStateToProps)(Search));

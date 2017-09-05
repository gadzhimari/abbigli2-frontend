import React, { Component, PropTypes } from 'react';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import TagsSearchForm from '../TagsSearchForm';
import UserSearch from '../UserSearch';

import { __t } from './../../i18n/translator';
import './Search.styl';

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

      if (!search.contains(target) && usersOpen) {
        this.setState({
          usersOpen: false,
        });
      }
    });
  }

  onTagsCreated = (tags) => {
    const { router, routing } = this.props;
    let lastQuery = {};

    if (routing.pathname.includes('/find')) {
      lastQuery = routing.query;
    }

    router.push({
      pathname: '/find',
      query: Object.assign({}, lastQuery, {
        tags,
        type: 1,
      }),
    });
  }

  deleteTag = (index) => {
    const { routing, router } = this.props;

    const tags = routing.query.tags.split(',');
    const newTags = [...tags.slice(0, index), ...tags.slice(index + 1)];

    if (newTags.length === 0) {
      router.push('/');
    } else {
      router.push({
        pathname: '/find',
        query: Object.assign({}, routing.query, {
          tags: newTags.join(','),
        }),
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

    mode === 'tags'
      ? this.searchByTags()
      : this.searchUsers();
  }

  clearRes = () => {
    this.setState({
      results: [],
      userRequest: '',
      usersOpen: false,
    });
  }

  changeMode = (mode) => {
    this.setState({
      mode,
    });
    this.clearRes();
  }

  changeUserRequest = ({ target }) => {
    this.setState({
      userRequest: target.value,
    });
  }


  render() {
    const { mode, userRequest, results, usersOpen } = this.state;
    const { routing } = this.props;

    const shouldResultsOpen = usersOpen && results.length > 0 && userRequest.length > 0;
    const tagList = (routing && routing.query.tags) || '';

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
                inputClass={'search-input'}
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
              <div className="icon">
                <use href="#users"></use>
              </div>
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
  routing: state.routing.locationBeforeTransitions,
});

export default withRouter(connect(mapStateToProps)(Search));

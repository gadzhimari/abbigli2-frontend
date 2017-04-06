import React, { Component, PropTypes } from 'react';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import equal from 'deep-equal';

import { Link } from 'components';
import TagsSearchForm from '../TagsSearchForm';

import { setTags, deleteTag, deleteAllTags } from 'ducks/Search';

import { API_URL } from 'config';

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
    this.checkLoadedWithTags();

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

  componentDidUpdate(prevProps) {
    const { tagList, params } = this.props;

    if (!equal(prevProps.tagList, tagList)) {
      this.searchByTags();
    }

    if (prevProps.params.tags !== params.tags) {
      this.checkLoadedWithTags();
    }
  }

  onTagsCreated = tags => {
    const { dispatch } = this.props;

    dispatch(setTags(tags));
  }

  checkLoadedWithTags = () => {
    const { dispatch, params } = this.props;

    if (params.tags) {
      const tags = params.tags
        .split(',')
        .map((tag, id) => ({
          text: tag,
          id,
        }));

      dispatch(setTags(tags));
    }
  }

  deleteTag = tagId => {
    const { dispatch } = this.props;

    dispatch(deleteTag(tagId));
  }

  deleteAllTags = () => {
    const { dispatch } = this.props;

    dispatch(deleteAllTags());
  }

  searchByTags = () => {
    const { router, tagList } = this.props;
    if (!tagList.length) {
      router.push('/');
      return;
    }

    const link = tagList
      .map(tag => tag.text)
      .join(',');

    router.push(`/tags/${link}`);
  }

  clearRes = () => {
    this.setState({
      results: [],
      userRequest: '',
      usersOpen: false,
    });
  }

  changeMode = mode => {
    this.setState({
      mode,
    });
    this.clearRes();
  }

  usersInputFocus = () => {
    this.setState({
      usersOpen: true,
    });
  }

  usersInputBlur = () => {
    this.setState({
      usersOpen: false,
    });
  }

  request = (e) => {
    const request = e.target.value;

    this.setState({ userRequest: request });

    if (request.length < 1) {
      this.setState({ results: [] });
    } else {
      fetch(`${API_URL}profiles/?search=${request}`)
        .then(response => {
          if (response.status >= 400) {
            throw new Error('Bad response from server');
          }

          return response.json();
        })
        .then((result) => {
          this.setState({ results: result.results });
        });
    }
  }

  render() {
    const { mode, userRequest, results, usersOpen } = this.state;
    const { tagList } = this.props;

    const shouldResultsOpen = usersOpen && results.length > 0 && userRequest.length > 0;

    return (
      <div className={`search ${shouldResultsOpen ? 'open-result' : ''}`}>
        <div className="search-results">
          {
            (usersOpen && results.length > 0 && userRequest.length > 0)
              ? (results.map(item => (
                <Link
                  key={`${item.id}--usersearch`}
                  className="search-result-people"
                  to={`/profile/${item.id}`}
                  onClick={() => this.clearRes()}
                >
                  <div className="search-result__avatar">
                    {item.avatar
                      ? <img
                        src={`https://abbigli.com/thumbs/unsafe/70x70/${item.avatar}`}
                        alt={item.profile_name}
                      />
                      : <img
                        src={`/images/svg/avatar.svg`}
                        alt={item.profile_name}
                      />
                    }
                  </div>
                  <div className="search-result__name">{item.profile_name}</div>
                  <div className="search-result__city">{item.city && item.city.name}</div>
                </Link>
              )))
              : null
          }
        </div>
        <div className="search-input-wrap">
          <div className="search-hide-scroll"></div>
          {
            mode === 'tags'
              ? (<TagsSearchForm
                onChange={this.onTagsCreated}
                deleteTag={this.deleteTag}
                deleteAllTags={this.deleteAllTags}
                tags={tagList}
              />)
              : (
                <form action="#">
                  <input
                    autoComplete="off"
                    id="header-search"
                    className="search-input"
                    onFocus={this.usersInputFocus}
                    onChange={this.request}
                    type="text"
                    placeholder={__t('users.for.search')}
                    value={userRequest}
                  />
                  <input type="submit" style={{ display: 'none' }} value="" />
                </form>
              )
          }
          <div className="search-type">
            <div
              className={"search-tags " + (this.state.mode === 'tags' ? 'active' : '')}
              onClick={() => this.changeMode('tags')}
            >
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.99 16">
                  <path d="M13.99,4.698l-0.384,1.71h-2.794l-0.714,3.368h3.053l-0.432,1.709H9.74L8.731,16H6.772l0.985-4.516H4.777
                    L3.817,16H1.858l0.962-4.516H0l0.344-1.709h2.858L3.88,6.408H0.875l0.356-1.71h3.006L5.221,0h1.984L6.23,4.698h2.981L10.222,0h1.942
	l-0.983,4.698H13.99z M8.865,6.408H5.861L5.124,9.775H8.14L8.865,6.408z"/>
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
          {
            mode === 'tags'
              ? (
                <div
                  className="search-submit"
                  onClick={this.searchByTags}
                >
                  {__t('Search')}
                </div>
              )
              : null
          }
        </div>
      </div>
    );
  }
}

Search.propTypes = propTypes;

function mapStateToProps(state) {
  return ({
    tagList: state.Search.tagList,
  });
}

export default withRouter(connect(mapStateToProps)(Search));

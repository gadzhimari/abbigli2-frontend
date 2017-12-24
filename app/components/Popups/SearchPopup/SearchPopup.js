import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import debounce from 'lodash/debounce';

import ResultsTags from './ResultsTags';
import ResultsUsers from './ResultsUsers';

import { changeValue, clearValue } from '../../../ducks/Search';

import { API_URL } from '../../../config';
import { __t } from '../../../i18n/translator';

import './SearchPopup.styl';

const parseQuery = (query) => {
  const array = query.split(' ');

  if (array.length === 1) {
    return {
      currentRequest: array[0],
      value: query,
      latestRequest: '',
    };
  }

  return {
    currentRequest: array[array.length - 1],
    latestRequest: array.slice(0, -1).join(' '),
    value: query,
  };
};

class SearchPopup extends Component {
  static propTypes = {
    closePopup: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    tagsValue: PropTypes.string.isRequired,
  };

  state = {
    mode: 'tags',
    showSwitcherDropdown: false,
    results: [],
    requestQuery: {},
    usersValue: '',
    isFetching: true,
    isFetchingUsers: true,
    resultsUsers: [],
  };

  switchMode = ({ currentTarget }) => this.setState({
    mode: currentTarget.dataset.mode,
  })

  swowSwitherDropdown = () => this.setState({
    showSwitcherDropdown: !this.state.showSwitcherDropdown,
  });

  shouldSwitchHide = ({ target }) => {
    if (
      target !== this.switcher
      ||
      !this.switcher.includes(target)
    ) {
      this.setState({
        showSwitcherDropdown: false,
      });
    }
  }

  searchByTags = () => {
    const { router, tagsValue } = this.props;

    if (!tagsValue.length) {
      router.push('/');
      return;
    }

    const link = tagsValue
      .split(' ')
      .join(',');

    router.push({
      pathname: '/find',
      query: Object.assign({}, {
        tags: link,
        type: 1,
      }),
    });
    this.props.closePopup();
  }

  changeInput = ({ target }) => {
    const requestQuery = parseQuery(target.value);

    this.setState({
      requestQuery,
    });

    this.props.dispatch(changeValue(target.value));

    this.fetchTags(requestQuery.currentRequest);
  }

  fetchTags = debounce((request) => {
    if (request.length < 1) return;

    this.setState({
      isFetching: true,
    });

    fetch(`${API_URL}tags/?search=${request}`)
      .then(res => res.json())
      .then((result) => {
        let array = result.results;

        if (array.length < 1) {
          array = this.state.results;
        }

        this.setState({
          results: array,
          isFetching: false,
        });
      });
  }, 400);

  changeUsersInput = ({ target }) => {
    this.setState({
      usersValue: target.value,
    });

    this.fetchUsers(target.value);
  }

  fetchUsers = debounce((request) => {
    if (request.length === 0) return;

    this.setState({
      isFetchingUsers: true,
    });

    fetch(`${API_URL}profiles/?search=${request}`)
      .then(res => res.json())
      .then((results) => {
        let array = results.results;

        if (results.length === 0) {
          array = this.state.resultsUsers;
        }

        this.setState({
          isFetchingUsers: false,
          resultsUsers: array,
        });
      });
  }, 400)

  handleScrollResults = () => this[this.state.mode].blur()

  handleClickToTag = ({ currentTarget }) => {
    this.changeInput({
      target: {
        value: currentTarget.dataset.value,
      },
    });
  }

  handleKeydown = ({ keyCode }) => {
    if (keyCode !== 13) return;

    if (this.state.mode === 'users') {
      this[this.state.mode].blur();
      return;
    }

    this.searchByTags();
  }

  clearValue = () => {
    this.props.dispatch(clearValue());
    this.setState({
      requestQuery: {
        currentRequest: '',
        latestRequest: '',
        value: '',
      },
      results: [],
    });
  }

  render() {
    const { closePopup, tagsValue } = this.props;
    const {
      mode,
      showSwitcherDropdown,
      results,
      requestQuery,
      isFetching,
      usersValue,
      isFetchingUsers,
      resultsUsers,
    } = this.state;
    const tagsModeActive = mode === 'tags';

    return (
      <div className="popup-wrap" id="sendMessage" style={{ display: 'block' }}>
        <div
          className="popup mobile-search__popup"
          onClick={this.shouldSwitchHide}
        >
          <header className="mobile-search__header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14.031"
              className="popup-close icon"
              onClick={closePopup}
            >
              <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z" />
            </svg>
            <div className="popup-title">
              {__t('Search')}
            </div>
          </header>
          <div className="mobile-search__form-wrap">
            {
              mode === 'tags'
                ? <div className="mobile-search__form">
                  <input
                    className="mobile-search__input"
                    onChange={this.changeInput}
                    placeholder={__t('Search')}
                    ref={tags => (this.tags = tags)}
                    onKeyDown={this.handleKeydown}
                    type="text"
                    value={tagsValue}
                  />
                  {
                    tagsValue.length !== 0
                    &&
                    <div
                      className="form__clear"
                      onClick={this.clearValue}
                      onTouchEnd={this.clearValue}
                    >
                      ×
                    </div>
                  }
                </div>
                : <div className="mobile-search__form">
                  <input
                    className="mobile-search__input"
                    onChange={this.changeUsersInput}
                    placeholder={__t('Search')}
                    type="text"
                    value={usersValue}
                    onKeyDown={this.handleKeydown}
                    ref={users => (this.users = users)}
                  />
                </div>
            }
            <div
              className="mobile-search__switcher switcher"
              onClick={this.swowSwitherDropdown}
              ref={switcher => (this.switcher = switcher)}
            >
              {
                tagsModeActive
                  ? __t('by tags')
                  : __t('by people')
              }
              <svg
                className="switcher__icon"
                viewBox="0 0 292.362 292.362"
              >
                <g>
                  <path d="M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424 C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428 s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z" />
                </g>
              </svg>
              {
                showSwitcherDropdown
                &&
                <div className="switcher__dropdown">
                  <div
                    className={`switcher__dropdown-item ${tagsModeActive ? 'active' : ''}`}
                    onClick={this.switchMode}
                    data-mode="tags"
                  >
                    {__t('by tags')}
                  </div>
                  <div
                    className={`switcher__dropdown-item ${tagsModeActive ? '' : 'active'}`}
                    onClick={this.switchMode}
                    data-mode="users"
                  >
                    {__t('by people')}
                  </div>
                </div>
              }
            </div>
          </div>
          {
            tagsModeActive
              ? <ResultsTags
                isFetching={isFetching}
                items={results}
                searchQuery={requestQuery}
                onScroll={this.handleScrollResults}
                onClick={this.handleClickToTag}
              />
              : <ResultsUsers
                isFetching={isFetchingUsers}
                items={resultsUsers}
                searchString={usersValue}
                onScroll={this.handleScrollResults}
                onClick={closePopup}
              />
          }

          {
            tagsModeActive
            &&
            tagsValue.length > 0
            &&
            <div
              className="mobile-search__button"
              onClick={this.searchByTags}
            >
              {__t('Show results')}
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ Search }) => ({
  tagsValue: Search.tagsValue,
});

export default withRouter(connect(mapStateToProps)(SearchPopup));

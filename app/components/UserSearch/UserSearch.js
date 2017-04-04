import React, { Component, PropTypes } from 'react';

import { Link } from 'components';

import { API_URL } from 'config';
import { __t } from './../../i18n/translator';

class UserSearch extends Component {
  static defaultProps = {
    searchFormClass: "user-search",
    resultsWrapperClass: "user-search__results",
    inputClass: "user-search__input",
  }

  constructor() {
    super();
    this.state = {
      results: [],
      isActive: false,
      value: '',
    };
  }

  fetchUsers = ({ target }) => {
    const request = target.value;

    this.setState({
      value: request,
    });

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

  handleFocus = () => {
    this.setState({
      isActive: true,
    });
  }

  handleBlur = ({ relatedTarget }) => {
    if (relatedTarget.classList.contains('search-result-people')) {
      return;
    }

    this.setState({
      isActive: false,
    });
  }

  render() {
    const { value, isActive, results } = this.state;
    const {
      searchFormClass,
      resultsWrapperClass,
      inputClass,
      onResultClick,
    } = this.props;

    const itemTemplate = item => (
      <Link
        className="search-result-people"
        to={`/profile/${item.id}`}
        onClick={onResultClick}
      >
        <div className="search-result__avatar">
          {
            item.avatar
              ? <img
                src={`https://abbigli.com/thumbs/unsafe/70x70/${item.avatar}`}
                alt={item.profile_name}
              />
              : <img
                src={'/images/svg/avatar.svg'}
                alt={item.profile_name}
              />
          }
        </div>
        <div className="search-result__name">
          {item.profile_name}
        </div>
        <div className="search-result__city">
          {item.city && item.city.name}
        </div>
      </Link>
    );

    return (
      <div className={searchFormClass}>
        <input
          autoComplete="off"
          className={inputClass}
          onChange={this.fetchUsers}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          type="text"
          placeholder={__t('users.for.search')}
          value={value}
          ref={input => (this.input = input)}
        />
        {
          (isActive && results.length > 0)
          &&
          <div className={resultsWrapperClass}>
            {results.map(item => itemTemplate(item))}
          </div>
        }
      </div>
    );
  }
}

UserSearch.propTypes = {
  resultsWrapperClass: PropTypes.string,
  searchFormClass: PropTypes.string,
  inputClass: PropTypes.string,
  onResultClick: PropTypes.func,
};

export default UserSearch;

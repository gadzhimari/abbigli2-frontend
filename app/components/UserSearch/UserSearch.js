import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { __t } from './../../i18n/translator';

class UserSearch extends Component {
  static defaultProps = {
    searchFormClass: 'search-form',
    inputClass: 'form__input',
  }

  handlePressEnter = ({ keyCode }) => {
    if (keyCode === 13) {
      this.props.search();
    }
  }

  render() {
    const {
      searchFormClass,
      inputClass,
      onChange,
      value,
    } = this.props;

    return (
      <div className={searchFormClass}>
        <input
          autoComplete="off"
          className={inputClass}
          onChange={onChange}
          type="text"
          placeholder={__t('users.for.search')}
          value={value}
          onKeyDown={this.handlePressEnter}
        />
      </div>
    );
  }
}

UserSearch.propTypes = {
  searchFormClass: PropTypes.string,
  inputClass: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
};

export default UserSearch;

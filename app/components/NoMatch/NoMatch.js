import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { __t } from '../../i18n/translator';

import './NoMatch.less';

class NoMatch extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
  };

  render() {
    const { query } = this.props;

    return (
      <div className="misspell">
        <div className="misspell__wrapper">
          <span className="misspell__icon" />
          <p className="misspell__message">{ __t('Request') } <em className="misspell__query">&laquo;{ query }&raquo;</em> {__t('No.match') }</p>
          <p className="misspell__suggestion">{ __t('Try.reformulate') }</p>
        </div>
      </div>
    );
  }
}

export default NoMatch;

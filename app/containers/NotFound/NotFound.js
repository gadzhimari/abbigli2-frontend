import React, { Component } from 'react';
import { Link } from 'react-router';

import { __t } from '../../i18n/translator';

import './NotFound.less';

class NotFound extends Component {
  render() {
    return (
      <div className="error-page">
        <div className="error-page__back">
          <div className="error-page__text">
            {__t('Sorry, this page not found!')}
          </div>
          <Link
            className="default-button"
            to="/"
          >
            {__t('Go back to home page')}
          </Link>
        </div>
      </div>
    );
  }
}

export default NotFound;

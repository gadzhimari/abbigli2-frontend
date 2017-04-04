import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { __t } from './../../i18n/translator';
import './Agreement.styl';

class Agreement extends Component {
  render() {
    return (
      <div className="container-fluid" id="page-container">
        <Helmet
          title="User Agreement"
        />
        <div className="wrapper agreement">
          <div
            className="row table-view"
            dangerouslySetInnerHTML={{ __html: __t('aggreement.text') }}
          />
        </div>
      </div>
    );
  }
}

export default Agreement;

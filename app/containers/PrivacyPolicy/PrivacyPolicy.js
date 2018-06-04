import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { __t } from './../../i18n/translator';

class PrivacyPolicy extends Component {
  render() {
    return (
      <div className="agreement">
        <Helmet
          title="Privacy Policy"
        />
        <div className="Row">
          <div
            className="Col_s"
            dangerouslySetInnerHTML={{ __html: __t('privacy.text') }}
          />
        </div>
      </div>
    );
  }
}

export default PrivacyPolicy;

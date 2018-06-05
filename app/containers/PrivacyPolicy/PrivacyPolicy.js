import React, { Component } from 'react';

import { __t } from './../../i18n/translator';

class PrivacyPolicy extends Component {
  render() {
    return (
      <div className="agreement">
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

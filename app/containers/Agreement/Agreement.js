import React, { Component } from 'react';

import { __t } from './../../i18n/translator';
import './Agreement.less';

class Agreement extends Component {
  render() {
    return (
      <div className="agreement">
        <div className="Row">
          <div
            className="Col_s"
            dangerouslySetInnerHTML={{ __html: __t('aggreement.text') }}
          />
        </div>
      </div>
    );
  }
}

export default Agreement;

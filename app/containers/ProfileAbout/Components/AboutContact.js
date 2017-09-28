import React from 'react';
import Type from 'prop-types';

import { pure } from 'recompose';

import { __t } from '../../../i18n/translator';

const AboutContact = ({ data }) => {
  return (
    <div className="profile-about__contact">
      <h4 className="profile-about__contact-header">
        {__t('Contact')}
      </h4>
      <div className="profile-about__contact-items">
        <div className="profile-about__contact-item">
          <svg
            className="icon icon-phone"
            viewBox="0 0 227.1 113.7"
            enableBackground="new 0 0 227.1 113.7"
          >
            <path d="M122.6,71.6c-2,0-3.9-0.6-5.7-1.6c-1.7-0.9-3.2-2.1-4.7-3.4c-2.4-2.2-4.5-4.7-6.2-7.5 c-1.2-1.9-2.1-4-2.5-6.2c-0.5-2.9,0-5.6,1.9-8c0.6-0.7,1.2-1.2,1.9-1.8c0.2-0.2,0.5-0.4,0.7-0.6c1-0.7,1.9-0.7,2.8,0.2 c0.8,0.8,1.4,1.8,2,2.7c0.5,0.7,0.9,1.4,1.2,2.2c0.5,1.3,0.2,2.5-0.9,3.5c-0.6,0.5-1.2,1-1.8,1.5c-0.8,0.6-1,1.4-0.8,2.4 c0.2,0.8,0.5,1.4,0.9,2.1c0.7,1.2,1.6,2.3,2.5,3.3c0.9,1,1.8,2,3,2.7c0.5,0.4,1.1,0.7,1.7,0.8c0.8,0.2,1.5,0,2.1-0.6 c0.6-0.6,1.2-1.2,1.9-1.7c0.9-0.8,2-0.9,3.1-0.4c0.8,0.4,1.6,0.9,2.3,1.5c0.7,0.6,1.5,1.2,2.1,2c0.4,0.5,0.8,1,0.9,1.8 c0,0.5-0.1,1-0.5,1.3c-1.2,1.2-2.4,2.4-4,3.1C125.2,71.4,123.9,71.6,122.6,71.6z" />
          </svg>
          {data.phone || __t('Not filled')}
        </div>
        <div className="profile-about__contact-item">
          {data.email || __t('Not filled')}
        </div>
      </div>
    </div>
  );
};

AboutContact.propTypes = {
  data: Type.shape({
    phone: Type.string,
    email: Type.string,
    skype: Type.string,
  }),
};

AboutContact.defaultProps = {
  data: {},
};

export default pure(AboutContact);

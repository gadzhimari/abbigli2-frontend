import React from 'react';
import Type from 'prop-types';

import { pure } from 'recompose';

import ShareButton from '../../../components/Share/Buttons/ShareButton';

import { __t } from '../../../i18n/translator';

const AboutSocial = ({ data, isMe }) => {
  return (
    <div className="profile-about__contact">
      <h4 className="profile-about__contact-header">
        {
          isMe
            ? __t('You in social networks')
            : __t('The user in social networks')
        }
      </h4>
      <div className="profile-about__social-items">
        <a
          className="profile-about__social-item"
          href={data.vk_account}
        >
          <ShareButton
            className="social-btn vkontakte"
            provider="vk"
            link={data.vk_account}
          />
          {'Вконтакте'}
        </a>
        <a
          className="profile-about__social-item"
          href={data.ok_account}
        >
          <ShareButton
            className="social-btn"
            provider="odnoklassniki"
            link={data.ok_account}
          />
          {'Одноклассники'}
        </a>
        <a
          className="profile-about__social-item"
          href={data.fb_account}
        >
          <ShareButton
            className="social-btn"
            provider="facebook"
            link={data.fb_account}
          />
          {'Facebook'}
        </a>
        <a
          className="profile-about__social-item"
          href={data.google_account}
        >
          <ShareButton
            className="social-btn google-plus"
            provider="google"
            link={data.google_account}
          />
          {'Google plus'}
        </a>
      </div>
    </div>
  );
};

AboutSocial.propTypes = {
  data: Type.shape({
    pinterest_account: Type.string,
    vk_account: Type.string,
    google_account: Type.string,
    ok_account: Type.string,
    fb_account: Type.string,
  }),
  isMe: Type.bool,
};

AboutSocial.defaultProps = {
  data: {},
  isMe: false,
};

export default pure(AboutSocial);

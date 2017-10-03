import React from 'react';
import Type from 'prop-types';

import { pure } from 'recompose';

import ShareButton from '../../../components/Share/Buttons/ShareButton';

import { __t } from '../../../i18n/translator';

import { location } from 'config';

const AboutSocial = ({ data, isMe }) => {
  const isRuLocation = location === 'ru';
  const someNetworkExist = ['vk_account', 'ok_account', 'fb_account', 'google_account']
    .some(network => !!data[network]);

  if (!someNetworkExist) return null;

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
        <If condition={data.vk_account && isRuLocation}>
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
        </If>
        <If condition={data.ok_account && isRuLocation}>
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
        </If>
        <If condition={data.fb_account}>
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
        </If>
        <If condition={data.google_account}>
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
        </If>
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

import React from 'react';
import './Banner.styl';

import { __t } from './../../i18n/translator';

function Banner() {
  return (
    <div className="home-page__banner-wrap">
      <div className="home-page__banner">
        <div className="home-page__banner-text">
          <h1 className="home-page__banner-heading">
            {__t('banner.header')}
          </h1>
          {__t('banner.text')}
          <br/>
          <button className="button-banner">
            {__t('banner.button.create')}
          </button>
        </div>
        <a className="main-page__banner-author">{__t('banner.from.blog')} <b>{__t('banner.name')}</b></a>
      </div>
    </div>
  );
}

export default Banner;

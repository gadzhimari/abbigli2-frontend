import React from 'react';
import './index.styl';

import { __t } from './../../i18n/translator';

function BannerOld(props) {
  return (
      <div className="main-page__banner-wrap legacy">
        <div className="main-page__banner-text">
           {__t('bannerOld.text')}
          <button className="button-banner" type="button">{__t('join!')}</button></div>
      </div>
  );
}

export default BannerOld;
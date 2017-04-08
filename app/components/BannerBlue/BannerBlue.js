import React from 'react';
import './BannerBlue.styl';

import { __t } from './../../i18n/translator';

function BannerBlue(props) {
  return (
    <div className="main-page__bannerblue-wrap">
      <div className="main-page__bannerblue">
        <div className="main-page__bannerblue-text">
          {__t('bannerBlue.text')}
          <br/>
          {
            !props.hideJoin
              &&
          <a
            className="join-bannerblue"
            onClick={props.join}
          >
            {__t('join!')}
            <div className="icon"></div>
          </a>
          }
        </div>
      </div>
    </div>
  );
}

export default BannerBlue;

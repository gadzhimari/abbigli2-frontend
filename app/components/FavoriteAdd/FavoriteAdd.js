import React from 'react';
import PropTypes from 'prop-types';

import { __t } from '../../i18n/translator';

import './FavoriteAdd.less';

const FavoriteAdd = ({ toggleFavorite, isFavorited }) => {
  return (
    <div className="favourite-add">
      <div
        className="favourite-button"
        onClick={toggleFavorite}
      >
        <svg className="icon icon-like" viewBox="0 0 20.1 18">
          <path d="M10.1,3.2C10.9,1.3,12.8,0,14.9,0c2.9,0,5,2.4,5.2,5.3c0,0,0.1,0.7-0.2,2c-0.4,1.8-1.4,3.3-2.8,4.5L10,18 l-7-6.2c-1.3-1.2-2.3-2.7-2.8-4.5C-0.1,6,0,5.3,0,5.3C0.3,2.4,2.3,0,5.2,0C7.5,0,9.3,1.3,10.1,3.2z" />
        </svg>
        {
          isFavorited
            ? __t('Post is in favorites')
            : __t('Add to favorites')
        }
      </div>
      <div className="subscription">
        <div className="subscription__icon">
          <svg className="icon icon-sandwich" viewBox="0 0 14 10">
            <path d="M0,10V8h14v2H0z M0,4h14v2H0V4z M0,0h14v2H0V0z" />
          </svg>
        </div>
        <div className="subscription__dropdown">
          <div className="subscription__item">
            Одежда
            <svg className="icon icon-check" viewBox="0 0 8 6">
              <path d="M7.8,1.6l-3,3.8C4.8,5.5,4.7,5.6,4.5,5.8C4.1,6.1,3.6,6,3.3,5.7c0,0,0,0,0,0C3.1,5.6,3,5.5,3,5.4L0.2,2.3 C-0.1,1.9,0,1.2,0.4,0.9c0.4-0.4,1-0.3,1.4,0.2l2.1,2.3l2.3-2.9c0.3-0.4,1-0.5,1.4-0.2C8,0.5,8.1,1.1,7.8,1.6z" />
            </svg>
          </div>
          <div className="subscription__item">
            Сумки
            <svg className="icon icon-check" viewBox="0 0 8 6">
              <path d="M7.8,1.6l-3,3.8C4.8,5.5,4.7,5.6,4.5,5.8C4.1,6.1,3.6,6,3.3,5.7c0,0,0,0,0,0C3.1,5.6,3,5.5,3,5.4L0.2,2.3 C-0.1,1.9,0,1.2,0.4,0.9c0.4-0.4,1-0.3,1.4,0.2l2.1,2.3l2.3-2.9c0.3-0.4,1-0.5,1.4-0.2C8,0.5,8.1,1.1,7.8,1.6z" />
            </svg>
          </div>
          <input className="subscription__input" type="text" placeholder="Новая подборка" />
          <button className="subscription__button" type="button">
            <svg className="icon icon-check" viewBox="0 0 8 6">
              <path d="M7.8,1.6l-3,3.8C4.8,5.5,4.7,5.6,4.5,5.8C4.1,6.1,3.6,6,3.3,5.7c0,0,0,0,0,0C3.1,5.6,3,5.5,3,5.4L0.2,2.3 C-0.1,1.9,0,1.2,0.4,0.9c0.4-0.4,1-0.3,1.4,0.2l2.1,2.3l2.3-2.9c0.3-0.4,1-0.5,1.4-0.2C8,0.5,8.1,1.1,7.8,1.6z" />
            </svg>
          </button >
        </div >
      </div >
    </div >
  );
};

FavoriteAdd.propTypes = {
  isFavorited: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

export default FavoriteAdd;

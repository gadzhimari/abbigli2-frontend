import React from 'react';
import PropTypes from 'prop-types';

import { Share } from 'components';
import { ProductsIcons } from 'components/Icons';
import { DOMAIN_URL } from 'config';

import './Product.less';

const typesUrl = {
  1: 'post',
  3: 'event',
  4: 'blog',
};

const Product = ({
  data,
  priceTemplate,
}) => {
  const name = data.user.profile_name ? data.user.profile_name : `ID: ${data.user.id}`;

  return (
    <div className="post-card">
      <div className="post-card__img-wrap">
        <img
          className="post-card__img"
          src={`${DOMAIN_URL}thumbs/unsafe/292x221/${data.images[0].file}`}
          alt={data.title}
        />
        <div className="share">
          <div className="share__icon" />
          <div className="dropdown-corner" />
          <div className="dropdown">
            <Share
              postLink={`/${typesUrl[data.type]}/${data.slug}`}
              buttonClass="social-btn"
            />
          </div>
        </div >
      </div>
      <div className="post-card__info">
        <a className="post-card__title">
          <ProductsIcons.service className="icon icon-bag" />
          {data.title}
        </a>
        <a className="user">
          <div className="avatar">
            {
              data.user.avatar
                ? <img
                  className="avatar__img"
                  src={`${DOMAIN_URL}thumbs/unsafe/30x30/${data.user.avatar}`}
                  alt={name}
                />
                : <img
                  className="avatar__img"
                  src={'/images/svg/avatar.svg'}
                  alt={name}
                />

            }
          </div>
          {name}
        </a>
        <div className="post-card__price">
          {
            priceTemplate.replace('?', data.price)
          }
        </div>
      </div>
    </div>
  );
};

export default Product;

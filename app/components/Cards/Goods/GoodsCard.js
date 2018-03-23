import React from 'react';

import Link from '../../Link/Link';
import Image from '../../Image';
import Avatar from '../../Avatar';


import './GoodsCard.less';

const typesUrl = {
  1: 'post',
  3: 'event',
  4: 'blog',
};

const GoodsCard = ({
  item,
  priceTemplate,
}) => {
  const imageUrl = item.images && item.images[0] && item.images[0].file;

  return (
    <div className="goods-card">
      <div className="goods-card__header">
        <div className="goods-card__author">
          <Link
            to={`/profile/${item.user.id}`}
            className="avatar"
          >
            <Avatar
              imgClassName="avatar__img"
              avatar={item.user.avatar}
              thumbSize="60x60"
              alt={item.user.profile_name}
            />
          </Link>
          <Link
            to={`/profile/${item.user.id}`}
            className="goods-card__name"
          >
            {item.user.profile_name}
          </Link>
        </div>
      </div>
      <div className="goods-card__img-wrap">
        <Link
          to={`/${typesUrl[item.type]}/${item.slug}`}
        >
          <Image
            className="goods-card__img"
            alt={item.user.profile_name}
            thumbSize="251x207"
            src={imageUrl}
          />
        </Link>
      </div>
      <div className="goods-card__footer">
        <div className="goods-card__info">
          <Link
            to={`/${typesUrl[item.type]}/${item.slug}`}
            className="goods-card__title"
          >
            <div className="icon icon-bag">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 37.96">
                <path d="M32.42,13.96L23.66,0.84C23.281,0.28,22.639,0,22,0c-0.64,0-1.28,0.28-1.661,0.86l-8.76,13.1H2 c-1.1,0-2,0.9-2,2c0,0.18,0.02,0.36,0.08,0.54L5.16,35.04c0.46,1.68,2,2.92,3.84,2.92h26c1.84,0,3.379-1.24,3.859-2.92l5.082-18.54 L44,15.96c0-1.1-0.9-2-2-2H32.42z M16,13.96l6-8.8l6,8.8H16z M22,29.96c-2.2,0-4-1.801-4-4s1.8-4,4-4c2.199,0,4,1.801,4,4 S24.199,29.96,22,29.96z" />
              </svg>
            </div>
            {item.title}
          </Link>
          <div className="goods-card__price">
            {priceTemplate && priceTemplate.replace('?', item.price)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodsCard;

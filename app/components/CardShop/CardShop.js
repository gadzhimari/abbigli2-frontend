import React from 'react';

import {
  Share
} from 'components';

import './CardShop.styl';

function CardShop(props) {
  return (
    <div className="card-shop">
      <div className="card-shop__img">
        <img src="https://abbigli.com/thumbs/unsafe/282x203/https://abbigli.com/thumbs/2FETbIpJwLMKemDo_1UwR_pesyc=/8bd4dfead750473492e8875874ac136a" />
        <Share />
      </div>
      <div className="card-shop__img">
        <div className="card-shop__img-small">
          <img src="https://abbigli.com/thumbs/unsafe/282x203/https://abbigli.com/thumbs/I2Wngy-NLK4XwagtRKY5BWIdgxU=/1e5cb52b258b48428fa34615ebda60c8" />
        </div>
        <div className="card-shop__img-small">
          <img src="https://abbigli.com/thumbs/unsafe/282x203/https://abbigli.com/thumbs/pWCkdnlCJ6PnSeKMNHlbdaU-tXE=/bd9ed66d0f444a6ba316e6dc1e5e5a72" />
        </div>
      </div>
      <div className="card-shop__info">
        <a className="card-shop__avatar">
          <img src="https://abbigli.com/thumbs/unsafe/25x25/http://beta.abbigli.ru/media/profile/b/69b85efa-eb75-4b36-83a8-70a810b78a80.jpg" />
        </a>
        <a className="card-shop__name">Цветочная поляна</a>
        <div className="card-shop__rating">
          <div className="card-shop__rating-active" style="width:84%"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
          <div className="card-shop__rating-star"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
        </div>
        <div className="card-shop__city">Казань</div>
      </div>
    </div>
  );
}

export default CardShop;
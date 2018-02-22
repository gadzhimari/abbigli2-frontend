import React, { PureComponent } from 'react';
import Type from 'prop-types';

import ProductPreview from '../../components/ProductPreview/ProductPreview';
import FavoriteAdd from '../../components/FavoriteAdd';
import Share from '../../components/Share/Share';
import Title from './Title';
import WantButton from './WantButton';
import Price from './Price';
import TagsList from './TagsList';

import { gaSendClickEvent } from '../../lib/analitics';

export default class ProductContent extends PureComponent {
  static propTypes = {
    onWantClick: Type.func,
    onFavoriteClick: Type.func,
    userIsOwner: Type.bool,
    data: Type.shape(),
  }

  onFavoriteClick = () => {
    gaSendClickEvent('product', 'add_to_favotites');
    this.props.onFavoriteClick();
  }

  onShareClick = (e, { socialCode }) => {
    gaSendClickEvent('product', socialCode);
  }

  render() {
    const { data, onWantClick, userIsOwner } = this.props;

    return (
      <div className="product__content" itemScope itemType="http://schema.org/Product">
        <div className="product__row">
          <div className="product__col product__col_size_5">
            <ProductPreview
              images={data.images}
              tags={data.tags}
              title={data.title}
            />
          </div>
          <div className="product__col product__col_size_7">
            <div className="goods-post__info">
              <div className="goods-post__favourite">
                <FavoriteAdd
                  toggleFavorite={this.onFavoriteClick}
                  isFavorited={data.favorite}
                />
              </div>

              <Title title={data.title} />

              <p itemProp="description">
                {data.content}
              </p>

              <div className="goods-post__buttons">
                <Price price={data.price} />

                {!userIsOwner &&
                  <WantButton onClick={onWantClick} />
                }

                <div className="social-networks">
                  <Share
                    buttonClass="social-btn"
                    postLink={data.view_on_site_url}
                    onClick={this.onShareClick}
                  />
                </div>
              </div>

              <TagsList tags={data.tags} />
            </div>
          </div>
        </div>
        <div className="divider" />
      </div>
    );
  }
}

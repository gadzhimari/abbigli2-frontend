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

class ProductContent extends PureComponent {
  static propTypes = {
    onWantClick: Type.func,
    onFavoriteClick: Type.func,
    userIsOwner: Type.bool,
    data: Type.shape(),
  }

  onFavoriteClick = () => {
    gaSendClickEvent('product', 'add_to_favotites');
  }

  onShareClick = (e, { socialCode }) => {
    gaSendClickEvent('product', socialCode);
  }

  render() {
    const {
      onWantClick,
      userIsOwner,
      data: {
        images,
        tags,
        title,
        content,
        price,
        slug,
      },
      ...favoriteAddProps
    } = this.props;
    const imageUrl = images && images[0] && images[0].file;

    return (
      <div className="product__content" itemScope itemType="http://schema.org/Product">
        <div className="product__row">
          <div className="product__col product__col_size_5">
            <ProductPreview
              images={images}
              tags={tags}
              title={title}
            />
          </div>
          <div className="product__col product__col_size_7">
            <div className="goods-post__info">
              <div className="goods-post__favourite">
                <FavoriteAdd
                  {...favoriteAddProps}
                  onClick={this.onFavoriteClick}
                />
              </div>

              <Title title={title} />

              <p itemProp="description">
                {content}
              </p>

              <div className="goods-post__buttons">
                <Price price={price} />

                {!userIsOwner &&
                  <WantButton onClick={onWantClick} />
                }

                <div className="social-networks">
                  <Share
                    buttonClass="social-btn"
                    postLink={`/post/${slug}`}
                    onClick={this.onShareClick}
                    media={imageUrl}
                    description={title}
                  />
                </div>
              </div>

              <TagsList tags={tags} />
            </div>
          </div>
        </div>
        <div className="divider" />
      </div>
    );
  }
}

export default ProductContent;

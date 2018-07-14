import React, { PureComponent } from 'react';

import Button from '../Button';
import { __t } from '../../i18n/translator';

import './FavoriteAdd.less';

class FavoriteAdd extends PureComponent {
  toggleFavorite = () => {
    const { toggleFavorite, slug, onClick, isFetching } = this.props;
    toggleFavorite(slug);

    if (onClick && !isFetching) {
      onClick();
    }
  }

  render() {
    const { isFavorite, isFetching } = this.props;

    return (
      <div className="favourite-add">
        <Button
          className="favourite-button"
          onClick={this.toggleFavorite}
          fetching={isFetching}
        >
          <svg className="icon icon-like" viewBox="0 0 20.1 18">
            <path d="M10.1,3.2C10.9,1.3,12.8,0,14.9,0c2.9,0,5,2.4,5.2,5.3c0,0,0.1,0.7-0.2,2c-0.4,1.8-1.4,3.3-2.8,4.5L10,18 l-7-6.2c-1.3-1.2-2.3-2.7-2.8-4.5C-0.1,6,0,5.3,0,5.3C0.3,2.4,2.3,0,5.2,0C7.5,0,9.3,1.3,10.1,3.2z" />
          </svg>

          {isFavorite ? __t('Post is in favorites') : __t('Add to favorites')}
        </Button>
      </div>
    );
  }
}

export default FavoriteAdd;

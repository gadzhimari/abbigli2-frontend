import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Link from '../../../Link/Link';

import Image from '../../../Image';
import { __t } from '../../../../i18n/translator';

import './Big.less';

class Big extends PureComponent {
  static propTypes = {
    sections: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      preview: PropTypes.string,
      id: PropTypes.number,
    })).isRequired,
    url: PropTypes.string.isRequired,
  };

  render() {
    const { item, url } = this.props;
    const imageUrl = item.images && item.images[0];

    return (
      <div className="promo-tag">
        <div className="promo-tag__img-wrap">
          <Image
            className="promo-tag__img"
            alt={item.title}
            thumbSize="298x238"
            src={imageUrl}
          />
        </div>
        <Link
          className="promo-tag__link promo-tag__link--header"
          to={`${url}/${item.slug}`}
        >
          {item.title}
        </Link>
        <div className="promo-tag__links">
          {
            item.children.slice(0, 4)
              .map(child => <Link
                className="promo-tag__link"
                key={child.id}
                to={`${url}/${item.slug}/${child.slug}`}
              >
                {child.title}
              </Link>)
          }
        </div>
        <Link
          className="promo-tag__link promo-tag__link--all"
          to={`${url}/${item.slug}`}
        >
          {`${__t('Show.all')} >`}
        </Link>
      </div>
    );
  }
}

export default Big;

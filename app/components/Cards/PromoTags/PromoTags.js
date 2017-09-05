import React from 'react';
import PropTypes from 'prop-types';

import { DOMAIN_URL } from 'config';
import './PromoTags.less';

const PromoTags = ({ tags }) => {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="promo-tag">
      <div className="promo-tag__img-wrap">
        <img
          className="promo-tag__img"
          src={`${DOMAIN_URL}thumbs/unsafe/251x207/${tags[0].preview}`}
          alt={tags[0].title}
        />
      </div>
      {
        tags.map(tag => <a className="promo-tag__link" key={tag.id}>{tag.title}</a>)
      }
    </div>
  );
};

PromoTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    preview: PropTypes.string,
    id: PropTypes.number,
  })).isRequired,
};

export default PromoTags;

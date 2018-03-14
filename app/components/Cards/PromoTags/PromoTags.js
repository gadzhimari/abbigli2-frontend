import React from 'react';
import PropTypes from 'prop-types';

import { SubCategoryList } from '../../Cards';
import Link from '../../Link/Link';

import { THUMBS_URL } from '../../../config';
import './PromoTags.less';

const PromoTags = ({ sections, url }) => {
  if (sections.length === 0) {
    return null;
  }

  if (sections.length < 5) {
    return <SubCategoryList items={sections} url={url} />;
  }

  return (
    <div className="promo-tag">
      <div className="promo-tag__img-wrap">
        <img
          className="promo-tag__img"
          src={`${THUMBS_URL}/unsafe/251x207/${sections[0].preview}`}
          alt={sections[0].title}
        />
      </div>
      {
        sections.map(section => <Link
          className="promo-tag__link"
          key={section.id}
          to={`${url}/${section.slug}`}
        >
          {section.title}
        </Link>)
      }
    </div>
  );
};

PromoTags.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    preview: PropTypes.string,
    id: PropTypes.number,
  })).isRequired,
  url: PropTypes.string.isRequired,
};

export default PromoTags;

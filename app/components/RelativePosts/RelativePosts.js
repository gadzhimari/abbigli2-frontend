import React from 'react';
import PropTypes from 'prop-types';

import { __t } from '../../i18n/translator';

const RelativePosts = ({ items, Component, showMoreRelative }) => (
  <div className="section">
    <h2 className="section__name">
      {__t('Relative posts')}
    </h2>
    <div className="cards-wrap">
      {
        items
          .slice(0, 4)
          .map(post => <Component
            data={post}
            legacy
            key={`${post.id}--blog`}
          />)
      }
      {
        items.length > 4
        &&
        <button
          className="default-button"
          type="button"
          onClick={showMoreRelative}
        >
          {__t('Show more')}
        </button>
      }
    </div>
  </div>
);

RelativePosts.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  Component: PropTypes.element.isRequired,
  showMoreRelative: PropTypes.func.isRequired,
};

export default RelativePosts;

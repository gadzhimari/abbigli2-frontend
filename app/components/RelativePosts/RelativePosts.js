import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { __t } from '../../i18n/translator';

class RelativePosts extends PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    Component: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.node]),
    slug: PropTypes.string.isRequired,
    itemProps: PropTypes.shape({
      priceTemplate: PropTypes.string,
    }),
  }

  static defaultProps = {
    itemProps: {},
  }

  render() {
    const { items, Component, slug, itemProps } = this.props;

    if (items.length === 0) return null;

    return (
      <div className="section">
        <h2 className="section__name">
          {__t('Relative posts')}
        </h2>

        <div className="cards-wrap">
          {items.slice(0, 4)
            .map(post => <Component
              data={post}
              legacy
              key={`${post.id}--blog`}
              {...itemProps}
            />)
          }
          {items.length > 4 &&
            <Link
              className="default-button showmore-button"
              type="button"
              to={`/relative/${slug}`}
            >
              {__t('Show more')}
            </Link>
          }
        </div>
      </div>
    );
  }
}

export default RelativePosts;

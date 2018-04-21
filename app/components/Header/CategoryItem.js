import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Link from '../Link/Link';

import { __t } from '../../i18n/translator';

class CategoryItem extends PureComponent {
  static propTypes = {
    item: PropTypes.shape({
      slug: PropTypes.string,
      title: PropTypes.string,
      view_on_site_url: PropTypes.string,
      children: PropTypes.array,
    }).isRequired,
    hideCategory: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
  }

  render() {
    const { item, hideCategory, className } = this.props;

    if (item.posts_num === 0) return null;

    return (
      <div
        className={className}
        data-cat_id={item.id}
      >
        <Link
          className="header-category__title"
          to={item.url}
          onClick={hideCategory}
        >
          {item.title}
        </Link>

        {item.children.length > 0 &&
          item.children.slice(0, 4)
            .map((child) => {
              if (child.posts_num === 0) return null;

              return (<Link
                className="header-category__name"
                key={child.id}
                to={child.url}
                onClick={hideCategory}
              >
                {child.title}
              </Link>);
            })
        }
        {item.children.length > 4 &&
          <Link
            className="header-category__name"
            to={item.url}
            onClick={hideCategory}
          >
            {__t('More')}
          </Link>
        }
      </div>
    );
  }
}

export default CategoryItem;

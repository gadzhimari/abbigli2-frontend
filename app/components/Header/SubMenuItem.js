import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Link from '../Link/Link';

class SubMenuItem extends PureComponent {
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }).isRequired,
    hideCategory: PropTypes.func.isRequired,
  };

  render() {
    const { item, hideCategory } = this.props;

    if (item.posts_num === 0) return null;

    return (
      <Link
        to={item.view_on_site_url}
        onClick={hideCategory}
        className="header-submenu__item"
        data-cat_id={item.id}
      >
        {item.title}
      </Link>
    );
  }
}

export default SubMenuItem;

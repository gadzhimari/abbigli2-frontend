import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { Link } from 'react-router';

import Image from '../../../components/Image';

class BlogSection extends PureComponent {
  static propTypes = {
    item: PropTypes.shape({
      slug: PropTypes.string,
      title: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    baseUrl: PropTypes.string,
    isBlog: PropTypes.bool,
  };

  static defaultProps = {
    baseUrl: '',
    isBlog: false,
  };

  render() {
    const { baseUrl, item, isBlog } = this.props;
    const imageUrl = item.images && item.images[0];

    return (
      <Link
        className={classNames({
          'slider-category__item': true,
          'slider-category__item_blog': isBlog,
        })}
        to={`${baseUrl ? `${baseUrl}?category=${item.slug}` : item.view_on_site_url}`}
      >
        <Image
          alt={item.title}
          thumbSize="180x153"
          src={imageUrl}
        />
        <div className="slider-category__name">{item.title}</div>
      </Link>
    );
  }
}

export default BlogSection;

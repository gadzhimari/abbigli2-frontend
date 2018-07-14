import { React, PureComponent, Type } from '../__base';
import { PRODUCT_TYPE, BLOG_TYPE, EVENT_TYPE } from '../../lib/constants/posts-types';

import BlogCard from './Blog/BlogCard';
import EventCard from './Event/EventCard';
import ProductCard from './Product/ProductCard';

class Card extends PureComponent {
  static propTypes = {
    data: Type.shape({
      title: Type.string,
      slug: Type.string,
      user: Type.object,
      images: Type.array,
    }).isRequired,
    view: Type.number,
    isMe: Type.bool,
    canEdit: Type.bool,
  };

  static defaultProps = {
    view: 1,
    isMe: false,
    canEdit: false,
  };

  renderCards() {
    const { data } = this.props;

    switch (data.type) {
      case PRODUCT_TYPE:
        return <ProductCard {...this.props} />;
      case EVENT_TYPE:
        return <EventCard {...this.props} />;
      case BLOG_TYPE:
        return <BlogCard {...this.props} />;
      default:
        return null;
    }
  }

  render() {
    return (
      this.renderCards()
    );
  }
}

export default Card;

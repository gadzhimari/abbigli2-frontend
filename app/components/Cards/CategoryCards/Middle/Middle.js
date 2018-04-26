import { React, PureComponent, Type } from '../../../../components-lib/__base';
import Link from '../../../Link/Link';
import Image from '../../../../components/Image';

import './Middle.less';

class Middle extends PureComponent {
  static propTypes = {
    item: Type.shape({
      title: Type.string,
      slug: Type.string,
      images: Type.array,
      id: Type.number,
    }).isRequired,
  };

  render() {
    const { item } = this.props;
    const imageUrl = item.images && item.images[0];

    return (
      <Link
        className="category-button category-button--imaged"
        to={item.view_on_site_url}
        alt={item.title}
        title={item.title}
      >
        <div className="category-button__image-wrapper">
          <Image
            className="category-button__image"
            alt={item.title}
            thumbSize="289x238"
            src={imageUrl}
          />
        </div>
        <div className="category-button__title" title={item.title}>
          {item.title}
        </div>
      </Link>
    );
  }
}

export default Middle;

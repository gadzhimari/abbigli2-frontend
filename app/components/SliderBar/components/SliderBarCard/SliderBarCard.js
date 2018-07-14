import { React, PureComponent, Type, cn } from '../../../../components-lib/__base';

import Link from '../../../Link/Link';
import Image from '../../../Image';

import './SliderBarCard.less';

@cn('SliderBarCard')
class SliderBarCard extends PureComponent {
  static propTypes = {
    item: Type.shape({
      slug: Type.string,
      title: Type.string,
      images: Type.arrayOf(Type.string),
    }).isRequired,
    baseUrl: Type.string,
    isBlog: Type.bool,
  };

  static defaultProps = {
    baseUrl: '',
    isBlog: false,
    createLink: ({ url }) => url
  };

  render(cn) {
    const { item, createLink, isBlog } = this.props;

    const imageUrl = item.images && item.images[0];
    const link = createLink(item);

    return (
      <Link
        className={cn({ blog: isBlog })}
        to={link}
      >
        <Image
          alt={item.title}
          thumbSize="180x153"
          src={imageUrl}
        />

        <div className={cn('name')}>
          {item.title}
        </div>
      </Link>
    );
  }
}

export default SliderBarCard;

import { React, PureComponent, cn } from '../../components-lib/__base';

import Link from '../../components/Link';
import Image from '../Image';

import './SliderCard.less';

@cn('SliderCard')
class SliderCard extends PureComponent {
  render(cn) {
    const { title, images, view_on_site_url: url } = this.props.data;

    return (
      <Link
        className={cn()}
        to={url}
      >
        <div className={cn('image-wrapper')}>
          <Image
            src={images[0]}
            thumbSize="227x175"
            className={cn('image')}
            alt={title}
          />
        </div>

        <div className={cn('title')}>
          {title}
        </div>
      </Link>
    );
  }
}

export default SliderCard;

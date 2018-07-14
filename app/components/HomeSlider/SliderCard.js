import { React, PureComponent, cn } from '../../components-lib/__base';

import Link from '../../components/Link';
import Image from '../Image';

import './SliderCard.less';
import { DOMAIN_URL } from '../../config';

@cn('SliderCard')
class SliderCard extends PureComponent {
  render(cn) {
    const { title, images, url } = this.props.data;

    return (
      <Link
        className={cn()}
        to={url.replace(DOMAIN_URL, '')}
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

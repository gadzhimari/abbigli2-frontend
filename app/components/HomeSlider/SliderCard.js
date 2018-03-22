import React, { PureComponent } from 'react';

import Link from '../../components/Link';
import Image from '../Image';

import './SliderCard.less';

class SliderCard extends PureComponent {
  render() {
    const { title, images, view_on_site_url: url } = this.props.data;

    return (
      <Link
        className="card"
        to={url}
      >
        <div className="card-item">
          <Image
            src={images[0]}
            thumbSize="227x175"
            className="card-img"
            alt={title}
          />
        </div>

        <div className="card-name-wrap">
          <div className="card-name">
            {title[15] ?
              `${title.slice(0, 14)}...` : title
            }
          </div>
        </div>
      </Link>
    );
  }
}

export default SliderCard;

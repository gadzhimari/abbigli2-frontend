import Slider from 'react-slick';
import chunk from 'lodash/chunk';

import { React, cn, PureComponent } from '../../components-lib/__base';

import SliderCard from './SliderCard';

import './index.less';

const CHUNK_SIZE = 6;
const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

@cn('HomeSlider')
class HomeSlider extends PureComponent {
  static defaultProps = {
    items: []
  }

  state = {
    slides: chunk(this.props.items, CHUNK_SIZE)
  }

  componentWillReceiveProps({ items }) {
    if (items !== this.props.items) {
      this.setState({ slides: chunk(items, CHUNK_SIZE) });
    }
  }

  render(cn) {
    const { slides } = this.state;

    if (!slides.length) {
      return null;
    }

    return (
      <div className={cn()}>
        <Slider {...sliderSettings}>
          {slides.map((slide, idx) => (
            <div className={cn('slide')} key={idx}>
              {
                slide.map(item => (
                  <SliderCard
                    data={item}
                    key={item.slug}
                  />
                ))
              }
            </div>))
          }
        </Slider>
      </div>
    );
  }
}

export default HomeSlider;

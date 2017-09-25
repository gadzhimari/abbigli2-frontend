import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Hummer from 'react-hammerjs';

import ComponentsList from './components/ComponentsList';
import SliderButtons from './components/SliderButtons';

import { debounce } from 'utils/functions';

import './index.less';

class TagsBar extends Component {
  constructor() {
    super();
    this.state = {
      slidedRight: 0,
      maxSlided: 0,
      factor: window.innerWidth > 500
        ? 3
        : 1,
    };

    this.calculateOnResize = debounce(this.calculateMaxSlided, 300, this);
  }

  componentDidMount() {
    this.calculateMaxSlided();
    window.addEventListener('resize', this.calculateOnResize);
  }

  componentDidUpdate(prevProps) {
    const { items } = this.props;

    if (prevProps.items !== items) {
      this.calculateMaxSlided();
    }
  }

  сomponentWillUnmount() {
    window.removeEventListener('resize', this.calculateOnResize);
  }

  calculateMaxSlided = () => {
    const wContainer = this.container.offsetWidth;
    const wTags = this.props.itemWidth * this.props.items.length;
    const difference = wTags - wContainer;

    if (difference < 0) {
      return this.setState({
        maxSlided: 0,
        slidedRight: 0,
        factor: window.innerWidth > 500 ? 3 : 1,
      });
    }

    this.setState({
      maxSlided: difference / this.props.itemWidth,
      slidedRight: 0,
      factor: window.innerWidth > 500 ? 3 : 1,
    });
  }

  slideRight = () => {
    const { slidedRight, factor, maxSlided } = this.state;

    if (slidedRight === maxSlided) return;

    let newSlidedRight;

    if ((slidedRight + factor) > maxSlided) {
      newSlidedRight = maxSlided;
    } else {
      newSlidedRight = slidedRight + factor;
    }

    this.setState({
      slidedRight: newSlidedRight,
    });
  }

  slideLeft = () => {
    const { slidedRight, factor } = this.state;

    if (slidedRight === 0) return;

    let newSlidedRight;

    if ((slidedRight - factor) < 0) {
      newSlidedRight = 0;
    } else {
      newSlidedRight = slidedRight - factor;
    }

    this.setState({
      slidedRight: newSlidedRight,
    });
  }

  resetSliderPosition = () => {
    this.setState({
      slidedRigth: 0,
    });
  }

  swipeHandler = (e) => {
    switch (e.direction) {
      case (2): {
        return this.slideRight();
      }
      case (4): {
        return this.slideLeft();
      }
      default: {
        break;
      }
    }
  }


  render() {
    const { items, itemProps, ItemComponent, sliderName, itemWidth } = this.props;
    const { maxSlided, slidedRight } = this.state;

    if (items.length === 0) return null;

    return (
      <div className={sliderName}>
        <Hummer
          onSwipe={this.swipeHandler}
          direction="DIRECTION_HORIZONTAL"
        >
          <div
            className={`${sliderName}__viewport`}
            ref={container => (this.container = container)}
          >
            <ComponentsList
              items={items}
              itemProps={itemProps}
              slidedRight={this.state.slidedRight}
              ItemComponent={ItemComponent}
              sliderName={sliderName}
              itemWidth={itemWidth}
            />
            <SliderButtons
              slideRight={this.slideRight}
              slideLeft={this.slideLeft}
              showLeft={slidedRight !== 0}
              showRight={maxSlided !== slidedRight}
              sliderName={sliderName}
            />
          </div>
        </Hummer>
      </div>
    );
  }
}

TagsBar.defaultProps = {
  link: '',
  itemProps: {},
  items: [],
};

TagsBar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  sliderName: PropTypes.string.isRequired,
  itemWidth: PropTypes.number.isRequired,
  itemProps: PropTypes.object,
};

export default TagsBar;

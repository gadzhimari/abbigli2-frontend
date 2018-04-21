/* eslint react/sort-comp: 0 */

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import debounce from 'lodash/debounce';

import ComponentsList from './components/ComponentsList';
import SliderButtons from './components/SliderButtons';

import './index.less';

class TagsBar extends PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    sliderName: PropTypes.string.isRequired,
    itemWidth: PropTypes.number.isRequired,
    itemProps: PropTypes.object,
  };

  static defaultProps = {
    link: '',
    itemProps: {},
    items: [],
  };

  state = {
    slidedRight: 0,
    maxSlided: 0,
    factor: typeof window !== 'undefined' && window.innerWidth > 500 ? 3 : 1,
  };

  calculateOnResize = debounce(() => this.calculateMaxSlided, 300);

  /** @type {HTMLElement} */
  root;

  /** @type {HTMLElement} */
  container;

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
    if (!this.container) return;

    const wContainer = this.container.offsetWidth;
    const wTags = this.props.itemWidth * this.props.items.length;
    const difference = wTags - wContainer;
    const maxSlided = difference < 0 ? 0 : difference / this.props.itemWidth;

    this.setState({
      maxSlided,
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

  render() {
    const { items, itemProps, ItemComponent, sliderName, itemWidth } = this.props;
    const { maxSlided, slidedRight } = this.state;

    if (items.length === 0) return null;

    return (
      <div
        className={sliderName}
        ref={(root) => { this.root = root; }}
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
      </div>
    );
  }
}

export default TagsBar;

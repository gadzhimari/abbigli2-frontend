import React, { Component, PropTypes } from 'react';

import TagsList from './components/TagsList';
import SliderButtons from './components/SliderButtons';

import './index.less';

const propTypes = {
  tags: PropTypes.array.isRequired,
  previousTags: PropTypes.string,
  link: PropTypes.string,
};

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
  }

  componentDidMount() {
    this.calculateMaxSlided();
  }

  componentDidUpdate(prevProps) {
    // const { tags } = this.props;

    // if (
    //   prevProps.tags !== tags
    //   &&
    //   this.state.slideRight !== 0
    // ) {
    //   this.updateWrapperWidth();
    // }
  }

  сomponentWillUnmount() {
    window.removeEventListener('resize', this.updateWrapperWidth);
  }

  calculateMaxSlided = () => {
    const wContainer = this.container.offsetWidth;
    const wTags = 175 * this.props.tags.length;
    const difference = wTags - wContainer;

    if (difference < 0) return;

    console.log(wContainer, wTags);

    this.setState({
      maxSlided: difference / 175,
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
    const { tags, previousTags, link } = this.props;
    const { maxSlided, slidedRight } = this.state;

    return (
      <div className="slider-tags">
        <div
          className="slider-tags__viewport"
          ref={container => (this.container = container)}
        >
          <TagsList
            tags={tags}
            slidedRight={this.state.slidedRight}
          />
          <SliderButtons
            slideRight={this.slideRight}
            slideLeft={this.slideLeft}
            showLeft={slidedRight !== 0}
            showRight={maxSlided !== slidedRight}
          />
        </div>
      </div>
    );
  }
}

TagsBar.propTypes = propTypes;

export default TagsBar;

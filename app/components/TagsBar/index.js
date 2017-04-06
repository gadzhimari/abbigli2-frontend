import React, { Component, PropTypes } from 'react';

import TagsList from './components/TagsList';
import SliderButtons from './components/SliderButtons';

import './index.styl';

const propTypes = {
  tags: PropTypes.array.isRequired,
  previousTags: PropTypes.string,
  link: PropTypes.string,
};

class TagsBar extends Component {
  constructor() {
    super();
    this.state = {
      slideRight: 0,
      sliderWidth: 20000,
      sliderWrapperWidth: 0,
    };
  }

  componentDidMount() {
    this.setContainerWidth();

    window.addEventListener('resize', this.updateWrapperWidth);
  }

  componentDidUpdate(prevProps) {
    const { tags } = this.props;

    if (
      prevProps.tags !== tags
        &&
      this.state.slideRight !== 0
    ) {
      this.updateWrapperWidth();
    }
  }

  setContainerWidth = () => {
    const { tags } = this.props;

    this.setState({
      sliderWidth: tags.length * (186 + 20),
      sliderWrapperWidth: this.sliderWrapper.offsetWidth,
    });
  }

  updateWrapperWidth = () => {
    if (!this.sliderWrapper) return;

    this.setState({
      sliderWrapperWidth: this.sliderWrapper.offsetWidth,
    });
  }

  сomponentWillUnmount() {
    window.removeEventListener('resize', this.updateWrapperWidth);
  }

  slideRight = () => {
    const { slideRight, sliderWrapperWidth, sliderWidth } = this.state;
    let newSliderRight = slideRight + ((186 + 20) * 3);

    if ((newSliderRight + sliderWrapperWidth) > sliderWidth) {
      newSliderRight = sliderWidth - sliderWrapperWidth;
    }

    this.sliderContainer.style.transform = `translate3d(-${newSliderRight}px, 0px, 0px);`;

    this.setState({
      slideRight: newSliderRight,
    });
  }

  slideLeft = () => {
    const { slideRight } = this.state;
    let newSliderRight = slideRight - ((186 + 20) * 3);

    if (newSliderRight < 0) {
      newSliderRight = 0;
    }

    this.sliderContainer.style.transform = `translate3d(-${newSliderRight}px, 0px, 0px);`;

    this.setState({
      slideRight: newSliderRight,
    });
  }

  resetSliderPosition = () => {
    this.setState({
      slideRight: 0,
    });
  }


  render() {
    const { tags, previousTags, link } = this.props;
    const { slideRight, sliderWidth, sliderWrapperWidth } = this.state;

    const shouldRightButtonShow = (slideRight + sliderWrapperWidth) < sliderWidth;
    const shouldLeftButtonShow = slideRight !== 0;

    return (
      <div className="flexslider carousel">
        <div
          className="flex-viewport"
          style={{ overflow: 'hidden', position: 'relative' }}
          ref={wrapper => (this.sliderWrapper = wrapper)}
        >
          <div
            className="slides"
            ref={slider => (this.sliderContainer = slider)}
            style={{
              width: `${sliderWidth}px`,
              transitionDuration: '0.5s',
              transform: `translate3d(-${slideRight}px, 0px, 0px)`,
            }}
          >
            <TagsList
              tags={tags}
              previousTags={previousTags}
              onClick={this.resetSliderPosition}
              link={link}
            />
          </div>
        </div>
        {
          sliderWidth > sliderWrapperWidth
            ? (
              <SliderButtons
                slideLeft={this.slideLeft}
                slideRight={this.slideRight}
                shouldRightButtonShow={shouldRightButtonShow}
                shouldLeftButtonShow={shouldLeftButtonShow}
              />
            )
            : null
        }
      </div>
    );
  }
}

TagsBar.propTypes = propTypes;

export default TagsBar;

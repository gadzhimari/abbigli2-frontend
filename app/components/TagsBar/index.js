import React, { Component, PropTypes } from 'react';
import Hummer from 'react-hammerjs';

import TagsList from './components/TagsList';
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
    const { tags } = this.props;

    if (prevProps.tags !== tags) {
      this.calculateMaxSlided();
    }
  }

  сomponentWillUnmount() {
    window.removeEventListener('resize', this.calculateOnResize);
  }

  calculateMaxSlided = () => {
    const wContainer = this.container.offsetWidth;
    const wTags = 175 * this.props.tags.length;
    const difference = wTags - wContainer;

    if (difference < 0) {
      return this.setState({
        maxSlided: 0,
        slidedRight: 0,
        factor: window.innerWidth > 500 ? 3 : 1,
      });
    }

    this.setState({
      maxSlided: difference / 175,
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

  onSwipeHandler = (e) => {
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
    const { tags, previousTags, link } = this.props;
    const { maxSlided, slidedRight } = this.state;

    return (
      <div className="slider-tags">
        <Hummer
          onSwipe={this.onSwipeHandler}
          direction="DIRECTION_HORIZONTAL"
        >
          <div
            className="slider-tags__viewport"
            ref={container => (this.container = container)}
          >
            <TagsList
              tags={tags}
              link={link}
              previousTags={previousTags}
              slidedRight={this.state.slidedRight}
            />
            <SliderButtons
              slideRight={this.slideRight}
              slideLeft={this.slideLeft}
              showLeft={slidedRight !== 0}
              showRight={maxSlided !== slidedRight}
            />
          </div>
        </Hummer>
      </div>
    );
  }
}

TagsBar.defaultProps = {
  link: '',
};

TagsBar.propTypes = {
  tags: PropTypes.array.isRequired,
  previousTags: PropTypes.string,
  link: PropTypes.string,
};

export default TagsBar;

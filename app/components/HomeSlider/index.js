import React from 'react';

import {
  Card,
} from 'components';

import './index.styl';

class HomeSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      width: 1220,
      rows: 2,
      factor: 246,
    };
    this.goLeft = this.goLeft.bind(this);
    this.goRight = this.goRight.bind(this);
  }

  componentDidMount() {
    this.adjustScreen();
    window.addEventListener('resize', this.adjustScreen);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.adjustScreen);
  }

  adjustScreen = () => {
    const screenWidth = window.innerWidth;
    let width;
    let factor;
    let rows;
    const breakpoints = [345, 480, 730, 900, 970, 1220];

    for (let i = 0; i <= breakpoints.length; i++) {
      if (screenWidth > breakpoints[i]) {
        width = breakpoints[i];
      }
    }

    if (width < 500) {
      rows = 3;
      factor = 172;
    } else {
      rows = 2;
      factor = 246;
    }

    this.setState({
      width,
      rows,
      factor,
    });
  }

  goLeft() {
    if (this.state.page > 1) {
      this.setState({
        page: this.state.page - 1,
      });
    }
  }

  goRight() {
    if (this.state.page < 2)
      this.setState({ page: this.state.page + 1 });
  }

  goPage(page) {
    this.setState({ page });
  }

  render() {
    const itemsSections = this.props.itemsSections;
    const { width, page, rows, factor } = this.state;
    const leftArrowClass = page === 1
      ? 'slick-arrow slick-prev slick-disabled'
      : 'slick-arrow slick-prev';
    const rightArrowClass = page === 2
      ? 'slick-arrow slick-next slick-disabled'
      : 'slick-arrow slick-next';

    return (
      <div
        className="slider-wrapper"
        style={{
          width: `${width}px`,
        }}
      >
        <div className="slider-nav">
          <div
            className={leftArrowClass}
            onClick={this.goLeft}
          >
            LEFT
          </div>
          <div
            className={rightArrowClass}
            onClick={this.goRight}
          >
            RIGHT
          </div>
        </div>
        <div
          className="slider"
          style={{
            height: `${factor * rows}px`,
            width: `${width}px`,
          }}
        >
          <div
            className="slider-inner"
            style={{
              width: `${(factor * itemsSections.length) / rows}px`,
              transform: `translate(-${(page - 1) * width}px, 0)`,
              WebkitTransform: `translate(-${(page - 1) * width}px, 0)`,
            }}
          >
            {
              itemsSections.length > 0
              &&
              itemsSections.map(item => (
                <Card
                  data={item}
                  key={`${item.slug}--homeslider`}
                />
              ))
            }
          </div>
        </div>
        <div className="slider-pagination">
          <div className={"slider-pagination__item" + (this.state.page == 1 ? ' active' : '')} onClick={() => { this.goPage(1) }}></div>
          <div className={"slider-pagination__item" + (this.state.page == 2 ? ' active' : '')} onClick={() => { this.goPage(2) }}></div>
          <div className={"slider-pagination__item" + (this.state.page == 3 ? ' active' : '')} onClick={() => { this.goPage(3) }}></div>
        </div>
      </div>
    )
  }
}

export default HomeSlider;
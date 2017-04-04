import React, { Component, PropTypes } from 'react';

const propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
};

class ScrollBar extends Component {
  render() {
    return (
      <div
        className="form__tags"
        onClick={this.props.onClick}
        ref={container => (this.container = container)}
      >
        {this.props.children}
      </div>
    );
  }
}

ScrollBar.propTypes = propTypes;

export default ScrollBar;

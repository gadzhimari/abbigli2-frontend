import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ScrollBar extends Component {
  static propTypes = {
    children: PropTypes.any,
    onClick: PropTypes.func,
  };

  render() {
    return (
      <div
        className="form__tags"
        onClick={this.props.onClick}
        ref={this.props.scrollbarRef}
      >
        {this.props.children}
      </div>
    );
  }
}

export default ScrollBar;

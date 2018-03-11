import React, { Component } from 'react';
import './index.styl';

export default class Hr extends Component {
  render() {
    const { color } = this.props;

    return (
      <div className={`separate-block ${color}`}>
        <div className={`icon ${color}`} />
      </div>
    );
  }
}

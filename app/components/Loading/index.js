import React, { Component } from 'react';

import './index.styl';

export default class Loading extends Component {
  render() {
    const { loading } = this.props;

    if (!loading) {
      return null;
    }

    return (
      <div className="loader">
        <div className="loader__spinner" />
        <div className="loader__logo" />
      </div>
    );
  }
}

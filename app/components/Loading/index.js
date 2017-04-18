import React, { PropTypes } from 'react';
import './index.styl';

export default (props) => (
  <div
    className="loader"
    style={{ display: props.loading ? 'block' : 'none' }}
  >
    <div className="loader__spinner"></div>
    <div className="loader__logo"></div>
  </div>);

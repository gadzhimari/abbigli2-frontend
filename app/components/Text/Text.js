import React, { PropTypes } from 'react';
import './Text.styl';

export default function Text(props) {
  return <div className="text">{ props.children }</div>;
}

Text.propTypes = {
  children: PropTypes.any.isRequired
};
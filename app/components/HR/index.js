import PropTypes from 'prop-types';
import React from 'react';
import './index.styl';

export default (props) =>
{
  return <div className={'separate-block' + ' ' + props.color}><div className={'icon' + ' ' + props.color}></div></div>;
}

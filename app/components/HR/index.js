import React, {PropTypes} from 'react';
import './index.styl';

export default (props) =>
{
  return <div className={'separate-block' + ' ' + props.color}><div className={'icon' + ' ' + props.color}></div></div>;
}

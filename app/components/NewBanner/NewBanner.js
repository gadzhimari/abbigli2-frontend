import React, {PropTypes} from 'react';
import './NewBanner.styl';

export default function NewBanner(props) {
  return <div className="">{ props.children }</div>;
}

NewBanner.propTypes = {
  children: PropTypes.any.isRequired
};
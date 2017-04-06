import React, { PropTypes } from 'react';
import './Like.styl';

export default function Like (props) {
    return <div className={`like ${props.liked?'liked':''}`} onClick={props.onClick}>
    </div>;
}

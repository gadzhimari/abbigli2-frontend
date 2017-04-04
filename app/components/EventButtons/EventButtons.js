import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import './EventButtons.styl';

export default function EventButtons(props) {
  return (
    <div className="event-buttons">
      <div className="event-button blog">
        <Link to="/blogs">
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.258 36">
	<path d="M23,6H5v3h18V6z M23,11H5v3h18V11z M5,19h18v-3H5V19z M25,33H3V3h22v16.83l3-3.001V3c0-1.657-1.344-3-3-3H3
		C1.343,0,0,1.343,0,3v30c0,1.656,1.343,3,3,3h22c1.656,0,3-1.344,3-3v-7.831l-3,2.997V33z M31.515,14.659l-1.634,1.636l2.739,2.74
		l1.638-1.634L31.515,14.659z M20.168,26.079L19,30l3.92-1.169l8.8-8.793l-2.756-2.759L20.168,26.079z"/>
</svg>
        </Link>
      </div>
      <div className="event-button event">
        <Link to="/events">
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 36">
<path d="M29,36H3c-1.657,0-3-1.344-3-3V7c0-1.656,1.343-3,3-3h1V0h4v4h16V0h4
	v4h1c1.657,0,3,1.343,3,3v26C32,34.656,30.657,36,29,36z M29,14H3v19h26V14z M26,30h-8v-8h8V30z"/>
</svg>
        </Link>
      </div>
    </div>
  );
}
/*
EventButtons.propTypes = {
  children: PropTypes.any.isRequired
};*/
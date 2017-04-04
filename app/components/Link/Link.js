import React, { PropTypes } from 'react';
import RouterLink from 'react-router/lib/Link';

import './Link.styl';

export default function Link(props) {
  return (
    <RouterLink
      to={props.to}
      onClick={props.onClick}
      className={props.className}
    >
      {props.children}
    </RouterLink>
  );
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

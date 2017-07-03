import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';


const Crumb = ({ url, title }) => (
  <Link
    className="breadcrumbs__item"
    to={url}
  >
    {title}
  </Link>
);

Crumb.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Crumb;

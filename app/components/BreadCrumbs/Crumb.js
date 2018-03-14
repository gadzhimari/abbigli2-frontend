import React from 'react';
import Type from 'prop-types';

import Link from '../Link/Link';

const Crumb = ({ url, title, pos }) => (
  <li
    className="breadcrumbs__item"
    itemProp="itemListElement"
    itemScope
    itemType="http://schema.org/ListItem"
  >
    <Link
      to={url}
      className="breadcrumbs__link"
      itemProp="item"
    >
      <span itemProp="name">{title}</span>
      <meta itemProp="position" content={pos} />
    </Link>
  </li>
);

Crumb.propTypes = {
  url: Type.string.isRequired,
  title: Type.string.isRequired,
  pos: Type.number,
};

export default Crumb;

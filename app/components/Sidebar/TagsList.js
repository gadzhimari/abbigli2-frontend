import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';
import { Link } from 'react-router';

const TagsList = ({ tags, type }) => (
  <div className="sidebar__group">
    {
      tags
      &&
      tags.map((tag, idx) => <Link
        key={idx}
        className="legacy tag"
        to={`/find?tags=${tag}&type=${type}`}
      >
        #{tag}
      </Link>)
    }
  </div>);

TagsList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
};

export default pure(TagsList);

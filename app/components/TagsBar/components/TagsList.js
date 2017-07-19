import React, { Component, PropTypes } from 'react';

import { Link } from 'components';

const propTypes = {
  tags: PropTypes.array,
  previousTags: PropTypes.string,
  link: PropTypes.string,
  link: PropTypes.string,
  onCLick: PropTypes.func,
};

class TagsList extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.tags !== this.props.tags;
  }

  render() {
    const { tags, previousTags, onCLick, link } = this.props;
    return (
      <ul>
        {
          tags.map((tag, index) => {
            const prevTagsLink = previousTags
              ? `${previousTags},${tag.title}`
              : `${tag.title}`;
            
            const linkTo = link
              ? `${link}${tag.title}/new`
              : `/tags/${prevTagsLink}/new`;

            return (
              <li
                style={{
                  width: '186px',
                  marginRight: '20px',
                  float: 'left',
                  display: 'block',
                }}
                key={`${tag.id}--${index}`}
              >
                <Link
                  className={`similar-tag tag-${Math.floor(Math.random() * (9 - 1)) + 1}`}
                  onCLick={onCLick}
                  to={linkTo}
                >
                  #{tag.title}
                </Link>
              </li>
            );
          })
        }
      </ul>
    );
  }
}

TagsList.propTypes = propTypes;

export default TagsList;

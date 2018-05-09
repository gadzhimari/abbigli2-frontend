import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Avatar from '../../components/Avatar';
import Link from '../../components/Link';

import toLocaleDateString from '../../lib/date/toLocaleDateString';
import { COMMENT_DATE_FORMAT } from '../../lib/date/formats';
import createProfileLink from '../../lib/links/profile-link';

class CommentItem extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      comment: PropTypes.string,
      created: PropTypes.string,
      user: PropTypes.object,
    }).isRequired,
  };

  render() {
    const { author, created, text } = this.props.data;

    return (
      <div className="comment">
        <div className="comment__wrapper">
          <div className="comment__meta">
            <Link to={createProfileLink(author)}>
              <Avatar
                className="avatar comment__avatar"
                imgClassName="avatar__img"
                avatar={author.avatar}
                thumbSize="113x113"
                alt={author.profile_name}
              />
            </Link>

            <div className="comment__date">
              {toLocaleDateString(created, COMMENT_DATE_FORMAT)}
            </div>

            <Link
              className="comment__author"
              to={createProfileLink(author.id)}
            >
              {author.profile_name}
            </Link>
          </div>

          <div className="comment__text">
            {text}
          </div>
        </div>
      </div>
    );
  }
}

export default CommentItem;

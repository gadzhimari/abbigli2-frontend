import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CommentsField from './CommentsField';
import CommentsList from './CommentsList';

class Comments extends PureComponent {
  static propTypes = {
    onSend: PropTypes.func.isRequired,
    canComment: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      comment: PropTypes.string,
      created: PropTypes.string,
      id: PropTypes.number,
      user: PropTypes.object,
    })),
  };

  render() {
    const { onSend, canComment, comments, dispatch } = this.props;
    return (
      <div className="comments">
        <div className="comments__wrapper">
          <CommentsField
            onSend={onSend}
            canComment={canComment}
            dispatch={dispatch}
          />
          <div className="divider" />
          <CommentsList comments={comments} />
        </div>
      </div>
    );
  }
}

export default Comments;

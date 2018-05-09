import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CommentItem from './CommentItem';

import { __t } from '../../i18n/translator';

class CommentsList extends Component {
  static propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape({
      comment: PropTypes.string,
      created: PropTypes.string,
      id: PropTypes.number,
      user: PropTypes.any,
    })).isRequired,
  };

  state = {
    showAll: false,
  };

  toggleShowAll = () => {
    this.setState({
      showAll: !this.state.showAll,
    });
  }

  render() {
    const { comments } = this.props;
    const { showAll } = this.state;
    const defaultCommentsCount = 2;
    const renderedCount = showAll ? comments.length :
      defaultCommentsCount;

    return (
      <div className="comments-list">
        <div className="comments-list__wrapper">
          <div className="comments-list__header">
            <h2 className="comments-list__title">
              {__t('Comments')}
              <span className="comments-list__count">
                ({ comments.length })
              </span>
            </h2>
          </div>
          <div className="comments-list__list">
            {
              comments.length > 0
              ? comments
                .slice(0, renderedCount)
                .map(comment => <CommentItem data={comment} key={comment.created} />)
              : __t('No.one.commented')
            }
          </div>
          <div className="comments-list__footer">
            {
              comments.length > defaultCommentsCount
              &&
              <button
                className="comments-list__show-all"
                onClick={this.toggleShowAll}
              >
                { showAll ? __t('Hide.all') : __t('Show.all') }
                <svg className="icon icon_view_arrow" viewBox="0 0 11.3 19.6">
                  <path d="M0.7,0.6c-0.8,0.8-0.9,2.1-0.1,2.9l5.9,6.4l-5.9,6.3c-0.8,0.9-0.8,2.2,0.1,2.9 c0.9,0.7,2.1,0.7,2.9-0.1l7.2-7.8c0.1-0.1,0.1-0.1,0.2-0.2l0,0c0.1-0.1,0.1-0.2,0.2-0.3l0,0c0-0.1,0.1-0.2,0.1-0.3v-0.1 c0-0.1,0-0.2,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.2,0-0.2V9.4c0-0.1-0.1-0.2-0.1-0.3l0,0C11.1,9,11.1,8.9,11,8.8 l0,0c-0.1-0.1-0.1-0.2-0.2-0.2L3.6,0.7C2.8-0.2,1.5-0.2,0.7,0.6z" />
                </svg>
              </button>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default CommentsList;

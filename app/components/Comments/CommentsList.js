import React, { Component } from 'react';

import CommentItem from './CommentItem';

import { __t } from '../../i18n/translator';

class CommentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAll: false,
    };
  }

  toggleShowAll = () => this.setState({
    showAll: !this.state.showAll,
  });

  render() {
    const { comments } = this.props;
    const renderedCount = this.state.showAll ? comments.length : 2;

    return (
      <div className="section">
        <h2 className="section__name">
          {__t('Comments')}
          <span className="section__name-note">
            ({comments.length})
          </span>
        </h2>
        <div className="comments">
          {
            comments.length > 0
            ? comments
              .slice(0, renderedCount)
              .map(comment => <CommentItem data={comment} key={comment.id} />)
            : 'Никто еще не прокоментировал эту запись'
          }

          {
            comments.length > 2
            &&
            <a
              className="show-more"
              onClick={this.toggleShowAll}
            >
              {__t('Show all')}
              <svg className="icon icon-arrow" viewBox="0 0 11.3 19.6">
                <path d="M0.7,0.6c-0.8,0.8-0.9,2.1-0.1,2.9l5.9,6.4l-5.9,6.3c-0.8,0.9-0.8,2.2,0.1,2.9 c0.9,0.7,2.1,0.7,2.9-0.1l7.2-7.8c0.1-0.1,0.1-0.1,0.2-0.2l0,0c0.1-0.1,0.1-0.2,0.2-0.3l0,0c0-0.1,0.1-0.2,0.1-0.3v-0.1 c0-0.1,0-0.2,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.2,0-0.2V9.4c0-0.1-0.1-0.2-0.1-0.3l0,0C11.1,9,11.1,8.9,11,8.8 l0,0c-0.1-0.1-0.1-0.2-0.2-0.2L3.6,0.7C2.8-0.2,1.5-0.2,0.7,0.6z" />
              </svg>
            </a>
          }
        </div>
      </div>
    );
  }
}

export default CommentsList;

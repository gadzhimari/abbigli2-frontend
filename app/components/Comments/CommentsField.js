import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button/Button';
import Textarea from '../../components/Inputs/Textarea';

import { __t } from '../../i18n/translator';

import './Comments.less';

class CommentsField extends Component {
  static propTypes = {
    onSend: PropTypes.func.isRequired,
    canComment: PropTypes.bool.isRequired,
    openPopup: PropTypes.func.isRequired,
  };

  state = {
    comment: ''
  };

  changeComment = ({ target }) => {
    this.setState({ comment: target.value });
  }

  sendComment = () => {
    this.props.onSend(this.state.comment);
    this.setState({ comment: '' });
  }

  handleSignupClick = () => {
    this.props.openPopup('registerPopup');
  }

  renderCommentsField() {
    return (
      <div>
        <Textarea
          className="comment-field__textarea-wrapper"
          onChange={this.changeComment}
          name="content"
          value={this.state.comment}
          placeholder={__t('Your comment')}
        />

        <Button
          className="default-button"
          onClick={this.sendComment}
        >
          {__t('Do.comment')}
        </Button>
      </div>
    );
  }

  renderRegisterButton() {
    return (
      <Button
        onClick={this.handleSignupClick}
        className="comments__signup"
        name="signup"
      >
        {__t('sign.up.to.leave.comment')}
      </Button>
    );
  }

  render() {
    const { canComment } = this.props;
    return (
      <div className="comment-field">
        <div className="comment-field__wrapper">
          { canComment ? this.renderCommentsField() : this.renderRegisterButton() }
        </div>
      </div>
    );
  }
}

export default CommentsField;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button/Button';

import { __t } from '../../i18n/translator';

import { openPopup } from '../../ducks/Popup/actions';

import './Comments.less';

class CommentsField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
  }

  changeComment = ({ target }) => this.setState({
    comment: target.value,
  });

  sendComment = () => {
    const { comment } = this.state;
    const { onSend } = this.props;

    this.setState({
      comment: '',
    });

    onSend(comment);
  }

  handleSignupClick = () => {
    this.props.dispatch(openPopup('registerPopup'));
  }

  renderCommentsField() {
    return (
      <div>
        <div className="textarea-wrap textarea_comment">
          <textarea
            className="textarea"
            placeholder={__t('Your comment')}
            onChange={this.changeComment}
            value={this.state.comment}
          />
        </div>
        <button
          className="default-button"
          type="button"
          onClick={this.sendComment}
        >
          {__t('Do.comment')}
        </button>
      </div>
    );
  }

  renderRegisterButton() {
    return (
      <Button
        onClick={this.handleSignupClick}
        className="comment__signup"
        name="signup"
      >
        {__t('sign.up.to.leave.comment')}
      </Button>
    );
  }

  render() {
    const { canComment } = this.props;
    return (
      <div>
        { canComment ? this.renderCommentsField() : this.renderRegisterButton() }
      </div>
    );
  }
}

CommentsField.propTypes = {
  onSend: PropTypes.func.isRequired,
  canComment: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default CommentsField;

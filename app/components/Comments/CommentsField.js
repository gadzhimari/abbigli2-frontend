import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { __t } from '../../i18n/translator';

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

  render() {
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
}

CommentsField.propTypes = {
  onSend: PropTypes.func.isRequired,
};

export default CommentsField;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { __t } from '../../../i18n/translator';

class MessageField extends Component {
  static propTypes = {
    sendMessage: PropTypes.func.isRequired,
  };

  state = {
    message: '',
  };

  changeMessage = ({ target }) => {
    this.setState({
      message: target.value,
    });
  }

  sendMessage = () => {
    const { message } = this.state;
    if (!message.trim()) {
      return;
    }
    this.props.sendMessage(message);
    this.setState({
      message: '',
    });
  }

  checkPressEnter = ({ keyCode }) => {
    if (keyCode === 13) {
      this.sendMessage();
    }
  }

  render() {
    return (
      <div className="messages__answer">
        <div className="messages__answer-input">
          <input
            className="input"
            type="text"
            placeholder={__t('chat.placeholder')}
            value={this.state.message}
            onChange={this.changeMessage}
            onKeyDown={this.checkPressEnter}
          />
        </div>
        <button
          className="messages__answer-send"
          type="button"
          onClick={this.sendMessage}
        >
          <svg className="icon icon-send" viewBox="0 0 28.8 29.2">
            <polygon points="0,29.2 28.8,14.6 0,0 2,12.7 15.1,14.6 2,16.5 " />
          </svg>
        </button>
      </div>
    );
  }
}

export default MessageField;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MessageField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  changeMessage = ({ target }) => this.setState({
    message: target.value,
  });

  sendMessage = () => {
    this.props.sendMessage(this.state.message);
    this.setState({
      message: '',
    });
  }

  render() {
    return (
      <div className="messages__answer">
        <div className="messages__answer-input">
          <input
            className="input"
            type="text"
            placeholder="Напишите сообщение"
            value={this.state.message}
            onChange={this.changeMessage}
          />
          <svg className="icon icon-smile" viewBox="0 0 41.4 41.4">
            <path d="M20.7,0C9.3,0,0,9.3,0,20.7s9.3,20.7,20.7,20.7c11.4,0,20.7-9.3,20.7-20.7S32.1,0,20.7,0z M20.7,38.1c-9.6,0-17.4-7.8-17.4-17.4S11.1,3.3,20.7,3.3c9.6,0,17.4,7.8,17.4,17.4S30.3,38.1,20.7,38.1z" />
            <circle cx="14.8" cy="15.9" r="2.9" />
            <circle cx="26.6" cy="15.9" r="2.9" />
            <path d="M26.8,25c-3.8,2.2-8.4,2.2-12.2,0.1c-0.8-0.5-1.8-0.2-2.3,0.6c-0.5,0.8-0.2,1.8,0.6,2.3 c2.4,1.3,5,2,7.7,2c2.7,0,5.4-0.7,7.9-2.1c0.8-0.5,1.1-1.5,0.6-2.3C28.6,24.8,27.6,24.6,26.8,25z" />
          </svg>
          <svg className="icon icon-file" viewBox="0 0 45.2 40.9">
            <path d="M35.4,0.4c5,1.4,8.3,4.6,9.4,9.7c1,4.5-0.3,8.4-3.5,11.7C36.3,26.8,31.2,31.9,26.1,37 c-0.4,0.4-0.9,0.7-1.5,0.5c-1-0.2-1.4-1.4-0.8-2.2c0.1-0.2,0.3-0.3,0.4-0.4c5-5,10-9.9,14.9-14.9c1.5-1.5,2.5-3.4,2.9-5.5 c0.6-4-1.3-8.1-4.9-10.1c-3.8-2.2-8.6-1.6-11.8,1.5C18.5,12.6,11.7,19.3,5,26c-2,1.9-2.6,4.3-1.8,7c0.8,2.6,2.5,4.3,5.2,4.9 c2.5,0.6,4.7-0.1,6.6-1.9c4.7-4.6,9.4-9.3,14.1-13.9c2.1-2.1,4.3-4.2,6.4-6.3c2.3-2.3,1.3-6.3-1.9-7.1c-1.4-0.4-2.7,0-3.9,0.9 c-0.2,0.1-0.3,0.3-0.4,0.4c-5,5-10,10-15,15c-0.5,0.5-1,0.7-1.6,0.5c-1-0.3-1.3-1.5-0.6-2.3c0.1-0.1,0.1-0.1,0.2-0.2 C17.2,18,22.3,12.8,27.4,7.7C30.2,5,34.5,5,37.3,7.6c2.9,2.8,2.9,7.3,0,10.2c-2.3,2.3-4.7,4.6-7.1,7c-4.4,4.4-8.9,8.7-13.3,13.1 c-1.6,1.6-3.4,2.6-5.6,2.9c-5,0.8-9.8-2.6-11.1-7.4c-0.4-1.4-0.3-2.8-0.2-3.7c0.3-2.2,1.2-4,2.8-5.6c6.9-6.8,13.8-13.6,20.7-20.4 c1.6-1.5,3.4-2.6,5.6-3.2C31.9-0.3,34.2,0.1,35.4,0.4z" />
          </svg>
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

MessageField.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};

export default MessageField;

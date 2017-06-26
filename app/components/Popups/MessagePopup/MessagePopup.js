import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Popup from '../CommonPopup';
import { FetchingButton } from 'components';

import { sendPrivateMessage } from 'ducks/Dialogs';

import { __t } from '../../../i18n/translator';

import './MessagePopup.styl';

class MessagePopup extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      messageError: false,
    };
  }

  onUpdate = ({ target }) => this.setState({
    message: target.value.trim(),
    messageError: false,
  });

  sendMessage = () => this.props.dispatch(
    sendPrivateMessage(this.props.options.id, {
      body: this.state.message,
    })
  )

  showError = () => this.setState({
    messageError: true,
  });

  validateMessage = () => {
    if (this.state.message.length > 0) {
      this.sendMessage();
    } else {
      this.showError();
    }
  }

  render() {
    const { closePopup, isFetching, options } = this.props;
    const { message, messageError } = this.state;

    return (
      <Popup
        closePopup={closePopup}
        title={`${__t('Message to')} ${options.name}`}
      >
        <form className="popup-form">
          <div className="popup-form__field">
            <div className="textarea-wrap">
              <textarea
                id="message"
                value={message}
                onChange={this.onUpdate}
                className="textarea textarea--send-message"
                placeholder="Type a message..."
              />
              {
                messageError && !message.length
                &&
                <div className="popup__send-error">
                  {'This field should not be empty!'}
                </div>
              }
            </div>
          </div>
          <div className="buttons-wrap">
            <FetchingButton
              className="default-button"
              onClick={this.validateMessage}
              isFetching={isFetching}
            >
              {__t('send.message')}
            </FetchingButton>
          </div>
        </form>
      </Popup>
    );
  }
}

MessagePopup.propTypes = {
  closePopup: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ Dialogs }) => ({
  isFetching: Dialogs.isFetching,
});

export default connect(mapStateToProps)(MessagePopup);

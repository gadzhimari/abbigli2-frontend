import { connect } from 'react-redux';
import { compose } from 'recompose';
import popupHOC from '../../../HOC/popupHOC';

import { React, Component, Type } from '../../../components-lib/__base';
import { Button } from '../../../components-lib';

import { __t } from '../../../i18n/translator';

class SendPost extends Component {
  static propTypes = {
    closePopup: Type.func.isRequired,
    isFetching: Type.bool.isRequired,
    options: Type.shape({
      name: Type.string,
      sendMessage: Type.func,
    }).isRequired,
  };

  state = {
    message: '',
    messageError: false,
  };

  onUpdate = ({ target }) => this.setState({
    message: target.value,
    messageError: false,
  });

  sendMessage = () => this.props.options.sendMessage(this.state.message);

  showError = () => this.setState({
    messageError: true,
  });

  validateMessage = () => {
    if (this.state.message.trim().length > 0) {
      this.sendMessage();
    } else {
      this.showError();
    }
  }

  render() {
    const { closePopup, isFetching, options } = this.props;
    const { message, messageError } = this.state;

    return (
      <div className="popup-wrap" id="sendMessage" style={{ display: 'block' }}>
        <div
          className="popup mobile-search__popup reset-popup"
        >
          <header className="mobile-search__header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14.031"
              className="popup-close icon"
              onClick={closePopup}
            >
              <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z" />
            </svg>
            <div className="popup-title">
              {__t('Send message')}
            </div>
          </header>
          <form className="register-popup__form">
            <div className="register-popup__field">
              <label
                htmlFor="message"
                className="register-popup__label"
              >
                {__t('Your message to')}
                {' '}
                {options.name}
              </label>
              <textarea
                id="message"
                value={message}
                onChange={this.onUpdate}
                className="register-popup__textarea"
                placeholder="Type a message..."
              />
              {
                messageError && !message.length
                &&
                <div className="login__form-error">
                  {'This field should not be empty!'}
                </div>
              }
            </div>
            <div className="buttons-wrap">
              <Button
                className="register-popup__fetch-button-new"
                onClick={this.validateMessage}
                isFetching={isFetching}
                text={__t('send.message')}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ Dialogs }) => ({
  isFetching: Dialogs.isFetching,
});

const enhance = compose(connect(mapStateToProps), popupHOC);

export default enhance(SendPost);

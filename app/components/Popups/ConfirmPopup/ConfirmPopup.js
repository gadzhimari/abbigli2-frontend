import { React, PureComponent, Type } from '../../../components-lib/__base';
import { Button } from '../../../components-lib';

import { ErrorInput } from '../../Inputs';
import Timer from './Timer';

import { __t } from '../../../i18n/translator';

import './ConfirmPopup.styl';

class ConfirmPopup extends PureComponent {
  static propTypes = {
    closePopup: Type.func.isRequired,
    sendForm: Type.func.isRequired,
    isFetching: Type.bool.isRequired,
    errors: Type.oneOfType([Type.object, Type.any]),
    options: Type.shape({
      callback: Type.func.isRequired,
      previousPopup: Type.string,
      contact: Type.string.isRequired,
    }).isRequired,
  };

  state = {
    confirmCode: '',
    againRequestDelay: 60,
    againRequestFetching: false,
    againErrors: {},
  }

  title = '';
  buttonText = '';

  handleClick = () => {
    const { options, sendForm } = this.props;
    const creds = {
      contact: options.contact,
      code: this.state.confirmCode,
    };

    sendForm(creds);
  }

  confirmChange = ({ target }) => this.setState({
    confirmCode: target.value.trim(),
  })

  handleSecond = () => this.setState({
    againRequestDelay: this.state.againRequestDelay - 1,
  });

  againRequest = () => {
    const { options } = this.props;

    this.setState({
      againRequestFetching: true,
    });

    options.againRequest({ contact: options.contact })
      .then(() => {
        this.setState({
          againRequestFetching: false,
          againErrors: {},
          againRequestDelay: 60,
        });
      })
      .catch((error) => {
        this.setState({
          againRequestFetching: false,
          againErrors: error.data,
        });
      });
  }

  goBack = () => {
    throw new Error('ConfirmPopup: goBack method must be overrited in child class');
  }

  render() {
    const { closePopup, isFetching, errors, options } = this.props;
    const { againErrors } = this.state;

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
              {this.title}
            </div>
          </header>
          <form className="register-popup__form">
            <div className="register-popup__terms">
              <div className="reset-popup__contact">
                {options.contact}
                <a
                  className="register-popup__link register-popup__link--small"
                  onClick={this.goBack}
                >
                  {__t('edit')}
                </a>
              </div>
              <div>
                {__t("We've sent an SMS with an confirmation code to your phone.")}
              </div>
              <div>
                {__t('Please enter the code below.')}
              </div>
            </div>
            <div className="register-popup__field">
              <ErrorInput
                className="register-popup__input"
                value={this.state.confirmCode}
                onChange={this.confirmChange}
                disabled={isFetching}
                placeholder={__t('SMS code')}
                errors={errors && errors.code}
                errorClass="login__form-error"
                id="code"
              />
            </div>
            <div className="register-popup__terms">
              {
                this.state.againRequestDelay === 0
                  ? (<a
                    className="register-popup__link"
                    onClick={this.againRequest}
                  >
                    {__t('Send code again')}
                  </a>)
                  : (<div>
                    {__t('You can get request again in')}
                    {' '}
                    <Timer
                      duration={this.state.againRequestDelay}
                      handleSecond={this.handleSecond}
                    />
                    {' '}
                    {__t('seconds')}
                  </div>)
              }
              {
                (againErrors.contact || againErrors.phone)
                &&
                <div>
                  {
                    againErrors.contact
                    &&
                    againErrors.contact.map(error => <div className="login__form-error">
                      {error}
                    </div>)
                  }
                  {
                    againErrors.phone
                    &&
                    againErrors.phone.map(error => <div className="login__form-error">
                      {error}
                    </div>)
                  }
                </div>
              }
            </div>
            <Button
              className="register-popup__fetch-button-new"
              onClick={this.handleClick}
              isFetching={isFetching}
              text={this.buttonText}
            />
            <button
              className="register-popup__button"
              type="button"
              onClick={this.goBack}
            >
              {__t('Back')}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default ConfirmPopup;

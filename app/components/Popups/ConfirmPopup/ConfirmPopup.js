import { React, PureComponent, Type } from '../../../components-lib/__base';
import { Button } from '../../../components-lib';
import IconClose from '../../../icons/close';

import { ErrorInput } from '../../Inputs';
import Timer from './Timer';

import { __t } from '../../../i18n/translator';

import './ConfirmPopup.less';

class ConfirmPopup extends PureComponent {
  static propTypes = {
    closePopup: Type.func.isRequired,
    sendForm: Type.func.isRequired,
    isFetching: Type.bool.isRequired,
    errors: Type.oneOfType([Type.object, Type.any]),
    options: Type.shape({
      callback: Type.func,
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

  resendConfirmationCode = () => {
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

  handleBackClick = () => {
    throw new Error('ConfirmPopup: goBack method must be overrited in child class');
  }

  render() {
    const { closePopup, isFetching, errors, options } = this.props;
    const { againErrors } = this.state;

    return (
      <div className="popup-wrap" id="sendMessage">
        <div
          className="popup mobile-search__popup reset-popup"
        >
          <div className="register-popup__title">
            {this.title}
          </div>
          <Button
            view="icon"
            className="register-popup__close"
            onClick={closePopup}
            aria-label={__t('Close')}
            icon={<IconClose
              size="xs"
              color="gray-500"
            />}
          />

          <form className="register-popup__form">
            <div className="register-popup__instructions">
              <div className="register-popup__contact">
                {options.contact}
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
                className="input"
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
                  ? (
                    <Button
                      view="link"
                      onClick={this.resendConfirmationCode}
                      text={__t('Send code again')}
                    />
                  )
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
            <Button
              color="secondary"
              className="register-popup__button-back"
              onClick={this.handleBackClick}
              text={__t('Back')}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default ConfirmPopup;

import React, { Component, PropTypes } from 'react';

import { FetchingButton } from 'components';

import { setpassPopup } from 'ducks/Popup';
import { __t } from '../../i18n/translator';

class SetPasswordPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      repassword: '',
      errorMessage: '',
    };
  }

  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
      errorMessage: '',
    });
  }

  handleRePassword = (e) => {
    this.setState({
      repassword: e.target.value,
      errorMessage: '',
    });
  }

  handleSend = () => {
    const { handleSet } = this.props;
    const password = this.state.password.trim();
    const repassword = this.state.repassword.trim();
    const formData = new FormData();

    formData.append('new_password', password);
    formData.append('re_new_password', repassword);

    handleSet(formData);
  }

  closePopup = () => {
    const { dispatch } = this.props;

    dispatch(setpassPopup(false));
  }
  
  render() {
    const { isFetching, errors } = this.props;
    return (
      <div className="popup-wrap" id="register-popup" style={{ display: 'block' }}>
        <div className="popup">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14.031"
            className="popup-close icon"
            onClick={this.closePopup}
          >
            <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z" />
          </svg>
          <div className="popup-title">
            {__t('Set up your password')}
          </div>
          <form>
            <div className="input-wrap phone">
              <label>
                {__t('Enter new password')}
              </label>
              <input
                className="input"
                type="password"
                placeholder={__t('New password')}
                value={this.state.password}
                onChange={this.handlePassword}
              />
            </div>
            {
              errors && errors.new_password
              &&
              <div>
                {
                  errors.new_password
                    .map((error, idx) => <div
                      className="login__form-error"
                      key={idx}
                    >
                      {error}
                    </div>)
                }
              </div>
            }
            <div className="input-wrap phone">
              <label>
                {__t('Re-enter new password')}
              </label>
              <input
                className="input"
                type="password"
                placeholder={__t('Re-enter new password')}
                value={this.state.repassword}
                onChange={this.handleRePassword}
              />
            </div>
            {
              errors && errors.re_new_password
              &&
              <div>
                {
                  errors.re_new_password
                    .map((error, idx) => <div
                      className="login__form-error"
                      key={idx*100}
                    >
                      {error}
                    </div>)
                }
              </div>
            }
            <div className="buttons-wrap">
              <FetchingButton
                className="default-button"
                type="button"
                onClick={this.handleSend}
                isFetching={isFetching}
              >
                {__t('Set password')}
              </FetchingButton>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SetPasswordPopup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSet: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default SetPasswordPopup;

import React, { Component } from 'react';

import { FetchingButton } from 'components';

import { registerPopup, confirmPopup } from 'ducks/Popup';
import { __t } from '../../i18n/translator';

import './index.styl';

export default class Confirm extends Component {
  constructor() {
    super();
    this.state = {
      confirmCode: '',
      confirmError: '',
    };
  }

  handleClick = () => {
    const { errorMessage, dispatch, onConfirmClick, isFetching } = this.props;
    const confirmCode = this.confirmCode;
    const creds = {
      phone: JSON.parse(localStorage.getItem('phoneNum')),
      code: confirmCode.value.trim(),
    };

    onConfirmClick(creds);
  }

  confirmChange = (e) => {
    this.setState({
      confirmCode: e.target.value,
      confirmError: '',
    });
  }

  closePopup = () => {
    const { dispatch } = this.props;

    dispatch(confirmPopup(false));
  }

  goBack = () => {
    const { dispatch } = this.props;

    localStorage.removeItem('openConfirm');
    localStorage.removeItem('phoneNum');
    dispatch(dispatch(registerPopup(true)), dispatch(confirmPopup(false)));
  }

  render() {
    const { errors, dispatch, isFetching } = this.props;
    const number = JSON.parse(localStorage.getItem('phoneNum'));

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
            {__t('Confirm your phone ')} {number}
          </div>
          <form>
            <div className="input-wrap phone">
              <input
                className="input"
                ref={confirm => (this.confirmCode = confirm)}
                type="text"
                placeholder={__t('SMS code')}
                value={this.state.confirmCode}
                onChange={this.confirmChange}
              />
            </div>
            <div>
              <label>
                {__t('If SMS code did not come in 5 minutes, get request again')}
              </label>
            </div>
            {
              errors && errors.code
              &&
              <div className="login__form-error login__form-error--top">
                {errors.code}
              </div>
            }
            <div className="buttons-wrap">
              <FetchingButton
                className="default-button"
                type="button"
                onClick={this.handleClick}
                isFetching={isFetching}
              >
                {__t('Confirm registration')}
              </FetchingButton>
              <button
                className="cancel-button"
                type="button"
                onClick={this.goBack}
              >
                {__t('Back')}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Popup from '../CommonPopup';
import { SocialLogin, FetchingButton } from 'components';

import { loginUser } from 'ducks/Auth';
import { openPopup } from 'ducks/Popup';
import { __t } from '../../../i18n/translator';

import './ConfirmPopup.styl';

class ConfirmPopup extends Component {
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

  confirmChange = ({ target }) => this.setState({
    confirmCode: target.value.trim(),
    confirmError: '',
  })

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
    const { closePopup, isFetching, errors } = this.props;

    return (
      <Popup
        closePopup={closePopup}
        title={__t('Confirm your phone')}
      >
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
      </Popup>
    );
  }
}

ConfirmPopup.propTypes = {
  closePopup: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errors: PropTypes.oneOf(PropTypes.object, PropTypes.any),
};

const mapStateToProps = ({ Auth }) => ({
  isFetching: Auth.isFetching,
  errors: Auth.errors,
});

export default connect(mapStateToProps)(ConfirmPopup);

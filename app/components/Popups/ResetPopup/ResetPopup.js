import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Popup from './CommonPopup';
import { FetchingButton } from 'components';

import { resetUser } from 'ducks/Auth';
import { openPopup } from 'ducks/Popup';
import { __t } from '../../../i18n/translator';

import './ResetPopup.styl';

class ResetPopup extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
    };
  }

  handleChangeUsername = ({ target }) => this.setState({
    username: target.value.trim(),
  })

  handleClick = () => this.props.dispatch(resetUser({
    username: this.state.username,
  }))

  signUpOpen = () => this.props.dispatch(openPopup('registerPopup'))

  render() {
    const { isFetching, errors, closePopup } = this.props;

    return (
      <Popup
        closePopup={closePopup}
        title={__t('recover.your.password')}
      >
        <div className="popup-notice">
          {__t('Via your phone')}
        </div>
        <form className="popup-form">
          <div className="popup-form__field">
            <div className="input-wrap">
              <input
                id="phone-number"
                placeholder={__t('phone.number.with.country')}
                className="input"
                type="text"
                onChange={this.handleChangeUsername}
                disabled={isFetching}
              />
            </div>
            {
              errors && errors.username
              &&
              <div className="login__form-error login__form-error--top">
                {errors.username}
              </div>
            }
          </div>
          <div className="buttons-wrap">
            <FetchingButton
              className="default-button"
              type="button"
              onClick={this.handleClick}
              isFetching={isFetching}
            >
              {__t('Recover.your.password')}
            </FetchingButton>
            <button
              className="cancel-button"
              type="button"
              onClick={this.signUpOpen}
              disabled={isFetching}
            >
              {__t('Sign Up')}
            </button>
          </div>
        </form>
      </Popup>
    );
  }
}

ResetPopup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = ({ Auth }) => ({
  isFetching: Auth.isFetching,
  errors: Auth.errors,
});

export default connect(mapStateToProps)(ResetPopup);

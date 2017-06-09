import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Popup from '../CommonPopup';
import { FetchingButton } from 'components';
import { ErrorInput } from 'components/Inputs';

import { reset } from 'ducks/Auth/authActions';
import { openPopup } from 'ducks/Popup/actions';
import { __t } from '../../../i18n/translator';

import './ResetPopup.styl';

class ResetPopup extends Component {
  constructor() {
    super();
    this.state = {
      phone: '',
      email: '',
      mode: 'phone',
    };
  }

  handleChange = ({ target }) => this.setState({
    [this.state.mode]: target.value.trim(),
  })

  handleClick = () => this.props.dispatch(reset({
    [this.state.mode]: this.state[this.state.mode],
  }, this.state.mode))

  switchMode = () => this.setState({
    mode: this.state.mode === 'phone'
      ? 'email'
      : 'phone',
  });

  signUpOpen = () => this.props.dispatch(openPopup('registerPopup'))

  render() {
    const { mode } = this.state;
    const { isFetching, errors, closePopup } = this.props;
    const placeholder = mode === 'phone'
      ? 'phone.number.with.country'
      : 'Your email';
    const switchText = mode === 'phone'
      ? 'Recover via Email'
      : 'Recover via phone number';
    const value = mode === 'phone'
      ? this.state.phone
      : this.state.email;

    return (
      <Popup
        closePopup={closePopup}
        title={__t('recover.your.password')}
      >
        <div className="popup-notice">
          {__t(`Via your ${mode}`)}
        </div>
        <form className="popup-form">
          <div className="popup-form__field">
            <ErrorInput
              className="input"
              value={value}
              onChange={this.handleChange}
              disabled={isFetching}
              placeholder={__t(placeholder)}
              errors={errors.non_field_errors || errors[mode]}
              wrapperClass="input-wrap"
            />
          </div>
          <button
            className="reset__switch-mode"
            type="button"
            onClick={this.switchMode}
          >
            {__t(switchText)}
          </button>
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

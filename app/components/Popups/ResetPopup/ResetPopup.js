import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FetchingButton } from 'components';
import { ErrorInput } from 'components/Inputs';

import { reset } from 'ducks/Auth/authActions';
import { openPopup } from 'ducks/Popup/actions';
import { __t } from '../../../i18n/translator';

import './ResetPopup.styl';

class ResetPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: props.options.contact || '',
    };
  }

  handleChange = ({ target }) => this.setState({
    contact: target.value.trim(),
  })

  handleClick = () => this.props.dispatch(reset(this.state))

  signUpOpen = () => this.props.dispatch(openPopup('registerPopup'))

  render() {
    const { isFetching, errors, closePopup } = this.props;

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
              {__t('recover.your.password')}
            </div>
          </header>
          <form className="register-popup__form">
            <div className="register-popup__field">
              <ErrorInput
                className="register-popup__input"
                value={this.state.contact}
                onChange={this.handleChange}
                disabled={isFetching}
                placeholder={__t('Your email or phone number')}
                errors={errors.contact}
                errorClass="login__form-error"
              />
            </div>
            <FetchingButton
              className="register-popup__fetch-button"
              type="button"
              onClick={this.handleClick}
              isFetching={isFetching}
            >
              {__t('Recover.your.password')}
            </FetchingButton>
            <button
              className="register-popup__button"
              type="button"
              onClick={this.signUpOpen}
              disabled={isFetching}
            >
              {__t('Sign Up')}
            </button>
          </form>
        </div>
      </div>
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

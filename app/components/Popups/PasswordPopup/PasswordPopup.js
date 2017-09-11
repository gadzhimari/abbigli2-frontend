import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ErrorInput } from 'components/Inputs';
import { FetchingButton } from 'components';

import { setPassword } from 'ducks/Auth/authActions';
import { __t } from '../../../i18n/translator';

import './PasswordPopup.styl';

class PasswordPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      repassword: '',
    };
  }

  handlePassword = ({ target }) => this.setState({
    password: target.value.trim(),
  });

  handleRePassword = ({ target }) => this.setState({
    repassword: target.value.trim(),
  });

  handleSend = () => {
    const formData = new FormData();

    formData.append('new_password', this.state.password);
    formData.append('re_new_password', this.state.repassword);

    this.props.dispatch(setPassword(formData));
  }


  render() {
    const { closePopup, isFetching, errors } = this.props;

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
              {__t('Set up your password')}
            </div>
          </header>
          <form className="register-popup__form">
            <div className="register-popup__field">
              <ErrorInput
                className="register-popup__input"
                value={this.state.password}
                onChange={this.handlePassword}
                disabled={isFetching}
                placeholder={__t('New password')}
                errors={errors.new_password}
                errorClass="login__form-error"
                type="password"
              />
            </div>
            <div className="register-popup__field">
              <ErrorInput
                className="register-popup__input"
                value={this.state.repassword}
                onChange={this.handleRePassword}
                disabled={isFetching}
                placeholder={__t('Re-enter new password')}
                errors={errors.re_new_password}
                errorClass="login__form-error"
                type="password"
              />
            </div>
            <FetchingButton
              className="register-popup__fetch-button"
              type="button"
              onClick={this.handleSend}
              isFetching={isFetching}
            >
              {__t('Set password')}
            </FetchingButton>
          </form>
        </div>
      </div>
    );
  }
}

PasswordPopup.propTypes = {
  closePopup: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
};

const mapStateToProps = ({ Auth }) => ({
  isFetching: Auth.isFetching,
  errors: Auth.errors,
});

export default connect(mapStateToProps)(PasswordPopup);

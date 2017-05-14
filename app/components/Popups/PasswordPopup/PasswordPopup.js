import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Popup from './CommonPopup';
import { FetchingButton } from 'components';

import { setPassword } from 'ducks/Auth';
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
      <Popup
        closePopup={closePopup}
        title={__t('Set up your password')}
      >
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
              disabled={isFetching}
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
              disabled={isFetching}
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
                    key={idx * 100}
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
      </Popup>
    );
  }
}

PasswordPopup.propTypes = {
  closePopup: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errors: PropTypes.oneOf(PropTypes.object, PropTypes.any),
};

const mapStateToProps = ({ Auth }) => ({
  isFetching: Auth.isFetching,
  errors: Auth.errors,
});

export default connect(mapStateToProps)(PasswordPopup);

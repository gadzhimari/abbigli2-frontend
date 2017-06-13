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
      contact: '',
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
      <Popup
        closePopup={closePopup}
        title={__t('recover.your.password')}
      >
        <div className="popup-notice">
          {__t('Via your email or phone')}
        </div>
        <form className="popup-form">
          <div className="popup-form__field">
            <ErrorInput
              className="input"
              value={this.state.contact}
              onChange={this.handleChange}
              disabled={isFetching}
              placeholder={__t('Your email or phone number')}
              errors={errors.contact}
              wrapperClass="input-wrap"
            />
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

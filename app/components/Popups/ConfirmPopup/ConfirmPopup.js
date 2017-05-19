import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Popup from '../CommonPopup';
import { FetchingButton } from 'components';

import { openPopup } from 'ducks/Popup/actions';
import { __t } from '../../../i18n/translator';

import './ConfirmPopup.styl';

class ConfirmPopup extends Component {
  constructor() {
    super();
    this.state = {
      confirmCode: '',
    };
  }

  handleClick = () => {
    const { options, number } = this.props;
    const creds = {
      phone: number,
      code: this.state.confirmCode,
    };

    options.callback(creds);
  }

  confirmChange = ({ target }) => this.setState({
    confirmCode: target.value.trim(),
  })

  goBack = () => {
    const { dispatch, options } = this.props;

    dispatch(openPopup(options.previousPopup));
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
  options: PropTypes.shape({
    callback: PropTypes.func.isRequired,
    previousPopup: PropTypes.string,
  }).isRequired,
  number: PropTypes.number.isRequired,
};

const mapStateToProps = ({ Auth }) => ({
  isFetching: Auth.isFetching,
  errors: Auth.errors,
  number: Auth.number,
});

export default connect(mapStateToProps)(ConfirmPopup);

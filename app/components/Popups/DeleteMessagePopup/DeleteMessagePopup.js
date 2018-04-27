import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Recipient from '../MessagePopup/Recipient';

import { deleteDialog } from '../../../ducks/Dialogs/actions';
import { __t } from '../../../i18n/translator';

import './DeleteMessagePopup.styl';

class DeleteMessagePopup extends Component {
  deleteDialog = () => this.props
    .dispatch(deleteDialog(this.props.options.id))

  render() {
    const { closePopup, options } = this.props;

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
              {__t('Delete dialog')}
            </div>
          </header>
          <div className="register-popup__form">
            <div className="register-popup__terms">
              {__t('Are you sure you want to remove dialogue with')}
              <Recipient
                data={options}
                closePopup={closePopup}
              />
              {'?'}
            </div>
            <button
              className="register-popup__fetch-button"
              type="button"
              onClick={this.deleteDialog}
            >
              {__t('Delete')}
            </button>
            <button
              className="register-popup__button"
              type="button"
              onClick={closePopup}
            >
              {__t('Cancel')}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

DeleteMessagePopup.propTypes = {
  closePopup: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  options: PropTypes.shape({
    recipient: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default DeleteMessagePopup;

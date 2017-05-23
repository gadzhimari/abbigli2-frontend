import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Popup from '../CommonPopup';

import { deleteDialog } from 'ducks/Dialogs';
import { __t } from '../../../i18n/translator';

import './DeleteMessagePopup.styl';

class DeleteMessagePopup extends Component {
  deleteDialog = () => this.props
    .dispatch(deleteDialog(this.props.options.id))

  render() {
    const { closePopup, options } = this.props;

    return (
      <Popup
        closePopup={closePopup}
        title={__t('Delete dialog')}
      >
        <p>
          {__t('Are you sure you want to remove dialogue with')}
          {' '}
          «{options.recipient}»?
        </p>
        <div className="buttons-wrap">
          <button
            className="default-button"
            type="button"
            onClick={this.deleteDialog}
          >
            {__t('Delete')}
          </button>
          <button
            className="cancel-button"
            type="button"
            onClick={closePopup}
          >
            {__t('Cancel')}
          </button>
        </div>
      </Popup>
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

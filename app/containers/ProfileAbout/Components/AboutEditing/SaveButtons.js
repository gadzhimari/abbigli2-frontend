import React from 'react';
import Type from 'prop-types';

import { FetchingButton } from 'components';

import { __t } from '../../../../i18n/translator';

const SaveButtons = ({ handleSave, handleCancel, isSaving }) => (
  <div className="profile-about__save-buttons">
    <FetchingButton
      className="default-button"
      onClick={handleSave}
      isFetching={isSaving}
    >
      {__t('Save')}
    </FetchingButton>
    <button
      className="default-button"
      type="button"
      onClick={handleCancel}
    >
      {__t('Cancel')}
    </button>
  </div>
);

SaveButtons.propTypes = {
  handleCancel: Type.func,
  handleSave: Type.func,
  isSaving: Type.bool,
};

SaveButtons.defaultProps = {
  handleCancel: () => { },
  handleSave: () => { },
  isSaving: false,
};

export default SaveButtons;

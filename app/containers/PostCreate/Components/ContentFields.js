import React from 'react';
import PropTypes from 'prop-types';

import { ErrorInput, DateInput } from 'components/Inputs';

import { __t } from '../../../i18n/translator';

const ContentFields = () => {
  return (
    <div className="add-tabs__form">
      <div className="add-tabs__form-field">
        <label className="label" htmlFor="aboutEvent">
          {__t('Description')}
        </label>
        <textarea className="textarea" id="aboutEvent" />
      </div>
      <div className="add-tabs__form-field">
        <label className="label" htmlFor="tagsEvent">
          {__t('Tags')}
        </label>
        <input className="input" id="tagsEvent" type="text" />
      </div>
    </div>
  );
};

export default ContentFields;

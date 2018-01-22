import React from 'react';
import PropTypes from 'prop-types';

import { Textarea } from '../../../components/Inputs';

import { __t } from '../../../i18n/translator';

const ContentFields = ({ isBlog, onChange, value }) => (
  <div className="add-tabs__form-field">
    <label className="label" htmlFor="aboutEvent">
      {__t('Description')}
    </label>
    {
      isBlog
        ? <Textarea
          onChange={onChange}
          value={value}
        />
        : <textarea
          className="textarea"
          value={value}
          onChange={onChange}
          name="content"
        />
    }
  </div>
);

ContentFields.propTypes = {
  isBlog: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default ContentFields;

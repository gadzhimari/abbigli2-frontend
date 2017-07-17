import React from 'react';
import PropTypes from 'prop-types';

import { ErrorInput, Textarea } from 'components/Inputs';

import { __t } from '../../../i18n/translator';

const ContentFields = ({ isBlog, onChange, contentValue, tagsValue, blogValue, errors }) => (
  <div className="add-tabs__form">
    <div className="add-tabs__form-field">
      <label className="label" htmlFor="aboutEvent">
        {__t('Description')}
      </label>
      {
        isBlog
          ? <Textarea
            onChange={onChange}
            value={blogValue}
          />
          : <textarea
            className="textarea"
            value={contentValue}
            onChange={onChange}
            name="content"
          />
      }
    </div>
    <ErrorInput
      className="input"
      id="tags"
      name="tags"
      value={tagsValue}
      onChange={onChange}
      placeholder=""
      errors={errors.tags}
      wrapperClass="add-tabs__form-field input-wrap"
      wrapperErrorClass="error"
      labelRequired
      label={__t('Tags')}
    />
  </div>
);

ContentFields.propTypes = {
  isBlog: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  contentValue: PropTypes.string.isRequired,
  tagsValue: PropTypes.string.isRequired,
  blogValue: PropTypes.string.isRequired,
  errors: PropTypes.shape({
    tags: PropTypes.array,
  }).isRequired,
};

export default ContentFields;

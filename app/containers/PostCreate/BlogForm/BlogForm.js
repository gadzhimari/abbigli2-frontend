import React from 'react';

import merge from 'lodash/merge';

import CreateForm from '../CreateForm/CreateForm';
import FormBlock from '../FormBlock';
import { ErrorInput } from '../../../components/Inputs';
import ImageUploadZone from '../../../components/ImageUploadZone';
import FetchingButton from '../../../components/FetchingButton';
import Button from '../../../components/Button';
import Redactor from '../../../components/Inputs/Redactor';
import Select from '../../../components/Inputs/Select';

import categoriesAdapter from '../../../lib/adapters/categories-to-options';
import { __t } from '../../../i18n/translator';

class BlogForm extends CreateForm {
  constructor(props) {
    super(props);

    this.state = merge({
      title: '',
      content: '',
      tags: '',
      images: [],
      categories: null
    }, props.data);
  }

  render() {
    const {
      visible,
      errors,
      sections,
      isSaving,
      imageZoneActions,
      ...imageZoneProps,
    } = this.props;

    const { title, content, tags, categories } = this.state;

    if (!visible) return null;

    return (
      <form className="add-tabs__content_blog">
        <FormBlock>
          <ErrorInput
            className="input"
            name="title"
            value={title}
            onChange={this.onChange}
            errors={errors.title}
            wrapperClass="add-tabs__form-field input-wrap"
            wrapperErrorClass="error"
            labelRequired
            label={__t('Title')}
          />

          <Select
            wrapperClass="add-tabs__form-field"
            className="add-tabs__select"
            label={__t('Choose category')}
            placeholder=""
            options={sections}
            optionsAdapter={categoriesAdapter}
            onChange={this.onChange}
            value={categories}
            name="categories"
          />
        </FormBlock>

        <FormBlock>
          <ImageUploadZone
            {...imageZoneProps}
            {...imageZoneActions}
            errors={errors.images}
          />
        </FormBlock>

        <FormBlock>
          <Redactor
            wrapperClass="add-tabs__form-field"
            className="textarea"
            onChange={this.onChange}
            name="content"
            value={content}
            label={__t('Description')}
          />

          <ErrorInput
            className="input"
            name="tags"
            value={tags}
            onChange={this.onChange}
            errors={errors.tags}
            wrapperClass="add-tabs__form-field input-wrap"
            wrapperErrorClass="error"
            labelRequired
            label={__t('Tags')}
          />
        </FormBlock>

        <div className="add-tabs__buttons">
          <FetchingButton
            className="default-button"
            isFetching={isSaving}
            onClick={this.onSave}
            type="button"
            name="add_post"
          >
            {__t('Publish')}
          </FetchingButton>

          <Button
            className="default-button"
            onClick={this.onCancel}
            type="button"
            name="add_post_cancel"
          >
            {__t('Cancel')}
          </Button>
        </div>
      </form>
    );
  }
}

export default BlogForm;

import React from 'react';

import CreateForm from '../CreateForm/CreateForm';
import FormBlock from '../FormBlock';
import { ErrorInput } from '../../../components/Inputs';
import ImageUploadZone from '../../../components/ImageUploadZone';
import FetchingButton from '../../../components/FetchingButton';
import Button from '../../../components/Button';
import Textarea from '../../../components/Inputs/Textarea';
import Select from '../../../components/Inputs/Select';
import DateInput from '../../../components/Inputs/DateInput';
import CitySelect from '../../../components/Inputs/CitySelect/';

import categoriesAdapter from '../../../lib/adapters/categories-to-options';
import { mergeObjects } from '../../../lib/merge-objects';
import { __t } from '../../../i18n/translator';

export default class EventForm extends CreateForm {
  constructor(props) {
    super(props);

    this.state = mergeObjects({
      title: '',
      content: '',
      tags: '',
      images: [],
      categories: null,
      date_start: '',
      date_end: '',
      city: null,
    }, props.data);
  }

  render() {
    const { visible,
            errors,
            sections,
            isFetchingImage,
            imagesErrors,
            isSaving,
            isTouch,
            openPopup } = this.props;

    const { title,
            images,
            content,
            tags,
            categories,
            date_start: dateStart,
            date_end: dateEnd,
            city } = this.state;

    if (!visible) return null;

    return (
      <form className="add-tabs__content_event">
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

          <CitySelect
            wrapperClass="add-tabs__form-field input-wrap"
            className="add-tabs__select"
            label={__t('Place')}
            placeholder=""
            value={city}
            name="city"
            onChange={this.onChange}
            errors={errors.city}
            compact={isTouch}
            openPopup={openPopup}
          />

          <div className="add-tabs__form-field">
            <ErrorInput
              wrapperClass="input-wrap add-tabs__form-calendar input-date"
              wrapperErrorClass="error"
              value={dateStart}
              onChange={this.onChange}
              name="date_start"
              errors={errors.date_start}
              component={DateInput}
              className="input"
              label={__t('Start.date')}
              labelRequired
            />

            <ErrorInput
              wrapperClass="input-wrap add-tabs__form-calendar input-date"
              wrapperErrorClass="error"
              value={dateEnd}
              onChange={this.onChange}
              name="date_end"
              errors={errors.date_end}
              component={DateInput}
              className="input"
              label={__t('End.date')}
            />
          </div >
        </FormBlock>

        <FormBlock>
          <ImageUploadZone
            onMove={this.onMoveImage}
            images={images}
            deleteImage={this.deleteImage}
            uploadImages={this.uploadImages}
            imageFetching={isFetchingImage}
            rotateImage={this.rotateImage}
            loadImageErrors={imagesErrors}
            errors={errors.images}
          />
        </FormBlock>

        <FormBlock>
          <Textarea
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
            name="add_event"
          >
            {__t('Publish')}
          </FetchingButton>

          <Button
            className="default-button"
            onClick={this.onCancel}
            type="button"
            name="add_event_cancel"
          >
            {__t('Cancel')}
          </Button>
        </div>
      </form >
    );
  }
}

import { React } from '../../../components-lib/__base';
import { Button } from '../../../components-lib';

import CreateForm from '../CreateForm/CreateForm';
import FormBlock from '../FormBlock';
import { ErrorInput } from '../../../components/Inputs';
import ImageUploadZone from '../../../components/ImageUploadZone';
import Textarea from '../../../components/Inputs/Textarea';
import Select from '../../../components/Inputs/Select';
import DateInput from '../../../components/Inputs/DateInput';
import CitySelect from '../../../components/Inputs/CitySelect/';

import categoriesAdapter from '../../../lib/adapters/categories-to-options';
import mergeObjects from '../../../lib/merge-objects';
import { __t } from '../../../i18n/translator';
import { getItemFromSessionStorage } from '../../../lib/sessionStorage';

class EventForm extends CreateForm {
  constructor(props) {
    super(props);

    this.sessionStorageKey = 'eventFormEvent';

    this.state = mergeObjects(getItemFromSessionStorage(this.sessionStorageKey, {
      title: '',
      description: '',
      tags: '',
      images: [],
      category: null,
      start: null,
      end: null,
      city: null,
      cityOptions: undefined
    }), props.data);
  }

  render() {
    const { visible,
            errors,
            sections,
            isFetchingImage,
            imagesErrors,
            isSaving,
            isTouch,
            openPopup,
            imageZoneActions,
            ...imageZoneProps } = this.props;

    const { title,
            description,
            tags,
            category,
            start,
            end,
            city,
            cityOptions } = this.state;

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
            className="add-tabs__form-field"
            selectClassName="add-tabs__select"
            label={__t('Choose category')}
            placeholder=""
            options={sections}
            optionsAdapter={categoriesAdapter}
            onChange={this.onChange}
            value={category}
            name="category"
            errors={errors.category}
          />

          <CitySelect
            className="add-tabs__form-field"
            selectClassName="add-tabs__select"
            label={__t('Place')}
            placeholder=""
            value={city}
            name="city"
            onChange={this.onChange}
            errors={errors.city}
            compact={isTouch}
            openPopup={openPopup}
            options={cityOptions}
            cache={false}
          />

          <div className="add-tabs__form-field">
            <ErrorInput
              wrapperClass="input-wrap add-tabs__form-calendar input-date"
              wrapperErrorClass="error"
              value={start || ''}
              onChange={this.onChange}
              name="start"
              errors={errors.start}
              component={DateInput}
              className="input"
              label={__t('Start.date')}
              labelRequired
            />

            <ErrorInput
              wrapperClass="input-wrap add-tabs__form-calendar input-date"
              wrapperErrorClass="error"
              value={end || ''}
              onChange={this.onChange}
              name="end"
              errors={errors.end}
              component={DateInput}
              className="input"
              label={__t('End.date')}
            />
          </div >
        </FormBlock>

        <FormBlock>
          <ImageUploadZone
            {...imageZoneProps}
            {...imageZoneActions}
            errors={errors.images}
          />
        </FormBlock>

        <FormBlock>
          <Textarea
            wrapperClass="add-tabs__form-field"
            className="textarea"
            onChange={this.onChange}
            name="description"
            value={description}
            errors={errors.description}
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
          <Button
            onClick={this.onSave}
            isFetching={isSaving}
            text={__t('Publish')}
            name="add_event"
          />
          <Button
            onClick={this.onCancel}
            name="add_event_cancel"
            text={__t('Cancel')}
            color="secondary"
          />
        </div>
      </form >
    );
  }
}

export default EventForm;

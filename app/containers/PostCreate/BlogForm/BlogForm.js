import { React } from '../../../components-lib/__base';
import { Button, Redactor } from '../../../components-lib';

import CreateForm from '../CreateForm/CreateForm';
import FormBlock from '../FormBlock';
import { ErrorInput } from '../../../components/Inputs';
import ImageUploadZone from '../../../components/ImageUploadZone';
import Select from '../../../components/Inputs/Select';

import categoriesAdapter from '../../../lib/adapters/categories-to-options';
import mergeObjects from '../../../lib/merge-objects';
import { __t } from '../../../i18n/translator';
import { getItemFromSessionStorage } from '../../../lib/sessionStorage';

class BlogForm extends CreateForm {
  constructor(props) {
    super(props);

    this.sessionStorageKey = 'eventFormBlog';

    this.state = mergeObjects(getItemFromSessionStorage(this.sessionStorageKey, {
      title: '',
      text: '',
      tags: '',
      images: [],
      category: null
    }), props.data);
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

    const { title, text, tags, category } = this.state;

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
            value={category}
            name="category"
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
            id="description"
            className="add-tabs__form-field"
            onChange={this.onChange}
            name="text"
            value={text}
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
            name="add_post"
          />
          <Button
            onClick={this.onCancel}
            name="add_post_cancel"
            text={__t('Cancel')}
            color="secondary"
          />
        </div>
      </form>
    );
  }
}

export default BlogForm;

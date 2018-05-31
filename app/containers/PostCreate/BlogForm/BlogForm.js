import { React } from '../../../components-lib/__base';
import { Button } from '../../../components-lib';

import CreateForm from '../CreateForm/CreateForm';
import FormBlock from '../FormBlock';
import { ErrorInput } from '../../../components/Inputs';
import ImageUploadZone from '../../../components/ImageUploadZone';
import Redactor from '../../../components/Inputs/Redactor';
import Select from '../../../components/Inputs/Select';

import categoriesAdapter from '../../../lib/adapters/categories-to-options';
import mergeObjects from '../../../lib/merge-objects';
import { __t } from '../../../i18n/translator';

class BlogForm extends CreateForm {
  constructor(props) {
    super(props);

    let get = (key, defaultValue) => {
      return sessionStorage.getItem('createForm_' + key) || defaultValue;
    };

    let getInt = (key) => {
      let str = sessionStorage.getItem('createForm_' + key);
      return (!!str ? parseInt(str) : null);
    };

    this.state = mergeObjects({
      title: get('title', ''),
      content: get('content', ''),
      tags: get('tags', ''),
      images: get('images', '').replace('createForm_', '').split(','),
      categories: getInt('categories')
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

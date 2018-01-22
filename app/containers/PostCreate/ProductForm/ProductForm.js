import React from 'react';
import Type from 'prop-types';
import block from 'bem-cn';

import CreateForm from '../CreateForm/CreateForm';

import { ErrorInput } from '../../../components/Inputs';
import { ChoiceColor } from '../../../components/FiltersSelects';
import FormBlock from '../FormBlock';
import MultiSelect from '../Components/MultiSelect';
import ContentFields from '../Components/ContentFields';
import ImageUploadZone from '../../../components/ImageUploadZone';
import FetchingButton from '../../../components/FetchingButton';
import Button from '../../../components/Button';

import { __t } from '../../../i18n/translator';

import './ProductForm.less';

const b = block('ProductForm');

class ProductForm extends CreateForm {
  static propTypes = {
    visible: Type.bool,
    isSaving: Type.bool,
    isFetchingImage: Type.bool,
    errors: Type.shape({ title: Type.string }),
    sections: Type.arrayOf(Type.object),
    categories: Type.arrayOf(Type.object),
    imagesErrors: Type.arrayOf(Type.string),
    onCancel: Type.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      price: '',
      content: '',
      color: 'red',
      tags: '',
      images: [],
    };
  }

  render() {
    const {
        visible,
        errors,
        sections,
        categories,
        isFetchingImage,
        imagesErrors,
        isSaving,
        onCancel } = this.props;

    const { title, price, color, images, content, tags } = this.getDataProvider();

    if (!visible) return null;

    return (
      <form className={b} onSubmit={this.onSubmit}>
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

          <MultiSelect
            options={sections}
            ref={sectionSelect => (this.sectionSelect = sectionSelect)}
            currentCategory={this.state.categories && this.state.categories[0].slug}
            categories={categories}
          />

          <div className="add-tabs__form-field">
            <ErrorInput
              className="input"
              name="price"
              value={price}
              onChange={this.onChange}
              errors={errors.price}
              wrapperClass={b('price').mix('input-wrap')}
              wrapperErrorClass="error"
              labelRequired
              label={__t('Price')}
            />

            <ChoiceColor
              isMobile
              onChange={this.onChange}
              activeColor={color}
              className={b('choiceColor')}
            />
          </div>
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
          {/* TODO: выпилить этот компонент, сделать просто Textarea */}
          <ContentFields
            onChange={this.onChange}
            value={content}
            errors={errors}
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
            type="submit"
          >
            {__t('Publish')}
          </FetchingButton>

          <Button
            className="default-button"
            onClick={onCancel}
            type="button"
          >
            {__t('Cancel')}
          </Button>
        </div>
      </form>
    );
  }
}

export default ProductForm;

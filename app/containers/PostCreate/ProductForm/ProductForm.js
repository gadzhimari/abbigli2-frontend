import React from 'react';
import block from 'bem-cn';

import CreateForm from '../CreateForm/CreateForm';
import { ErrorInput } from '../../../components/Inputs';
import { ChoiceColor } from '../../../components/FiltersSelects';
import FormBlock from '../FormBlock';
import MultiSelect from '../Components/MultiSelect';
import Textarea from '../../../components/Inputs/Textarea';
import ImageUploadZone from '../../../components/ImageUploadZone';
import FetchingButton from '../../../components/FetchingButton';
import Button from '../../../components/Button';

import { mergeObjects } from '../../../lib/merge-objects';
import { __t } from '../../../i18n/translator';

import './ProductForm.less';
import bindMethods from '../../../lib/bindMethods';

const b = block('ProductForm');

class ProductForm extends CreateForm {
  constructor(props) {
    super(props);

    this.state = mergeObjects({
      title: '',
      price: '',
      content: '',
      colors: ['red'],
      tags: '',
      images: [],
      currentCategory: undefined
    }, props.data);

    bindMethods(this, ['onSave']);
  }

  onSave(...attr) {
    this.setState(
      { categories: this.sectionSelect.value },
      () => super.onSave(...attr)
    );
  }

  render() {
    const {
        visible,
        errors,
        sections,
        categories,
        isSaving,
        imageZoneActions,
        ...imageZoneProps } = this.props;

    const { title, price, colors, content, tags, currentCategory } = this.state;

    if (!visible) return null;

    return (
      <form className={b}>
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
            currentCategory={currentCategory}
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
              activeColor={colors[0]}
              className={b('choiceColor')}
            />
          </div>
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
            name="add_product"
          >
            {__t('Publish')}
          </FetchingButton>

          <Button
            className="default-button"
            onClick={this.onCancel}
            type="button"
            name="add_product_cancel"
          >
            {__t('Cancel')}
          </Button>
        </div>
      </form>
    );
  }
}

export default ProductForm;

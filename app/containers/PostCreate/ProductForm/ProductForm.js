import { React } from '../../../components-lib/__base';
import { Button } from '../../../components-lib';

import CreateForm from '../CreateForm/CreateForm';
import { ErrorInput } from '../../../components/Inputs';
import { ChoiceColor } from '../../../components/FiltersSelects';
import FormBlock from '../FormBlock';
import MultiSelect from '../Components/MultiSelect';
import Textarea from '../../../components/Inputs/Textarea';
import ImageUploadZone from '../../../components/ImageUploadZone';

import mergeObjects from '../../../lib/merge-objects';
import { __t } from '../../../i18n/translator';
import {getItemFromSessionStorage} from '../../../lib/sessionStorage';

import './ProductForm.less';
import bindMethods from '../../../lib/bindMethods';
import cn from '../../../lib/cn';

@cn('ProductForm')
class ProductForm extends CreateForm {
  constructor(props) {
    super(props);

    this.sessionStoragePrefix = 'eventFormProduct';
    this.state = mergeObjects(getItemFromSessionStorage(this.sessionStoragePrefix , {
      title: '',
      price: '',
      content: '',
      colors: ['red'],
      tags: '',
      images: [],
      currentCategory: undefined
    }), props.data);

    bindMethods(this, ['onSave']);
  }

  onSave(...attr) {
    this.setState(
      { categories: this.sectionSelect.value },
      () => super.onSave(...attr)
    );
  }

  render(cn) {
    const {
      visible,
      errors,
      sections,
      categories,
      isSaving,
      imageZoneActions,
    ...imageZoneProps,
    } = this.props;

    const { title, price, colors, content, tags, currentCategory } = this.state;

    if (!visible) return null;

    return (
      <form className={cn()}>
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
            ref={(sectionSelect) => { this.sectionSelect = sectionSelect; }}
            currentCategory={currentCategory}
            categories={categories}
            errors={errors.categories}
          />

          <div className="add-tabs__form-field">
            <ErrorInput
              className="input"
              name="price"
              value={price}
              onChange={this.onChange}
              errors={errors.price}
              wrapperClass={cn('price')}
              wrapperErrorClass="error"
              labelRequired
              label={__t('Price')}
            />

            <ChoiceColor
              isMobile
              onChange={this.onChange}
              activeColor={colors[0]}
              className={cn('choiceColor')}
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
          <Button
            onClick={this.onSave}
            isFetching={isSaving}
            text={__t('Publish')}
            name="add_product"
          />
          <Button
            onClick={this.onCancel}
            name="add_product_cancel"
            text={__t('Cancel')}
            color="secondary"
          />
        </div>
      </form>
    );
  }
}

export default ProductForm;

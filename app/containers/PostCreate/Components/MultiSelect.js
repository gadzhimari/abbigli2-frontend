/* eslint react/require-default-props: 0 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import MultiSelectItem from './MultiSelectItem';
import { __t } from '../../../i18n/translator';


class MultiSelect extends PureComponent {
  static propTypes = {
    /* Массив из элементов верхнего уровня */
    options: PropTypes.arrayOf(PropTypes.object),
    /* slug категории редактируемого поста
    (используется когда мы редактируем сущетствующий пост) */
    currentCategory: PropTypes.string,
    /* Список категорий нормализованных по slug */
    categories: PropTypes.objectOf(PropTypes.object)
  }

  static defaultProps = {
    options: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      values: [],
      stack: [{
        label: __t('Choose category'),
        children: props.options,
      }],
    };
  }

  componentDidMount() {
    if (this.props.currentCategory) {
      this.genetateInitialStack();
    }
  }

  getCategoriesByCurrentSlug = () => {
    const { currentCategory: slug, categories } = this.props;
    const currentCategories = [];

    let current = { parent: slug };

    while (current.parent) {
      current = categories[current.parent];

      currentCategories.unshift(current);
    }

    return currentCategories;
  }

  /* Возвращает последний индекс стэка вложенности */
  get lastStackIndex() {
    return this.state.stack.length - 1;
  }

  /* Возвращает последний индекс массива значений */
  get lastValuesIndex() {
    return this.state.stack.length - 1;
  }

  /* Возвращает значение последнего вложенного элемента */
  get value() {
    return this.lastStackIndex === this.lastValuesIndex
      ? this.state.values[this.lastStackIndex]
      : null;
  }

  genetateInitialStack = () => {
    const stack = [...this.state.stack];
    const values = [];
    const activeCategories = this.getCategoriesByCurrentSlug();

    activeCategories
      .forEach((cat) => {
        values.push(cat.id);
      });

    activeCategories
      .slice(0, -1)
      .forEach((cat) => {
        stack.push({
          label: cat.label,
          children: cat.children,
        });
      });

    this.setState({
      stack,
      values,
    });
  }

  sectionsChange = (value) => {
    if (value.index === this.lastStackIndex) {
      this.updateStackAndValue(value);
    } else {
      this.replaceStack(value.index, value);
    }
  }

  updateStackAndValue = (value) => {
    this.setState(prevState => ({
      stack: value.children.length > 0
        ? [...prevState.stack, value]
        : prevState.stack,
      values: [...prevState.values.slice(0, value.index), value.value],
    }));
  }

  replaceStack = (index, value) => {
    this.setState(prevState => ({
      stack: value.children.length > 0
        ? [...prevState.stack.slice(0, index + 1), value]
        : prevState.stack.slice(0, index + 1),
      values: [...prevState.values.slice(0, index), value.value],
    }));
  }

  render() {
    const { stack, values } = this.state;
    const { categories, errors } = this.props;
    const lastStackIdx = stack.length - 1;
    const showError = errors && errors.length !== 0;

    return (
      <div className="add-tabs__form-field">
        <div className="label">
          {__t('Choose category')}
        </div>

        {stack
          .map((group, idx) => <MultiSelectItem
            options={group.children}
            index={idx}
            onChange={this.sectionsChange}
            value={values[idx]}
            categories={categories}
            key={idx}
            label={__t('Choose category')}
            errorState={showError && idx === lastStackIdx}
            errors={errors}
          />)
        }
      </div>
    );
  }
}

export default MultiSelect;

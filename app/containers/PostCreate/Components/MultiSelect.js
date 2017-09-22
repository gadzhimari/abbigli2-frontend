import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import MultiSelectItem from './MultiSelectItem';
import { __t } from '../../../i18n/translator';


class MultiSelect extends PureComponent {
  static propTypes = {
    /* Массив из элементов верхнего уровня */
    options: PropTypes.arrayOf(PropTypes.object),
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
      ? [this.state.values[this.lastStackIndex]]
      : [];
  }

  sectionsChange = (value) => {
    if (value.index === this.lastStackIndex) {
      this.updateStackAndValue(value);

      return;
    }

    this.replaceStack(value.index, value);
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
    return (
      <div className="add-tabs__form-field">
        <label className="label">
          {__t('Choose category')}
        </label>
        {
          this.state.stack
            .map((group, idx) => <MultiSelectItem
              options={group.children}
              index={idx}
              onChange={this.sectionsChange}
              value={this.state.values[idx]}
              key={group.label}
              label={group.label}
            />)
        }
      </div>
    );
  }
}

export default MultiSelect;

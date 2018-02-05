/* eslint react/require-default-props: 0 */

import React, { PureComponent } from 'react';
import Type from 'prop-types';

import Select from 'react-select';

class MultiSelectItem extends PureComponent {
  static propTypes = {
    options: Type.arrayOf(Type.oneOfType([
      Type.shape({
        title: Type.string,
        id: Type.number,
        children: Type.array,
      }),
      Type.string
    ])),
    onChange: Type.func,
    label: Type.string,
    index: Type.number,
    value: Type.number,
    categories: Type.shape(),
  };

  static defaultProps = {
    onChange: null,
    label: '',
    index: 0,
    value: null,
  };

  state = {
    value: '',
  }

  handleChange = (option) => {
    this.setState({
      value: option.value,
    });

    if (this.props.onChange) {
      this.props.onChange(option);
    }
  }

  render() {
    const { options, label, index, value, categories } = this.props;
    const formatedOptions = options.map(option => {
      if (typeof option === 'string') {
        option = categories[option];
      }

      return ({
        ...option,
        value: option.id,
        label: option.title,
        index,
      });
    });

    return (
      <Select
        options={formatedOptions}
        className="add-tabs__select"
        name="form-field-name"
        value={value}
        onChange={this.handleChange}
        clearable={false}
        placeholder={label}
        autosize={false}
      />
    );
  }
}

export default MultiSelectItem;

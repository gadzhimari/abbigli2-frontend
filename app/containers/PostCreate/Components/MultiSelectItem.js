/* eslint react/require-default-props: 0 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';

class MultiSelectItem extends PureComponent {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.number,
      children: PropTypes.array,
    })).isRequired,
    onChange: PropTypes.func,
    label: PropTypes.string,
    index: PropTypes.number,
    value: PropTypes.number,
    categories: PropTypes.arrayOf(PropTypes.object),
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
      />
    );
  }
}

export default MultiSelectItem;

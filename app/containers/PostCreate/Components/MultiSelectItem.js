import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';

class MultiSelectItem extends PureComponent {
  render() {
    const { options, label, index, value } = this.props;
    const formatedOptions = options.map(option => ({
      ...option,
      value: option.id,
      label: option.title,
      index,
    }));

    return (
      <Select
        options={formatedOptions}
        className="add-tabs__select"
        name="form-field-name"
        value={value}
        id="sectionGoods"
        onChange={this.handleChange}
        clearable={false}
        placeholder={label}
      />
    );
  }

  handleChange = (option) => {
    this.setState({
      value: option.value,
    });

    if (this.props.onChange) {
      this.props.onChange(option);
    }
  }
}

MultiSelectItem.defaultProps = {
  onChange: null,
  label: '',
  index: 0,
  value: null,
};

MultiSelectItem.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    children: PropTypes.array,
  })).isRequired,
  onChange: PropTypes.func,
  label: PropTypes.string,
  index: PropTypes.number,
  value: PropTypes.number,
};

export default MultiSelectItem;

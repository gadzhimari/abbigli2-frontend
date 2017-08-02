import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class PriceInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
  }

  onBlur = () => {
    const { onBlur } = this.props;

    onBlur();
    this.toggleFocused();
  }

  toggleFocused = () => {
    this.setState({
      isFocused: !this.state.isFocused,
    });
  }

  render() {
    const { pricePrefix, placeholder, validator, onChange, field, className } = this.props;
    let { value } = this.props;

    if (value.length > 0 && !this.state.isFocused) {
      value = `${pricePrefix} ${value}`;
    }

    return (
      <input
        className={className}
        type="text"
        placeholder={placeholder}
        onKeyDown={validator}
        onChange={onChange}
        value={value}
        data-field={field}
        onFocus={this.toggleFocused}
        onBlur={this.onBlur}
      />
    );
  }

}

PriceInput.defaultProps = {
  onBlur: () => true,
};

PriceInput.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  pricePrefix: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  validator: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

export default PriceInput;

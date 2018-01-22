import React, { Component } from 'react';
import Type from 'prop-types';

import './Input.less';

class Input extends Component {
  static propTypes = {
    onChange: Type.func,
    name: Type.string,
    className: Type.string,
  }

  state = {
    value: '',
  }

  onChange = (e) => {
    const { target: { value } } = e;
    const { name } = this.props;

    this.setState({ value });

    if (this.props.onChange) {
      this.props.onChange(e, { name, value });
    }
  }

  render() {
    const { className, name } = this.props;

    return (
      <input
        className={className}
        onChange={this.onChange}
        name={name}
      />
    );
  }
}

export default Input;

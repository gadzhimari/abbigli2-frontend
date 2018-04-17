import Type from 'prop-types';
import React, { PureComponent } from 'react';

import './redactor/redactor.css';
import './Textarea.less';

let textateaIds = 0;

export default class Textarea extends PureComponent {
  static propTypes = {
    onChange: Type.func,
    value: Type.string,
    name: Type.string,
    wrapperClass: Type.string,
    label: Type.string,
  };

  state = {
    id: textateaIds++,
    value: ''
  }

  onChange(e) {
    const { onChange, name } = this.props;
    const { value } = e.target;

    this.setState({ value });

    if (onChange) {
      onChange(e, { name, value });
    }
  }

  getValue = () => {
    const { value } = this.props;

    return typeof value === 'undefined' ?
      this.state.value : value;
  }

  render() {
    const { wrapperClass, label, ...textareaProps } = this.props;

    const props = {
      ...textareaProps,
      onChange: this.onChange,
      id: this.state.id,
      value: this.getValue()
    };

    return (
      <div className={wrapperClass}>
        {label &&
          <label className="label" htmlFor={this.id}>
            {label}
          </label>
        }

        <textarea
          {...props}
        />
      </div>
    );
  }
}

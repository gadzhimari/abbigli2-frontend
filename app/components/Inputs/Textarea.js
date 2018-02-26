import Type from 'prop-types';
import React, { PureComponent } from 'react';

import bindMethods from '../../lib/bindMethods';

import './redactor/redactor.css';
import './Textarea.less';

export default class Textarea extends PureComponent {
  static propTypes = {
    onChange: Type.func,
    value: Type.string,
    name: Type.string,
    wrapperClass: Type.string,
    label: Type.string,
  };

  constructor(props) {
    super(props);

    /* TODO: сделать нормально */
    this.id = Math.random() * Math.random();

    bindMethods(this, ['onChange']);
  }

  onChange(e) {
    const { onChange, name } = this.props;

    if (onChange) {
      onChange(e, { name, value: e.target.value });
    }
  }

  render() {
    const { wrapperClass, label, ...textareaProps } = this.props;

    delete textareaProps.name;
    delete textareaProps.onChange;

    return (
      <div className={wrapperClass}>
        {label &&
          <label className="label" htmlFor={this.id}>
            {label}
          </label>
        }

        <textarea
          id={this.id}
          onChange={this.onChange}
          {...textareaProps}
        />
      </div>
    );
  }
}

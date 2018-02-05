import React, { PureComponent } from 'react';
import Type from 'prop-types';

import ReactSelect, { Async } from 'react-select';

import 'react-select/dist/react-select.css';

export default class Select extends PureComponent {
  static propTypes = {
    /**
     * Адаптер используется для приведения входных данных в вид
     * который понимает Select
     */
    optionsAdapter: Type.func,
    options: Type.arrayOf(Type.object),
    onChange: Type.func,
    wrapperClass: Type.string,
    label: Type.string,
    name: Type.string,
    async: Type.bool
  }

  static defaultProps = {
    optionsAdapter: options => options,
  }

  constructor(props) {
    super(props);

    const options = props.optionsAdapter(props.options);

    this.state = {
      options,
    };
  }

  onChange = ({ value, label }) => {
    const { onChange, name } = this.props;

    if (onChange) {
      onChange(null, { value, name, label });
    }
  }

  render() {
    const { wrapperClass, label, async, ...selectProps } = this.props;
    const { options } = this.state;

    delete selectProps.onChange;
    delete selectProps.options;
    delete selectProps.optionsAdapter;

    const SelectComponent = async ? Async : ReactSelect;

    return (
      <div className={wrapperClass}>
        {label &&
          <label className="label" htmlFor={this.id}>
            {label}
          </label>
        }

        <SelectComponent
          options={options}
          onChange={this.onChange}
          clearable={false}
          autosize={false}
          {...selectProps}
        />
      </div>
    );
  }
}

import React, { PureComponent } from 'react';
import Type from 'prop-types';

import ReactSelect from 'react-select';

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

  onChange = ({ value }) => {
    const { onChange, name } = this.props;

    if (onChange) {
      onChange(null, { value, name });
    }
  }

  render() {
    const { wrapperClass, label, ...selectProps } = this.props;
    const { options } = this.state;

    delete selectProps.onChange;
    delete selectProps.options;
    delete selectProps.optionsAdapter;

    return (
      <div className={wrapperClass}>
        {label &&
          <label className="label" htmlFor={this.id}>
            {label}
          </label>
        }

        <ReactSelect
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

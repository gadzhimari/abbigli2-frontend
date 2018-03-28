/* eslint react/require-default-props: 0 */

import React, { PureComponent, Fragment } from 'react';
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
    showError: false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorState !== this.props.errorState) {
      this.setState({
        showError: nextProps.errorState,
      });
    }
  }

  handleFocus = () => {
    this.setState({ showError: false });
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
    const { showError } = this.state;
    const { options, label, index, value, categories, errors } = this.props;

    const formatedOptions = options.map((option) => {
      if (typeof option === 'string') {
        // eslint-disable-next-line
        option = categories[option];
      }

      return ({
        ...option,
        value: option.id,
        label: option.title,
        index,
      });
    });

    const className = showError ?
      'add-tabs__select post-create__error-input' : 'add-tabs__select';

    return (
      <Fragment>
        <Select
          options={formatedOptions}
          className={className}
          name="form-field-name"
          value={value}
          onChange={this.handleChange}
          clearable={false}
          placeholder={label}
          autosize={false}
          onFocus={this.handleFocus}
        />

        {showError &&
          errors.map((error, idx) => (
            <div className="post-create__error" key={idx}>
              {error}
            </div>
          ))
        }
      </Fragment>
    );
  }
}

export default MultiSelectItem;

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Input from './Input';

import { omit } from 'utils/functions';

class InputWithError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { errors } = this.props;

    if (errors !== prevProps.errors && errors) {
      this.showError();
    }
  }

  showError = () => this.setState({
    showError: true,
  })

  hideError = () => this.setState({
    showError: false,
  })

  render() {
    const {
      component: RenderInput,
      wrapperClass,
      className,
      errors,
      errorClass,
      label,
      id,
      labelRequired,
      wrapperErrorClass,
    } = this.props;

    const inputClass = this.state.showError
      ? `${className} post-create__error-input`
      : className;

    const wrapper = this.state.showError
      ? `${wrapperClass} ${wrapperErrorClass}`
      : wrapperClass;

    const omitedProps = omit(
      this.props,
      ['className', 'component', 'wrapperClass', 'wrapperErrorClass', 'errors', 'errorClass', 'label', 'labelRequired']
    );

    return (
      <div className={wrapper}>
        {
          label
          &&
          <label className="label" htmlFor={id}>
            {label}
            {
              labelRequired
              &&
              <span className="label__required">*</span>
            }
          </label>
        }
        <RenderInput
          onFocus={this.hideError}
          className={inputClass}
          {...omitedProps}
        />
        {
          this.state.showError
          &&
          errors
          &&
          errors.length
          &&
          <div>
            {
              errors.map((error, key) => (<div
                className={errorClass}
                key={key}
              >
                {error}
              </div>))
            }
          </div>
        }
      </div>
    );
  }
}

InputWithError.defaultProps = {
  component: Input,
  type: 'text',
  errorClass: 'post-create__error',
  wrapperClass: '',
  wrapperErrorClass: '',
  label: null,
  id: '',
  labelRequired: false,
};

InputWithError.propTypes = {
  wrapperClass: PropTypes.string,
  className: PropTypes.string.isRequired,
  errorClass: PropTypes.string,
  wrapperErrorClass: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  labelRequired: PropTypes.bool,
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.element,
  ]),
  errors: PropTypes.any,
};


export default InputWithError;

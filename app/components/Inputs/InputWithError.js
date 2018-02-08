import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { omit } from 'lodash';

import Input from './Input';

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

  get mustShowErrors() {
    return this.state.showError && this.props.errors && this.props.errors.length;
  }

  render() {
    const {
      component: RenderInput,
      wrapperClass,
      className,
      errors,
      errorClass,
      label,
      id,
      Icon,
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
        <If condition={Icon}>
          {Icon}
        </If>
        <RenderInput
          onFocus={this.hideError}
          className={inputClass}
          {...omitedProps}
        />
        <If condition={this.mustShowErrors}>
          {
            errors.map(error => (<div
              className={errorClass}
              key={error}
            >
              {error}
            </div>))
          }
        </If>
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
  Icon: null,
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
  Icon: PropTypes.node,
};


export default InputWithError;

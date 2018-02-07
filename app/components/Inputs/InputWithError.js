import Type from 'prop-types';
import React, { Component } from 'react';
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
      Icon,
      labelRequired,
      wrapperErrorClass,
      ...inputProps
    } = this.props;

    const inputClass = this.state.showError
      ? `${className} post-create__error-input`
      : className;

    const wrapper = this.state.showError
      ? `${wrapperClass} ${wrapperErrorClass}`
      : wrapperClass;

    return (
      <div className={wrapper}>
        {label &&
          <label className="label" htmlFor={inputProps.id}>
            {label}

            {labelRequired &&
              <span className="label__required">*</span>
            }
          </label>
        }

        {!!Icon && Icon}

        <RenderInput
          onFocus={this.hideError}
          className={inputClass}
          {...inputProps}
        />

        {this.mustShowErrors && errors.map(error => (
          <div className={errorClass} key={error}>
            {error}
          </div>
          ))
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
  Icon: null,
};

InputWithError.propTypes = {
  wrapperClass: Type.oneOfType([Type.string, Type.func]),
  className: Type.string.isRequired,
  errorClass: Type.string,
  wrapperErrorClass: Type.string,
  label: Type.string,
  id: Type.string,
  labelRequired: Type.bool,
  component: Type.oneOfType([
    Type.string,
    Type.array,
    Type.element,
    Type.func,
    Type.node
  ]),
  errors: Type.any,
  Icon: Type.node,
};


export default InputWithError;

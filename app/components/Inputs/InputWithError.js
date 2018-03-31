import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Input from './Input';

class InputWithError extends Component {
  state = {
    showError: false,
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
          <label className="label" htmlFor={id}>
            {label}

            {labelRequired &&
              <span className="label__required">*</span>
            }
          </label>
        }
        {Icon &&
          <div className="input__icon-wrapper">
            {Icon}
          </div>
        }

        <span className="input__box">
          <RenderInput
            onFocus={this.hideError}
            className={inputClass}
            id={id}

            {...inputProps}
          />

          {this.mustShowErrors &&
            <span className="input__icon input__icon_error">!</span>
          }
        </span>

        {this.mustShowErrors &&
          errors.map(error => (
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
  wrapperClass: PropTypes.string,
  className: PropTypes.string.isRequired,
  errorClass: PropTypes.string,
  wrapperErrorClass: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  labelRequired: PropTypes.bool,
  Icon: PropTypes.node,
};


export default InputWithError;

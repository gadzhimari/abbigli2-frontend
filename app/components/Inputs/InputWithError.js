import React, { Component, PropTypes } from 'react';
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
    } = this.props;

    const inputClass = this.state.showError
      ? `${className} post-create__error-input`
      : className;

    const omitedProps = omit(this.props, ['className', 'component', 'wrapperClass', 'errors', 'errorClass']);

    return (
      <div className={wrapperClass}>
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
};

InputWithError.propTypes = {
  wrapperClass: PropTypes.string,
  className: PropTypes.string.isRequired,
  errorClass: PropTypes.string,
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.element,
  ]),
  errors: PropTypes.any,
};


export default InputWithError;

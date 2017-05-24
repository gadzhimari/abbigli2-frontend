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
    } = this.props;

    const inputClass = this.state.showError
      ? `${className} post-create__error-input`
      : className;

    const omitedProps = omit(this.props, ['className', 'component', 'wrapperClass', 'errors']);

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
                  className="post-create__error"
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
};


export default InputWithError;

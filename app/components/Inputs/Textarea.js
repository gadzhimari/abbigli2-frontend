import { React, PureComponent, Type, cn } from '../../components-lib/__base';

import './redactor/redactor.css';
import './Textarea.less';

let textateaIds = 0;

@cn('Textarea')
export default class Textarea extends PureComponent {
  static propTypes = {
    onChange: Type.func,
    value: Type.string,
    name: Type.string,
    wrapperClass: Type.string,
    label: Type.string,
  };

  state = {
    id: textateaIds++,
    value: '',
    showError: false
  }

  componentWillReceiveProps({ errors }) {
    if (this.props.errors !== errors && errors) {
      this.setState({ showError: true });
    }
  }

  onChange = (e) => {
    const { onChange, name } = this.props;
    const { value } = e.target;

    this.setState({ value });

    if (onChange) {
      onChange(e, { name, value });
    }
  }

  onFocus = () => {
    this.setState({ showError: false });
  }

  getValue = () => {
    const { value } = this.props;

    return typeof value === 'undefined' ?
      this.state.value : value;
  }

  render(cn) {
    const { label, errors, ...textareaProps } = this.props;
    const { showError } = this.state;

    const props = {
      ...textareaProps,
      onChange: this.onChange,
      onFocus: this.onFocus,
      id: this.state.id,
      value: this.getValue()
    };

    return (
      <div className={cn()}>
        {label &&
          <label className="label" htmlFor={this.id}>
            {label}
          </label>
        }

        <textarea
          {...props}
          className={cn('field', { withError: showError })}
        />

        {showError && errors && errors.length > 0 &&
          errors.map(error => (
            <div className={cn('error')} key={error}>
              {error}
            </div>
          ))
        }
      </div>
    );
  }
}

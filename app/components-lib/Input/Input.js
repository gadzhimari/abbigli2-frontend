import MaskedInput from 'react-text-mask';
import { React, PureComponent, cn } from '../__base';

import './Input.less';

let inputsId = 0;

@cn('Input')
class Input extends PureComponent {
  static defaultProps = {
    clearable: false,
    fullWidth: false,
    view: 'default'
  }

  state = {
    value: '',
    showError: false,
    id: inputsId++
  }

  componentWillReceiveProps({ errors }) {
    if (this.props.errors !== errors && errors) {
      this.setState({ showError: true });
    }
  }

  onChange = (e) => {
    const { onChange, name, formatCharacters, mask } = this.props;
    const { value } = e.target;
    const rawValue = mask === undefined
      ? value
      : value.replace(formatCharacters, '');

    this.setState({ value: rawValue });

    if (onChange) {
      onChange(e, { name, value: rawValue });
    }
  }

  onFocus = (e) => {
    const { onFocus, name } = this.props;

    this.setState({ showError: false });

    if (onFocus) {
      onFocus(e, { name });
    }
  }

  getValue = () => {
    const { value } = this.props;

    return typeof value === 'undefined' ?
      this.state.value : value;
  }

  render(cn) {
    const { id, showError } = this.state;
    const {
      label,
      required,
      Icon,
      clearable,
      fullWidth,
      view,
      errors,
      mask,
      formatCharacters,
      ...otherProps
    } = this.props;

    const inputProps = {
      ...otherProps,
      id,
      onChange: this.onChange,
      className: cn('field'),
      onFocus: this.onFocus,
      value: this.getValue()
    };

    const wrapperMods = {
      fullWidth
    };

    const inputMods = {
      withIcon: !!Icon,
      clearable,
      view,
      withError: showError
    };

    const isMaskedInput = mask !== undefined;

    return (
      <div className={cn('wrapper', wrapperMods)}>
        {label &&
          <label className={cn('label')} htmlFor={id}>
            {label}

            {required &&
              <span className={cn('labelRequired')}>*</span>
            }
          </label>
        }

        <div className={cn(inputMods)}>
          {Icon &&
            <div className={cn('iconWrapper')}>{Icon}</div>
          }
          {
            !isMaskedInput
              ? <input {...inputProps} />
              : <MaskedInput
                {...inputProps}
                mask={mask}
              />
          }
        </div>

        {showError && errors && errors.length !== 0 &&
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

export default Input;

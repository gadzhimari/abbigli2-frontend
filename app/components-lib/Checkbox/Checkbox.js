import { React, Component, Type, cn } from '../__base';
import IconCheck from '../../icons/check';
import './Checkbox.less';

@cn('Checkbox')
class Checkbox extends Component {
  static propTypes = {
    text: Type.node,
    id: Type.string,
    name: Type.string,
    value: Type.string,
    size: Type.oneOf(['s', 'm', 'l']),
    color: Type.string,
    iconPosition: Type.oneOf(['left', 'right']),
    checked: Type.bool,
    disabled: Type.bool,
    indeterminate: Type.bool,
    className: Type.string,
    onChange: Type.func,
  };

  static defaultProps = {
    size: 'm',
    color: 'primary',
    iconPosition: 'left',
  };

  state = {
    checked: false,
  }

  handleChange = (e) => {
    const nextCheckedValue = !(
      this.props.checked !== undefined ?
        this.props.checked : this.state.checked
    );

    this.setState({ checked: nextCheckedValue });

    if (this.props.onChange) {
      this.props.onChange(e, nextCheckedValue);
    }
  }

  render(cn) {
    const {
      text,
      id,
      name,
      value,
      size,
      disabled,
      indeterminate,
      color,
      iconPosition,
      onChange,
      ...restProps
    } = this.props;

    const checked = this.props.checked !== undefined
      ? this.props.checked : this.state.checked;

    const labelProps = {
      ...restProps,
      className: cn({
        size,
        checked,
        disabled,
        indeterminate: !checked && indeterminate,
        color,
        iconPosition,
      }),
    };

    const checkboxProps = {
      id,
      name,
      value,
      checked,
      disabled,
    };

    return (
      <label
        htmlFor={id}
        {...labelProps}
      >
        <span
          className={cn('box')}
          key="box"
        >
          <input
            className={cn('control')}
            type="checkbox"
            autoComplete="off"
            onChange={this.handleChange}
            {...checkboxProps}
          />
          <IconCheck
            className={cn('icon')}
            size={size}
          />
        </span>
        {
          text &&
          <span
            className={cn('text')}
            key="text"
            role="presentation"
          >
            {text}
          </span>
        }
      </label>
    );
  }
}

export default Checkbox;

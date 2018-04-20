import { React, Component, Type, cn } from '../__base';
import './Button.less';

@cn('Button')
class Button extends Component {
  static propTypes = {
    text: Type.node,
    icon: Type.node,
    iconPosition: Type.oneOf(['left', 'right']),
    view: Type.oneOf(['default', 'outline', 'link', 'fab']),
    type: Type.oneOf(['button', 'reset', 'submit']),
    color: Type.string,
    fullWidth: Type.bool,
    size: Type.oneOf(['s', 'm', 'l']),
    disabled: Type.bool,
    formNoValidate: Type.bool,
    name: Type.string,
    title: Type.string,
    togglable: Type.oneOf(['check', 'radio']),
    checked: Type.bool,
    children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
    className: Type.string,
    dataset: Type.shape(),
    onClick: Type.func,
    isFetching: Type.bool,
  };

  static defaultProps = {
    type: 'button',
    size: 'm',
    color: 'primary',
    view: 'default',
    iconPosition: 'left',
    isFetching: false,
  };

  /**
  * Возвращает корневой `HTMLElement` компонента.
  *
  * @public
  * @returns {HTMLElement}
  */
  getNode() {
    return this.control;
  }

  /**
   * @type {HTMLButtonElement|HTMLSpanElement}
   */
  control;

  handleClick = (e) => {
    const { name, dataset, isFetching, onClick } = this.props;

    if (onClick && !isFetching) {
      onClick(e, { name, dataset });
    }
  }

  render(cn) {
    const {
      children,
      name,
      type,
      icon,
      iconPosition,
      text,
      title,
      disabled,
      view,
      color,
      size,
      fullWidth,
      togglable,
      checked,
      onClick,
      isFetching,
      ...restProps
    } = this.props;
    const buttonProps = {
      ...restProps,
      ref: (control) => { this.control = control; },
      role: 'button',
      name,
      type,
      title,
      disabled,
      className: cn({
        disabled,
        view,
        color,
        size,
        fullWidth,
        togglable,
        checked,
      }),
    };
    const content = children || text;

    const iconTemplate = (
      icon &&
        <span key="icon" className={cn('icon')}>
          { icon }
        </span>
    );
    const textTemplate = (
      content &&
        <span key="text" className={cn('text')}>
          {content}
        </span>
    );
    const buttonContent = [
      iconPosition === 'left' && iconTemplate,
      textTemplate,
      iconPosition === 'right' && iconTemplate
    ];

    return (
      <button
        onClick={this.handleClick}
        {...buttonProps}
      >
        {isFetching ?
          <span className={cn('fetching')} />
          : buttonContent
        }
      </button>
    );
  }
}

export default Button;

import { React, Component, Type, cn } from '../__base';
import './Button.less';

@cn('Button')
class Button extends Component {
  static propTypes = {
    /** Текст кнопки */
    text: Type.node,
    /** Иконка кнопки */
    icon: Type.node,
    /** Позиционирование иконки в ссылке */
    iconPosition: Type.oneOf(['left', 'right']),
    /** aria-аттрибут для кнопок-иконок не имеющих текста */
    label: Type.string,
    /** Вид кнопки */
    view: Type.oneOf(['default', 'outline', 'link', 'fab']),
    /** Поведение кнопки */
    type: Type.oneOf(['button', 'reset', 'submit']),
    /** Цвет кнопки */
    color: Type.string,
    /** HTML элемент, которым будет компонент в DOM */
    tag: Type.oneOf(['button', 'span']),
    /** Управление шириной кнопки. При значении 'fullwidth' растягивает кнопку
    * на ширину родителя */
    fullwidth: Type.bool,
    /** Размер компонента */
    size: Type.oneOf(['s', 'm', 'l']),
    /** Управление возможности взаимодействия с компонентом */
    disabled: Type.bool,
    /** Отключает валидацию полей формы, у которых есть атрибут pattern */
    formNoValidate: Type.bool,
    /** Имя компонента в DOM */
    name: Type.string,
    /** Текст всплывающей подсказки */
    title: Type.string,
    /** Последовательность перехода между контролами при нажатии на Tab */
    tabIndex: Type.number,
    /** Тип переключателя */
    togglable: Type.oneOf(['check', 'radio']),
    /** Отображение кнопки в отмеченном (зажатом) состоянии */
    checked: Type.bool,
    /** Дочерние элементы `Button` */
    children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
    /** Дополнительный класс */
    className: Type.string,
    /** Обработчик клика по кнопке */
    onClick: Type.func,
  };

  static defaultProps = {
    type: 'button',
    tag: 'button',
    size: 'm',
    view: 'default',
    formNoValidate: false,
    iconPosition: 'left',
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

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }

  render(cn) {
    const buttonElement = this.props.tag === 'span' ? 'span' : 'button';
    const isButton = buttonElement === 'button';
    const isIconButton = this.props.icon && !this.props.text &&
      !this.props.children;

    const buttonProps = {
      ref: (control) => { this.control = control; },
      role: 'button',
      name: this.props.name,
      type: this.props.type,
      title: this.props.title,
      tabIndex: this.props.disabled ? '-1' : this.props.tabIndex,
      disabled: this.props.disabled,
      formNoValidate: isButton ? this.props.formNoValidate : null,
      'aria-label': isIconButton ? this.props.label : null,
      className: cn({
        disabled: this.props.disabled,
        view: this.props.view,
        color: this.props.color,
        size: this.props.size,
        fullwidth: this.props.fullwidth,
        togglable: this.props.togglable,
        checked: this.props.checked
      }),
      onClick: this.handleClick,
    };

    const buttonContent = [this.props.children];
    const iconTemplate = (
      this.props.icon &&
        <span key="icon" className={cn('icon')}>
          { this.props.icon }
        </span>
    );
    const textTemplate = (
      this.props.text &&
        <span key="text" className={cn('text')}>
          { this.props.children || this.props.text }
        </span>
    );

    if (this.props.iconPosition === 'left') {
      buttonContent.push(iconTemplate, textTemplate);
    } else if (this.props.iconPosition === 'right') {
      buttonContent.push(textTemplate, iconTemplate);
    }

    return React.createElement(buttonElement,
      buttonProps,
      buttonContent
    );
  }
}

export default Button;

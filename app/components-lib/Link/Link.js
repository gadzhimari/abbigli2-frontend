import { React, Component, Type, RouterLink, cn } from '../__base';

import './Link.less';

@cn('Link')
class Link extends Component {
  static propTypes = {
    /** Иконка ссылки */
    icon: Type.node,
    /** Позиционирование иконки в ссылке */
    iconPosition: Type.oneOf(['left', 'right']),
    /** Текст ссылки */
    text: Type.node,
    /** aria-аттрибут для кнопок-иконок не имеющих текста */
    label: Type.string,
    /** Цвет ссылки */
    color: Type.string,
    /** href ссылки */
    to: Type.string,
    /** Указание на загрузку, вместо открытия и указание имени файла */
    download: Type.oneOfType([Type.string, Type.bool]),
    /** Ведет ли ссылка на внешний ресурс */
    external: Type.bool,
    /** target ссылки */
    target: Type.oneOf(['_self', '_blank', '_parent', '_top']),
    /** Последовательность перехода между контролами при нажатии на Tab */
    tabIndex: Type.number,
    /** Определяет отношения между текущим документом и документом, на который ведет ссылка */
    rel: Type.string,
    /** Вид кнопки */
    view: Type.oneOf(['default', 'outline', 'link']),
    /** Управление возможностью клика по ссылке */
    disabled: Type.bool,
    /** Размер компонента */
    size: Type.oneOf(['s', 'm', 'l']),
    /** Дочерние элементы `Link` */
    children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
    /** Дополнительный класс */
    className: Type.string,
    /** Имя компонента в DOM */
    name: Type.string,
    /** Кастомные данные */
    dataset: Type.shape(),
    /** Обработчик клика по ссылке */
    onClick: Type.func,
  }

  static defaultProps = {
    iconPosition: 'left',
    size: 'm',
    to: '#',
    tabIndex: 0,
    disabled: false,
    external: false,
    view: 'link',
  };

  /**
  * Возвращает корневой `HTMLElement` компонента.
  *
  * @public
  * @returns {HTMLElement}
  */
  getNode() {
    return this.root;
  }

  root;

  handleClick = (event) => {
    const { name, onClick, dataset } = this.props;

    if (onClick) {
      onClick(event, { name, dataset });
    }
  }

  render(cn) {
    const linkType = this.props.external ? 'a' : RouterLink;
    const linkElement = this.props.disabled ? 'span' : linkType;
    const isIconLink = this.props.icon && !this.props.text &&
      !this.props.children;
    const linkProps = {
      ref: (root) => { this.root = root; },
      download: this.props.download,
      'aria-label': isIconLink ? this.props.label : null,
      className: cn({
        disabled: this.props.disabled,
        size: this.props.size,
        color: this.props.color,
        view: this.props.view,
      }),
      rel: this.props.rel,
      tabIndex: this.props.tabIndex,
      onClick: this.handleClick,
    };

    if (this.props.target === '_blank') {
      linkProps.rel = 'noreferrer noopener';
    }

    if (!this.props.disabled) {
      linkProps.href = this.props.to;
      linkProps.target = this.props.target;
    }

    const linkContent = [this.props.children];
    const iconTemplate = (
      this.props.icon &&
        <span key="icon" className={cn('icon')}>
          { this.props.icon }
        </span>
    );
    const textTemplate = (
      this.props.text &&
        <span key="text" className={cn('text')}>
          { this.props.text }
        </span>
    );

    if (this.props.iconPosition === 'left') {
      linkContent.push(iconTemplate, textTemplate);
    } else if (this.props.iconPosition === 'right') {
      linkContent.push(textTemplate, iconTemplate);
    }

    return React.createElement(
      linkElement,
      linkProps,
      linkContent
    );
  }
}

export default Link;

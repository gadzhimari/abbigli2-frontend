import { React, Component, Type, RouterLink, cn } from '../__base';

import './Link.less';

@cn('Link')
class Link extends Component {
  static propTypes = {
    icon: Type.node,
    iconPosition: Type.oneOf(['left', 'right']),
    type: Type.oneOf(['link', 'tab']),
    text: Type.node,
    color: Type.string,
    fullWidth: Type.bool,
    to: Type.string,
    target: Type.oneOf(['_self', '_blank', '_parent', '_top']),
    rel: Type.string,
    view: Type.oneOf(['default', 'outline', 'link', 'fab']),
    checked: Type.bool,
    disabled: Type.bool,
    size: Type.oneOf(['s', 'm', 'l']),
    children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
    className: Type.string,
    name: Type.string,
    tabIndex: Type.number,
    dataset: Type.shape(),
    onClick: Type.func,
  }

  static defaultProps = {
    iconPosition: 'left',
    type: 'link',
    size: 'm',
    to: '#',
    tabIndex: 0,
    checked: false,
    disabled: false,
    view: 'link',
    color: 'primary',
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

  handleClick = (e) => {
    const { name, dataset, onClick } = this.props;

    if (onClick) {
      onClick(e, { name, dataset });
    }
  }

  render(cn) {
    const {
      children,
      icon,
      iconPosition,
      type,
      text,
      name,
      checked,
      disabled,
      size,
      color,
      fullWidth,
      view,
      rel,
      target,
      to,
      tabIndex,
      onClick,
      ...restProps,
    } = this.props;
    const LinkElement = checked || disabled ? 'span' : RouterLink;
    const linkTabsProps = type ? {
      role: 'tab',
      'aria-selected': checked,
      'aria-disabled': disabled,
    } : {};
    const linkProps = {
      ...restProps,
      ...linkTabsProps,
      ref: (root) => { this.root = root; },
      className: cn({
        checked,
        disabled,
        size,
        color,
        view,
        fullWidth,
      }),
      rel,
    };

    if (target === '_blank') {
      linkProps.rel = 'noreferrer noopener';
    }

    if (!checked && !disabled) {
      linkProps.to = to;
      linkProps.target = target;
    }

    const iconTemplate = (
      icon &&
        <span key="icon" className={cn('icon')}>
          { icon }
        </span>
    );
    const textTemplate = (
      text &&
        <span key="text" className={cn('text')}>
          { text }
        </span>
    );

    const linkContent = [
      iconPosition === 'left' && iconTemplate,
      textTemplate,
      children,
      iconPosition === 'right' && iconTemplate
    ];

    return (
      <LinkElement
        onClick={this.handleClick}
        {...linkProps}
      >
        {linkContent}
      </LinkElement>
    );
  }
}

export default Link;

import { React, Component, Type, cn } from '../__base';
import Icon from '../Icon';

import './Rating.less';

@cn('Rating')
class Star extends Component {
  static propTypes = {
    value: Type.number,
    index: Type.number,
    allowHalf: Type.bool,
    disabled: Type.bool,
    onHover: Type.func,
    onClick: Type.func,
    character: Type.node,
    focused: Type.bool,
  };

  static defaultProps = {
    icon: <Icon glyph="star" size="xs" />,
  }

  getClassName = () => {
    const { index, value, allowHalf, focused } = this.props;
    const starValue = index + 1;
    let className = '';

    if (allowHalf && value + 0.5 === starValue) {
      className += 'half';
    } else {
      className += starValue <= value ? 'full' : 'zero';
    }

    const mods = {
      focused,
      [className]: true,
    };

    return mods;
  }

  handleHover = (e) => {
    const { index, disabled, onHover } = this.props;

    if (!disabled) {
      onHover(e, index);
    }
  }

  handleClick = (e) => {
    const { index, disabled, onClick } = this.props;

    if (!disabled) {
      onClick(e, index);
    }
  }

  render(cn) {
    const { disabled, icon } = this.props;
    const mods = this.getClassName();

    return (
      /* eslint-disable jsx-a11y/no-static-element-interactions */
      <li
        className={cn('star', mods)}
        onClick={disabled ? null : this.handleClick}
        onMouseMove={disabled ? null : this.handleHover}
      >
        <div className={cn('star-first')}>
          {icon}
        </div>
        <div className={cn('star-second')}>
          {icon}
        </div>
      </li>
      /* eslint-enable jsx-a11y/no-static-element-interactions */
    );
  }
}

export default Star;

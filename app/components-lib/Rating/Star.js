import { React, Component, Type, cn } from '../__base';
import IconStar from '../../icons/star';

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
    icon: <IconStar size="xs" />,
  }

  handleHover = (e) => {
    const { onHover, index } = this.props;

    onHover(e, index);
  }

  handleClick = (e) => {
    const { onClick, index } = this.props;

    onClick(e, index);
  }

  render(cn) {
    const {
      disabled,
      icon,
      allowHalf,
      value,
      focused,
      index
    } = this.props;

    const starValue = index + 1;

    return (
      /* eslint-disable jsx-a11y/no-static-element-interactions */
      <li
        className={cn(
          'star',
          {
            focused,
            half: allowHalf && value + 0.5 === starValue,
            full: starValue <= value,
            zero: starValue > value,
          }
        )}
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

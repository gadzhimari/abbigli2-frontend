import { React, Component, Type, cn } from '../__base';
import Icon from '../Icon';

import './Spin.less';

@cn('Spin')
class Spin extends Component {
  static propTypes = {
    visible: Type.bool,
    size: Type.oneOf(['s', 'm', 'l', 'xl']),
  };

  static defaultProps = {
    visible: false,
    size: 'm',
  };

  render(cn) {
    const { size, visible } = this.props;

    return (
      visible && <span
        className={cn({
          size,
          visible,
        })}
      >
        <Icon
          className={cn('spinning')}
          size="l"
          glyph="loader"
        />
        <Icon
          className={cn('icon')}
          size="m"
          glyph="coloredHand"
        />
      </span>
    );
  }
}

export default Spin;

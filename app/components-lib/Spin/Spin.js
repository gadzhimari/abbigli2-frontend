import { React, Component, Type, cn } from '../__base';
import IconHand from '../../icons/hand';
import IconLoader from '../../icons/loader';

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
        <IconLoader
          className={cn('spinning')}
          size="l"
        />
        <IconHand
          className={cn('icon')}
          size="m"
        />
      </span>
    );
  }
}

export default Spin;

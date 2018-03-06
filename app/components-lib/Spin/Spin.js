import { React, Component, Type, cn } from '../__base';

import './Spin.less';

@cn('spin')
class Spin extends Component {
  static propTypes = {
    visible: Type.bool,
    size: Type.oneOf(['s', 'm', 'l', 'xl']),
    className: Type.string,
    theme: Type.oneOf(['abbigli-light', 'abbigli-dark']),
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
        <spin className={cn('spinning')} />
        <spin className={cn('icon')} />
      </span>
    );
  }
}

export default Spin;

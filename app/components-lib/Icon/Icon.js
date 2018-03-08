import { React, PureComponent, Type, cn } from '../__base';
import './Icon.less';

@cn('Icon')
class Icon extends PureComponent {
  static propTypes = {
    children: Type.element.isRequired,
    className: Type.string,
    name: Type.string,
    size: Type.oneOf(['xs', 's', 'm', 'l', 'xl', 'xxl']),
    theme: Type.oneOf(['abbigli-light', 'abbigli-dark']),
  };

  static defaultProps = {
    size: 'm',
  }

  render(cn) {
    const { size, name, children } = this.props;

    return (
      <span
        className={cn({
          size,
          name,
        })}
      >
        { children }
      </span>
    );
  }
}

export default Icon;

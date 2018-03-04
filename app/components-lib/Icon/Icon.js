import { React, PureComponent, Type, cn } from '../__base';

@cn('Icon')
class Icon extends PureComponent {
  static propTypes = {
    className: Type.string,
    colored: Type.bool,
    name: Type.string,
    size: Type.oneOf(['xs', 's', 'm', 'l', 'xl', 'xxl']),
    theme: Type.oneOf(['abbigli-light', 'abbigli-dark']),
  };

  static defaultProps = {
    size: 'm',
  }

  render(cn) {
    const { size, name, colored } = this.props;

    return (
      <span
        className={cn({
          size,
          name,
          colored,
        })}
      />
    );
  }
}

export default Icon;

import { React, PureComponent, Type, cn } from '../__base';

@cn('icon')
class Icon extends PureComponent {
  static propTypes = {
    className: Type.string,
    colored: Type.bool,
    name: Type.string,
    size: Type.oneOf(['xs', 's', 'm', 'l', 'xl', 'xxl']),
    theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
  };

  static defaultProps = {
    size: 'm',
  }

  render(cn) {
    const mods = { size: this.props.size };

    if (this.props.name) {
      mods.name = this.props.name;
    }

    if (this.props.colored) {
      mods.colored = true;
    }

    return (
      <span
        className={cn(mods)}
      />
    );
  }
}

export default Icon;

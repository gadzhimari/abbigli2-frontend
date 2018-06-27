import { React, PureComponent, Type } from '../__base';
import * as iconsByGlyph from '../../icons';

class Icon extends PureComponent {
  static propTypes = {
    className: Type.string,
    name: Type.string,
    color: Type.string,
    size: Type.oneOf(['xs', 's', 'm', 'l', 'xl', 'xxl']),
    theme: Type.oneOf(['abbigli-light', 'abbigli-dark']),
  }

  static defaultProps = {
    size: 'm'
  }

  render() {
    const { glyph, ...iconProps } = this.props;
    const Icon = iconsByGlyph[glyph];

    return (
      <Icon {...iconProps} />
    );
  }
}

export default Icon;

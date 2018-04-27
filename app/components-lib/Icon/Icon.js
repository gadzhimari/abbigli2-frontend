import { React, PureComponent } from '../__base';
import * as iconsByGlyph from '../../icons';

class Icon extends PureComponent {
  render() {
    const { glyph, ...iconProps } = this.props;
    const Icon = iconsByGlyph[glyph];

    return (
      <Icon {...iconProps} />
    );
  }
}

export default Icon;

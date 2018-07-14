import { React, PureComponent, Type } from '../../../components-lib/__base';

import { Icon } from '../../../components-lib';

class SliderButtons extends PureComponent {
  static propTypes = {
    slideRight: Type.func.isRequired,
    slideLeft: Type.func.isRequired,
    showLeft: Type.bool.isRequired,
    showRight: Type.bool.isRequired,
    sliderName: Type.string.isRequired,
  };

  render() {
    const { slideRight, slideLeft, showLeft, showRight, cn } = this.props;

    return (
      <div className={cn('buttons')}>
        {showLeft &&
          <div
            className={cn('button', { left: true })}
            onClick={slideLeft}
          >
            <Icon glyph="arrowLeft" />
          </div>
        }
        {showRight &&
          <div
            className={cn('button', { right: true })}
            onClick={slideRight}
          >
            <Icon glyph="arrowRight" />
          </div>
        }
      </div>
    );
  }
}

export default SliderButtons;

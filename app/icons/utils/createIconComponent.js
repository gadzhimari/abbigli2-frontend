import { React, PureComponent, cn } from '../../components-lib/__base';
import '../../components-lib/Icon/Icon.less';

const createIconComponent = ({ content, height, width }) => {
  @cn('Icon')
  class IconCreator extends PureComponent {
    render(cn) {
      const { size, color, name } = this.props;

      return (
        <span
          className={cn({
            size,
            name,
            color,
          })}
        >
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className={cn('icon')}
            role="presentation"
          >
            {content}
          </svg>
        </span>
      );
    }
  }

  return IconCreator;
};

export default createIconComponent;

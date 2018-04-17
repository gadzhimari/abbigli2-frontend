
import { React, PureComponent, Type, cn } from '../../components-lib/__base';
import '../../components-lib/Icon/Icon.less';

const createIconComponent = ({ content, height, width }) =>
  @cn('Icon')
  class extends PureComponent {
    static propTypes = {
      className: Type.string,
      name: Type.string,
      size: Type.oneOf(['xs', 's', 'm', 'l', 'xl', 'xxl']),
      theme: Type.oneOf(['abbigli-light', 'abbigli-dark']),
    };

    static defaultProps = {
      size: 'm',
    }

    render(cn) {
      const { size, name } = this.props;

      return (
        <span
          className={cn({
            size,
            name,
          })}
        >
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className={cn('icon')}
          >
            { content }
          </svg>
        </span>
      );
    }
};

export default createIconComponent;

import { React, Component, cn } from '../../components-lib/__base';
import { Button } from '../../components-lib';

@cn('SwitcherItem')
class SwitcherItem extends Component {
  render(cn) {
    const { isDots } = this.props;

    if (isDots) {
      return (
        <div className={cn()}>
          ...
        </div>
      );
    }

    const { page, isActive, onClick, children, disabled } = this.props;
    const content = children || page;

    return (
      <Button
        className={cn({ active: isActive, disabled })}
        onClick={onClick}
        name={page}
        view={false}
        size={false}
      >
        {content}
      </Button>
    );
  }
}

export default SwitcherItem;

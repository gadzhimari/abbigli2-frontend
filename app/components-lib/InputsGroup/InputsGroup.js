import { React, PureComponent, cn } from '../__base';

import './InputsGroup.less';

@cn('InputsGroup')
class InputsGroup extends PureComponent {
  render(cn) {
    const { children, gap } = this.props;

    const mods = {
      gap
    };

    return (
      <div className={cn(mods)}>
        {children}
      </div>
    );
  }
}

export default InputsGroup;

import { cn } from '../__base';
import Link from '../Link';

import './Tab.less';

@cn('Tab')
export default class Tab extends Link {
  static defaultProps = {
    size: 'm',
    disabled: false,
    tabIndex: 0,
    iconPosition: 'left',
    color: 'primary',
  };
}

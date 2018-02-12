import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cn from 'utils/cn';

import './Spin.less';

@cn('spin')
class Spin extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    size: PropTypes.oneOf(['s', 'm', 'l', 'xl']),
    className: PropTypes.string,
    theme: PropTypes.oneOf(['abbigli-light', 'abbigli-dark']),
  };

  static defaultProps = {
    visible: false,
    size: 'm',
  };

  render(cn) {
    const { size, visible } = this.props;

    return (
      <span
        className={cn({
          size,
          visible,
        })}
      >
        <spin className={cn('spinning')} />
        <spin className={cn('icon')} />
      </span>
    );
  }
}

export default Spin;

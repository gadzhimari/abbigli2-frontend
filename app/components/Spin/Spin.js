import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './Spin.less';

class Spin extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    size: PropTypes.oneOf(['s', 'm', 'l', 'xl']),
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    theme: PropTypes.oneOf(['abbigli-light', 'abbigli-dark'])
  };

  static defaultProps = {
    visible: false,
    size: 'm',
    prefixCls: 'spin',
  };

  render() {
    const { visible, className, size, prefixCls } = this.props;
    const spinClassNames = cn(prefixCls, {
      [`${prefixCls}_size_s`]: size === 's',
      [`${prefixCls}_size_m`]: size === 'm',
      [`${prefixCls}_size_l`]: size === 'l',
      [`${prefixCls}_size_xl`]: size === 'xl',
      [`${prefixCls}_visible`]: visible === true,
    }, className);

    return (
      <span className={spinClassNames}>
        <spin className={`${prefixCls}__spinning`} />
        <spin className={`${prefixCls}__icon`} />
      </span>
    );
  }
}

export default Spin;

import React, { Component } from 'react';
import Type from 'prop-types';

import cn from '../../../lib/cn';
import Button from '../../Button';

@cn('Color')
class Color extends Component {
  static propTypes = {
    color: Type.string,
    isActive: Type.bool,
    onClick: Type.func,
  }

  onClick = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e, {
        value: [this.props.color],
        name: 'colors',
      });
    }
  }

  render(cn) {
    const { color, isActive } = this.props;

    return (
      <Button
        className={cn({ isActive, color })}
        onClick={this.onClick}
        type="button"
      />
    );
  }
}

export default Color;

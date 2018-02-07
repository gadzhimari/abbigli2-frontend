import React, { Component } from 'react';
import Type from 'prop-types';
import block from 'bem-cn';

import Button from '../../Button';

const b = block('Color');

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

  render() {
    const { color, isActive } = this.props;

    return (
      <Button
        className={b({ isActive, color })}
        onClick={this.onClick}
        type="button"
      />
    );
  }
}

export default Color;

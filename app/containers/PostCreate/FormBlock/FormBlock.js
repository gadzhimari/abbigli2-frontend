import React, { Component } from 'react';
import Type from 'prop-types';
import block from 'bem-cn';

import './FormBlock.less';

const b = block('FormBlock');

class FormBlock extends Component {
  static propTypes = {
    children: Type.oneOfType([Type.node, Type.arrayOf(Type.node)]),
  }

  render() {
    return (
      <fieldset className={b}>
        {this.props.children}
      </fieldset>
    );
  }
}

export default FormBlock;

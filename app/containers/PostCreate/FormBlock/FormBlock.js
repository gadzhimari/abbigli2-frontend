import React, { Component } from 'react';
import Type from 'prop-types';
import cn from '../../../lib/cn';

import './FormBlock.less';

@cn('FormBlock')
class FormBlock extends Component {
  static propTypes = {
    children: Type.oneOfType([Type.node, Type.arrayOf(Type.node)]),
  }

  render(cn) {
    return (
      <fieldset className={cn()}>
        {this.props.children}
      </fieldset>
    );
  }
}

export default FormBlock;

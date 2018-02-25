import React, { PureComponent } from 'react';
import Type from 'prop-types';

export default class Button extends PureComponent {
  static propTypes = {
    children: Type.oneOfType([Type.node, Type.arrayOf(Type.node)]),
    onClick: Type.func,
    name: Type.string,
    dataset: Type.shape(),
    type: Type.oneOf(['button', 'reset', 'submit']),
  }

  static defaultProps = {
    type: 'button',
  }

  onClick = (e) => {
    const { name, onClick, dataset } = this.props;

    if (onClick) {
      onClick(e, { name, dataset });
    }
  }

  render() {
    const { children, ...buttonProps } = this.props;

    delete buttonProps.name;
    delete buttonProps.onClick;
    delete buttonProps.dataset;

    return (
      <button
        onClick={this.onClick}
        {...buttonProps}
      >
        {children}
      </button>
    );
  }
}

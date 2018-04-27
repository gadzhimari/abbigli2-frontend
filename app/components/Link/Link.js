import Type from 'prop-types';
import React, { PureComponent } from 'react';
import RouterLink from 'react-router/lib/Link';

import './Link.less';

class Link extends PureComponent {
  static propTypes = {
    to: Type.string,
    children: Type.oneOfType([Type.node, Type.arrayOf(Type.node)]),
    onClick: Type.func,
    name: Type.string,
    dataset: Type.shape(),
  }

  onClick = (e) => {
    const { name, onClick, dataset } = this.props;

    if (onClick) {
      onClick(e, { name, dataset });
    }
  }

  render() {
    const { children, ...linkProps } = this.props;

    delete linkProps.onClick;
    delete linkProps.name;
    delete linkProps.dataset;

    return (
      <RouterLink
        onClick={this.onClick}
        {...linkProps}
      >
        {children}
      </RouterLink>
    );
  }
}

export default Link;

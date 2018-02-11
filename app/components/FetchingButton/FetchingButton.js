import Type from 'prop-types';
import React, { PureComponent } from 'react';

import Button from '../Button/Button';

import './FetchingButton.styl';

export default class FetchingButton extends PureComponent {
  static propTypes = {
    isFetching: Type.bool,
    onClick: Type.func,
    children: Type.oneOfType([Type.node, Type.arrayOf(Type.node)]),
  }

  static defaultProps = {
    type: 'button'
  }

  onClick = (...attr) => {
    const { isFetching, onClick } = this.props;

    if (onClick && !isFetching) {
      onClick(...attr);
    }
  }

  render() {
    const { children, isFetching, ...buttonProps } = this.props;

    delete buttonProps.onClick;

    return (
      <Button
        onClick={this.onClick}
        {...buttonProps}
      >
        {isFetching ?
          <div className="loader__wrapper">
            <div className="loader01" />
          </div> : children
        }
      </Button>
    );
  }
}

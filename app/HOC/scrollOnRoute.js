import React, { Component } from 'react';

const scrollOnRoute = WrappedComponent => class extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.mustUpdate(nextProps, this.props)) {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }

  mustUpdate(nextProps, props) {
    const { location: { pathname, action }, routes } = nextProps;
    const { location } = props;

    if (!routes[routes.length - 1].mustScroll) {
      return false;
    }

    if (pathname !== location.pathname && action === 'PUSH') {
      return true;
    }

    return false;
  }

  render() {
    return <WrappedComponent {...this.props} />;
  }
};

export default scrollOnRoute;

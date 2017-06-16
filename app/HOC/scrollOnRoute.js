import React, { Component } from 'react';

const scrollOnRoute = WrappedComponent => class extends Component {
  static fetchData = WrappedComponent.fetchData

  componentWillUpdate(nextProps) {
    const { location } = this.props;

    if (
      nextProps.location.pathname !== location.pathname
      &&
      nextProps.location.action === 'PUSH'
    ) {
      document.body.scrollTop = 0;
    }
  }

  render() {
    return <WrappedComponent {...this.props} />;
  }
};

export default scrollOnRoute;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const contextHOC = WrappedComponent => class extends Component {
  static contextTypes = {
    data: PropTypes.object,
    getData: PropTypes.func,
  };

  static displayName = 'ContextHOC';

  render() {
    return <WrappedComponent {...this.props} {...this.context.getData()} />;
  }
};

export default contextHOC;

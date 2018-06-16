import React, { Component } from 'react';

const popupHOC = WrappedComponent => class extends Component {
  componentDidMount() {
    document.documentElement.classList.add('disable-scroll');
  }

  componentWillUnmount() {
    document.documentElement.classList.remove('disable-scroll');
  }

  render() {
    return (<WrappedComponent
      {...this.props}
    />);
  }
};

export default popupHOC;

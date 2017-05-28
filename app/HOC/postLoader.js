import React, { Component, PropTypes } from 'react';

import {
  Loading,
} from 'components';

const postLoader = WrappedComponent => class extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    routeParams: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    routes: PropTypes.array.isRequired,
  };

  static fetchData = (...data) => WrappedComponent.fetchData(...data)

  constructor(props) {
    super(props);
    this.state = {
      pageLoaded: false,
    };
  }

  componentDidMount() {
    const { data, routeParams, dispatch } = this.props;

    if (data.slug !== routeParams.slug) {
      WrappedComponent.fetchData(dispatch, routeParams);
    }

    this.setState({
      pageLoaded: true,
    });
  }

  componentDidUpdate(prevProps) {
    const { dispatch, routeParams } = this.props;

    if (prevProps.routeParams.slug !== routeParams.slug) {
      WrappedComponent.fetchData(dispatch, routeParams);
    }
  }

  componentWillUnmount() {
    if (WrappedComponent.onUnmount) {
      WrappedComponent.onUnmount(this.props.dispatch);
    }
  }

  render() {
    const { isFetching } = this.props;
    const { pageLoaded } = this.state;

    return (<div>
      {
        isFetching || !pageLoaded
          ? <div className="container-fluid"><Loading loading={isFetching || !pageLoaded} /></div>
          : <WrappedComponent {...this.props} />
      }
    </div>);
  }
};

export default postLoader;

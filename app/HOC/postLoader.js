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

  componentDidMount() {
    const { data, routeParams, dispatch } = this.props;

    if (data.slug !== routeParams.slug) {
      WrappedComponent.fetchData(dispatch, routeParams);
    }
  }

  componentDidUpdate(prevProps) {
    const { dispatch, routeParams } = this.props;

    if (prevProps.routeParams.slug !== routeParams.slug) {
      WrappedComponent.fetchData(dispatch, routeParams);
    }
  }

  componentWillUnmount() {
    if (WrappedComponent.onUnmount) {
      WrappedComponent.onUnmount();
    }
  }

  render() {
    const { isFetching } = this.props;

    return (<div>
      {
        isFetching
          ? <div className="container-fluid"><Loading loading={isFetching} /></div>
          : <WrappedComponent {...this.props} />
      }
    </div>);
  }
};

export default postLoader;

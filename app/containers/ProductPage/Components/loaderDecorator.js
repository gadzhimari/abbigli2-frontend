import React, { Component, PropTypes } from 'react';

import {
  Loading,
} from 'components';

import { fetchData as fetchDataComments } from 'ducks/Comments';
import { fetchData, resetData } from 'ducks/BlogPost';

const loaderDecorator = WrappedComponent => class extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    data: PropTypes.object,
    routeParams: PropTypes.object,
    dispatch: PropTypes.func,
    routes: PropTypes.array,
  };

  componentWillMount() {
    const { dispatch, routeParams } = this.props;

    dispatch(fetchData(routeParams.slug, 1));
    dispatch(fetchDataComments(routeParams.slug));
  }

  componentWillUpdate(prevProps) {
    const { routes, dispatch, routeParams } = this.props;

    if (prevProps.routes !== routes) {
      dispatch(fetchData(routeParams.slug, 1));
      dispatch(fetchDataComments(routeParams.slug));
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch(resetData());
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

export default loaderDecorator;

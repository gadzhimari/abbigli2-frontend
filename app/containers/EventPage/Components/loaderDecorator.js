import React, { Component, PropTypes } from 'react';

import {
  Loading,
} from 'components';

import { fetchData } from 'ducks/BlogPost';
import { fetchData as fetchDataEvents } from 'ducks/Events';
import { fetchData as fetchDataComments } from 'ducks/Comments';

const loaderDecorator = WrappedComponent => class extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    data: PropTypes.object,
    routeParams: PropTypes.object,
    dispatch: PropTypes.func,
    routes: PropTypes.array,
  };

  componentDidMount() {
    const { dispatch, routeParams } = this.props;

    dispatch(fetchData(routeParams.slug, 3));
    dispatch(fetchDataEvents());
    dispatch(fetchDataComments(routeParams.slug));
  }

  componentDidUpdate(prevProps) {
    const { routes, dispatch, routeParams } = this.props;

    if (prevProps.routes !== routes) {
      dispatch(fetchData(routeParams.slug, 3));
      dispatch(fetchDataEvents());
      dispatch(fetchDataComments(routeParams.slug));
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

export default loaderDecorator;

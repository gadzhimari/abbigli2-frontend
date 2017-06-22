import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

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
  }

  componentDidMount() {
    const { data, routeParams, dispatch } = this.props;

    if (data.slug !== routeParams.slug) {
      WrappedComponent.fetchData(dispatch, routeParams);
    }

    if (data.id) {
      WrappedComponent.fetchSubData(dispatch, data, routeParams);
    }
  }

  componentDidUpdate(prevProps) {
    const { dispatch, routeParams, data } = this.props;

    if (prevProps.data.id !== data.id) {
      WrappedComponent.fetchSubData(dispatch, data, routeParams);
    }

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
    const { isFetching, data } = this.props;

    return (<div>
      <Helmet
        title={data.seo_title ? data.seo_title : data.title}
        meta={[
          { name: 'description', content: data.seo_description },
          { property: 'og:title', content: data.seo_title || data.title },
          { property: 'og:description', content: data.seo_description },
          { property: 'og:', content: data.seo_description },
          { property: 'og:image', content: data.images && data.images[0].file },
        ]}
      />
      {
        isFetching
          ? <div className="container-fluid"><Loading loading={isFetching} /></div>
          : <WrappedComponent {...this.props} />
      }
    </div>);
  }
};

export default postLoader;

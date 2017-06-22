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
    this.state = {
      pageLoaded: false,
    };
  }

  componentDidMount() {
    const { data, routeParams, dispatch } = this.props;

    if (data.slug !== routeParams.slug) {
      WrappedComponent.fetchData(dispatch, routeParams);
    }

    if (data.id) {
      WrappedComponent.fetchSubData(dispatch, data, routeParams)
        .then(() => this.setState({
          pageLoaded: true,
        }));
    }
  }

  componentDidUpdate(prevProps) {
    const { dispatch, routeParams, data } = this.props;

    if (prevProps.data.id !== data.id) {
      WrappedComponent.fetchSubData(dispatch, data, routeParams)
        .then(() => this.setState({
          pageLoaded: true,
        }));
    }

    if (prevProps.routeParams.slug !== routeParams.slug) {
      this.setState({
        pageLoaded: false,
      });
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
    const { pageLoaded } = this.state;

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
        isFetching || !pageLoaded
          ? <div className="container-fluid"><Loading loading={isFetching || !pageLoaded} /></div>
          : <WrappedComponent {...this.props} />
      }
    </div>);
  }
};

export default postLoader;

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Helmet from 'react-helmet';

import isEmpty from 'lodash/isEmpty';

import { Spin } from '../components-lib';

const postLoader = WrappedComponent => class extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    data: PropTypes.shape().isRequired,
    routeParams: PropTypes.shape().isRequired,
    fetchPost: PropTypes.func.isRequired,
    onUnmount: PropTypes.func.isRequired,
    fetchSubData: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { data, routeParams, fetchPost, fetchSubData } = this.props;

    if (data.slug !== routeParams.slug) {
      fetchPost(routeParams.slug);
    }

    if (data.id) {
      fetchSubData(data, routeParams);
    }
  }

  componentDidUpdate(prevProps) {
    const { data, routeParams, fetchPost, fetchSubData } = this.props;

    if (prevProps.routeParams.slug !== routeParams.slug) {
      fetchPost(routeParams.slug);
    }

    if (!isEmpty(data) && prevProps.data.id !== data.id) {
      fetchSubData(data, routeParams);
    }
  }

  componentWillUnmount() {
    const { onUnmount } = this.props;

    if (onUnmount) {
      onUnmount();
    }
  }

  render() {
    const { isFetching, data } = this.props;
    const { images } = data;

    return (<div>
      <Helmet
        title={data.seo_title ? data.seo_title : data.title}
        meta={[
          { name: 'description', content: data.seo_description },
          { property: 'og:title', content: data.seo_title || data.title },
          { property: 'og:description', content: data.seo_description },
          { property: 'og:', content: data.seo_description },
          { property: 'og:image', content: images && images[0] && images[0].file },
        ]}
      />
      {
        isFetching
          ? <div className="spin-wrapper"><Spin visible={isFetching} /></div>
          : <WrappedComponent {...this.props} />
      }
    </div>);
  }
};

export default postLoader;

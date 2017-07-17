import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Loading } from 'components';

const postLoader = WrappedComponent => class extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    fetchPost: PropTypes.func.isRequired,
    clearData: PropTypes.func.isRequired,
    params: PropTypes.shape({
      slug: PropTypes.string,
    }),
  }

  static defaultProps = {
    params: {},
  }

  static displayName = 'PostSettingLoader';

  componentDidMount() {
    const { params, fetchPost } = this.props;

    if (params.slug) {
      fetchPost(params.slug);
    }

    this.globalWrapper = document.querySelector('.global-wrapper');
    this.globalWrapper.classList.add('add');
  }

  componentWillUnmount() {
    const { clearData } = this.props;

    clearData();
    this.globalWrapper.classList.remove('add');
  }

  render() {
    const { isFetching, params } = this.props;
    return params.slug && isFetching
      ? <Loading loading={isFetching} />
      : <WrappedComponent {...this.props} />;
  }
};

export default postLoader;

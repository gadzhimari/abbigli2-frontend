import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Spin } from '../../components-lib';

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
      fetchPost(params.slug, params.type);
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
    const { isFetching, params, isFetchingCategories } = this.props;
    const isLoading = (params.slug && isFetching) || isFetchingCategories;

    return isLoading
      ? (<div className="spin-wrapper">
        <Spin visible={isLoading} />
      </div>)
      : <WrappedComponent {...this.props} />;
  }
};

export default postLoader;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Spin } from '../../components-lib';

const preloader = WrappedComponent => class extends PureComponent {
  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    params: PropTypes.shape({
      section: PropTypes.string,
    }).isRequired,
    isFetching: PropTypes.bool.isRequired,
    activePage: PropTypes.number.isRequired,
  }

  componentDidMount() {
    const { params, fetchPosts, activePage } = this.props;

    fetchPosts(params.section, activePage);
  }

  componentDidUpdate(prevProps) {
    const { params, fetchPosts, activePage } = this.props;

    if (prevProps.params.section !== params.section || prevProps.activePage !== activePage) {
      fetchPosts(params.section, activePage);
    }
  }

  render() {
    const { isFetching } = this.props;

    if (isFetching) {
      return (<div className="spin-wrapper">
        <Spin visible={isFetching} />;
      </div>);
    }

    return (<WrappedComponent {...this.props} />);
  }
};

export default preloader;

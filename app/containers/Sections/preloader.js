import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Loading } from 'components';

import { API_URL } from 'config';

const preloader = WrappedComponent => class extends PureComponent {
  static propTypes = {
    fetchSectionTags: PropTypes.func.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    params: PropTypes.shape({
      section: PropTypes.string,
    }).isRequired,
  }

  constructor() {
    super();
    this.state = {
      isFetching: true,
    };
  }

  componentDidMount() {
    const { params, fetchSectionTags, fetchPosts } = this.props;

    Promise.all([
      fetchSectionTags(params.section),
      fetchPosts(params.section),
    ]).then(() => this.setState({
      isFetching: false,
    }));
  }

  // componentDidUpdate(prevProps) {
  //   const { params, fetchSectionTags } = this.props;

  //   if (prevProps.params.section !== params.section) {
  //     fetchSectionTags(params.section, 1);
  //   }
  // }

  render() {
    const { isFetching } = this.state;

    if (isFetching) {
      return <Loading loading={isFetching} />;
    }

    return (<WrappedComponent {...this.props} />);
  }
};

export default preloader;

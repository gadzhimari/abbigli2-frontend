import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Loading } from 'components';

import { __t } from '../../i18n/translator';

const preloader = WrappedComponent => class extends PureComponent {
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { route, fetchPosts } = this.props;

    if (route.filter === 'Mood') {
      fetchPosts('mood', {
        type: 1,
      });
    }

    if (route.filter === 'New') {
      fetchPosts('new', {
        type: 1,
      });
    }

    if (route.filter === 'Popular' || route.filter === 'Near') {
      fetchPosts('', {
        type: 1,
        [route.filter]: true,
      });
    }
  }

  render() {
    const { isFetching, route } = this.props;

    if (isFetching) {
      return <Loading loading={isFetching} />;
    }

    return (<WrappedComponent
      {...this.props}
      page={{ title: __t(route.filter), url: '' }}
    />);
  }
};

export default preloader;

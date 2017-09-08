import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Loading } from 'components';

import { __t } from '../../i18n/translator';

const preloader = WrappedComponent => class extends PureComponent {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    const { routing } = this.props;

    if (prevProps.routing !== routing) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const { route, fetchPosts, routing } = this.props;

    const options = Object.assign({}, routing.query, {
      type: 1,
    });

    if (route.filter === 'Mood') {
      fetchPosts('mood', options);
    }

    if (route.filter === 'New') {
      fetchPosts('new', options);
    }

    if (route.filter === 'Popular' || route.filter === 'Near') {
      fetchPosts('', {
        ...options,
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
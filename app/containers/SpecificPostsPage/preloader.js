import React, { PureComponent } from 'react';

import { Spin } from '../../components-lib';

import { PRODUCT_TYPE } from '../../lib/constants/posts-types';
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
    const { route: { filter }, fetchPosts, routing } = this.props;
    const options = { ...routing.query, type: PRODUCT_TYPE };

    const args = [
      filter === 'Mood' && ['mood', options],
      filter === 'New' && ['new', options],
      filter === 'Popular' && ['', { ...options, popular: true }],
      filter === 'Near' && ['', { ...options, distance: 100 }]
    ].filter(Boolean)[0];

    fetchPosts(...args);
  }

  render() {
    const { isFetching, route } = this.props;

    if (isFetching) {
      return (<div className="spin-wrapper">
        <Spin visible={isFetching} />
      </div>);
    }

    return (<WrappedComponent
      {...this.props}
      page={{ title: __t(route.filter), url: '' }}
    />);
  }
};

export default preloader;

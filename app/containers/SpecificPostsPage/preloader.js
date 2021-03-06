import React, { PureComponent } from 'react';

import { Spin } from '../../components-lib';

import { PRODUCT_TYPE } from '../../lib/constants/posts-types';
import { __t } from '../../i18n/translator';

const preloader = WrappedComponent => class extends PureComponent {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    const { query } = this.props;

    if (prevProps.query !== query) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const { route: { filter }, fetchPosts, query } = this.props;
    const options = { ...query, type: PRODUCT_TYPE };

    const opts = [
      filter === 'Mood' && { ...options, price_0: 0, price_1: 1000 },
      filter === 'New' && options,
      filter === 'Popular' && { ...options, popular: 'month' },
      filter === 'Near' && { ...options, distance: 100 }
    ].filter(Boolean)[0];

    fetchPosts(opts);
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

import React, { Component } from 'react';

import { Loading } from 'components';

import { fetchPost } from 'ducks/PostCreate/actions';


const loader = WrappedComponent => class extends Component {
  componentDidMount() {
    const { dispatch, params } = this.props;

    dispatch(fetchPost(params.slug));
  }

  render() {
    const { isFetching } = this.props;

    return (<div>
      {
        isFetching
          ? (<div className="container-fluid">
            <Loading loading={isFetching} />
          </div>)
        : <WrappedComponent {...this.props} />
      }
    </div>);
  }
};

export default loader;

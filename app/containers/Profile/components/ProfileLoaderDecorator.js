import React, { Component, PropTypes } from 'react';

import { Loading } from 'components';

import { fetchData } from 'ducks/Profile';

const ProfileLoaderDecorator = Profile => class extends Component {
  static propTypes = {
    authFetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isMe: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    me: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    errorMessage: PropTypes.string,
    following: PropTypes.any,
    errors: PropTypes.any,
    followers: PropTypes.array.isRequired,
    routes: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    children: PropTypes.any,
  };

  static prerenderData = Profile.prerenderData

  componentDidMount() {
    const { authFetching } = this.props;
    if (!authFetching) {
      this.fetchProfile();
    }
  }

  componentDidUpdate(prevProps) {
    const { authFetching, params, isAuthenticated } = this.props;

    if (authFetching !== prevProps.authFetching) {
      this.fetchProfile();
    }

    if (params.profile !== prevProps.params.profile) {
      this.fetchProfile();
    }

    if (isAuthenticated !== prevProps.isAuthenticated) {
      this.fetchProfile();
    }
  }

  fetchProfile = () => {
    const { params, me, dispatch, isAuthenticated } = this.props;
    const isMe = params.profile == me.id;

    dispatch(fetchData(isMe, params.profile, isAuthenticated));
  }

  render() {
    const {
      isFetching,
      routes,
    } = this.props;

    const childrenPath = routes[2].path;

    return isFetching
      ? (<div className="container-fluid">
        <Loading loading={isFetching} />
      </div>)
      : <Profile {...this.props} childrenPath={childrenPath} />;
  }
};

export default ProfileLoaderDecorator;

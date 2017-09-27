import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Loading } from 'components';

const ProfileLoaderDecorator = Profile => class extends Component {
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
    const { params, me, dispatch, isAuthenticated, loadProfile } = this.props;
    const isMe = Number(params.profile) === me.id;

    loadProfile(params.profile, isMe, isAuthenticated);
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

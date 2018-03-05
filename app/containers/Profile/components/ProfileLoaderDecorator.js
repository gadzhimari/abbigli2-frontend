import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Helmet from 'react-helmet';

import { Spin } from '../../../components';

const NOFOLLOW_CHILDREN_TYPES = ['feed', 'messages', 'favorites', 'about'];
const mustNofollow = type => NOFOLLOW_CHILDREN_TYPES.some(item => item === type);

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
    const { params, isAuthenticated, loadProfile } = this.props;

    loadProfile(params.profile, isAuthenticated);
  }

  render() {
    const {
      isFetching,
      routes,
      data,
      isMe,
    } = this.props;

    const childrenPath = routes[2].path;
    const title = isMe ? 'My profile' : `Profile ${data.profile_name || data.id}`;

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={data.info} />
          {mustNofollow(childrenPath) &&
            <meta name="robots" content="noindex, follow" />
          }
        </Helmet>

        {isFetching &&
          <div className="container-fluid">
            <div className="spin-wrapper">
              <Spin visible={isFetching} />
            </div>
          </div>
        }

        {!isFetching &&
          <Profile {...this.props} childrenPath={childrenPath} />
        }
      </div>
    );
  }
};

export default ProfileLoaderDecorator;

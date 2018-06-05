import PropTypes from 'prop-types';
import React, { Component } from 'react';

const redirectHOC = type => BaseComponent => class extends Component {
  static propTypes = {
    router: PropTypes.shape().isRequired,
    user: PropTypes.shape().isRequired,
    isMe: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const { router, isMe, user } = this.props;

    if (!isMe && !user[type]) {
      router.push(`/profile/${user.id}`);
    }
  }

  render() {
    return <BaseComponent {...this.props} />;
  }
};

export default redirectHOC;

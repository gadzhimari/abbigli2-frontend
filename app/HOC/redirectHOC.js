import React, { Component, PropTypes } from 'react';

const redirectHOC = type => BaseComponent => class extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
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

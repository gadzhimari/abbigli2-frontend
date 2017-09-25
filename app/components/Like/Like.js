import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import classNames from 'classnames';

import './Like.styl';

class Like extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      liked: props.liked,
    };
  }

  handleLike = () => {
    if (this.props.onClick()) {
      this.setState(prevState => ({
        liked: !prevState.liked,
      }));
    }
  }

  render() {
    const likeClass = classNames({
      like: true,
      liked: this.state.liked,
    });

    return (
      <div
        className={likeClass}
        onClick={this.handleLike}
      />);
  }
}

Like.propTypes = {
  liked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Like;

import React, { Component, PropTypes } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.handleSecond = props.handleSecond;
    this.interval = setInterval(this.handleSecond, 1000);
  }

  componentDidUpdate() {
    if (this.props.duration === 0) {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <span className="timer">{this.props.duration}</span>
    );
  }
}

Timer.propTypes = {
  duration: PropTypes.number.isRequired,
  handleSecond: PropTypes.func.isRequired,
};

export default Timer;

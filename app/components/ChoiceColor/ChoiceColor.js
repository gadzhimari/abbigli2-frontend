import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Color from './Color';

import { __t } from '../../i18n/translator';
import './ChoiceColor.less';

const colors = ['red', 'orange', 'yellow', 'green', 'skiey', 'blue', 'violet', 'pink', 'white', 'gray', 'black', 'brown'];

class ChoiceColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDropdown: false,
    };
  }

  componentDidMount() {
    window.addEventListener('click', this.handleClickOut);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickOut);
  }

  handleClickOut = ({ target }) => {
    if (target !== this.colorChoise) {
      this.setState({
        openDropdown: false,
      });
    }
  }

  openDropdown = () => this.setState({
    openDropdown: true,
  });

  render() {
    const { onChange, activeColor, isMobile } = this.props;

    return (
      <div
        className="color-choice"
        onClick={this.openDropdown}
      >
        <div
          className="color-choice__label"
          ref={colorChoise => (this.colorChoise = colorChoise)}
        >
          {__t('Pick a color')}
        </div>
        {
          this.state.openDropdown && !isMobile
          &&
          <div className="color-choice__dropdown">
            {
              colors.map((color, id) => <Color
                key={id}
                color={color}
                onClick={onChange}
                isActive={activeColor === color}
              />)
            }
          </div>
        }
        {
          isMobile
          &&
          <div className="color-choice__wrap">
            {
              colors.map((color, id) => <Color
                key={id}
                color={color}
                onClick={onChange}
                isActive={activeColor === color}
              />)
            }
          </div>
        }
      </div>
    );
  }
}

export default ChoiceColor;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Color from './Color';

import { __t } from '../../../i18n/translator';
import './ChoiceColor.less';

const colors = ['red', 'orange', 'yellow', 'green', 'skiey', 'blue', 'violet', 'pink', 'white', 'gray', 'black', 'brown'];

class ChoiceColor extends PureComponent {
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
        {
          isMobile
            ? <div
              className="color-choice__label"
            >
              {__t('Pick a color')}
            </div>
            : <div>
              <input
                ref={colorChoise => (this.colorChoise = colorChoise)}
                className="input"
                type="text"
                placeholder={__t('Pick a color')}
                value={__t(activeColor)}
              />
              {
                activeColor
                  ? <svg
                    className="icon icon-close"
                    viewBox="0 0 14 14.031"
                    onMouseDown={onChange}
                    onTouchStart={onChange}
                    data-value=""
                    data-field="color"
                  >
                    <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z"/>
                  </svg>
                  : <svg className="icon icon-arrow" viewBox="0 0 11.3 19.6">
                    <path d="M0.7,0.6c-0.8,0.8-0.9,2.1-0.1,2.9l5.9,6.4l-5.9,6.3c-0.8,0.9-0.8,2.2,0.1,2.9 c0.9,0.7,2.1,0.7,2.9-0.1l7.2-7.8c0.1-0.1,0.1-0.1,0.2-0.2l0,0c0.1-0.1,0.1-0.2,0.2-0.3l0,0c0-0.1,0.1-0.2,0.1-0.3v-0.1 c0-0.1,0-0.2,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.2,0-0.2V9.4c0-0.1-0.1-0.2-0.1-0.3l0,0C11.1,9,11.1,8.9,11,8.8 l0,0c-0.1-0.1-0.1-0.2-0.2-0.2L3.6,0.7C2.8-0.2,1.5-0.2,0.7,0.6z" />
                  </svg>
              }
            </div>
        }

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

ChoiceColor.defaultProps = {
  activeColor: '',
  isMobile: false,
};

ChoiceColor.propTypes = {
  onChange: PropTypes.func.isRequired,
  activeColor: PropTypes.string,
  isMobile: PropTypes.bool,
};

export default ChoiceColor;

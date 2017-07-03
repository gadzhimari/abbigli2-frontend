import React, { Component } from 'react';

import { __t } from '../../i18n/translator';

const radiuses = [1000, 500, 100, 30, 5];

class ChoiceRadius extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDropdown: false,
    };
  }

  onChangeInput = (e) => {
    e.preventDefault();
  }

  toggleOpenDropdown = () => this.setState({
    openDropdown: !this.state.openDropdown,
  });

  changeValue = ({ target }) => this.props
    .onChange('radius', target.innerText);

  render() {
    const { activeRadius } = this.props;

    return (
      <div className="select-wrap">
        <div className="label">
          {__t('Being in the radius (km)')}
        </div>
        <div className="select">
          <input
            className="input"
            type="text"
            value={activeRadius}
            onChange={this.onChangeInput}
            onFocus={this.toggleOpenDropdown}
            onBlur={this.toggleOpenDropdown}
          />
          {
            this.state.openDropdown
            &&
            <div className="select__dropdown">
              {
                radiuses
                  .filter(radius => radius !== Number(activeRadius))
                  .map((item, key) => <div
                    className="select__item"
                    key={key}
                    onMouseDown={this.changeValue}
                  >
                    {item}
                  </div>)
              }
            </div>
          }
        </div>
      </div>
    );
  }
}

export default ChoiceRadius;

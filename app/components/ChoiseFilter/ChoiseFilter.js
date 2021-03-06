import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Item from './ChoiseFilterItem';

class ChoiseFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
    };
  }

  toggleOpenDropdown = () => this.setState({
    showDropdown: !this.state.showDropdown,
  });

  render() {
    const { options, onChange, active, name } = this.props;

    const activeOpt = options.find(item => item.value === active) || options[0];

    return (
      <div className="select">
        <svg className="icon icon-arrow" viewBox="0 0 11.3 19.6">
          <path d="M0.7,0.6c-0.8,0.8-0.9,2.1-0.1,2.9l5.9,6.4l-5.9,6.3c-0.8,0.9-0.8,2.2,0.1,2.9 c0.9,0.7,2.1,0.7,2.9-0.1l7.2-7.8c0.1-0.1,0.1-0.1,0.2-0.2l0,0c0.1-0.1,0.1-0.2,0.2-0.3l0,0c0-0.1,0.1-0.2,0.1-0.3v-0.1 c0-0.1,0-0.2,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.2,0-0.2V9.4c0-0.1-0.1-0.2-0.1-0.3l0,0C11.1,9,11.1,8.9,11,8.8 l0,0c-0.1-0.1-0.1-0.2-0.2-0.2L3.6,0.7C2.8-0.2,1.5-0.2,0.7,0.6z" />
        </svg>

        <input
          className="input"
          type="text"
          onFocus={this.toggleOpenDropdown}
          onBlur={this.toggleOpenDropdown}
          value={activeOpt.title}
        />

        {this.state.showDropdown &&
          <div className="select__dropdown">
            {options.map((item, idx) => (
              <Item
                key={idx}
                data={item}
                name={name}
                onChange={onChange}
              />
            ))
            }
          </div>
        }
      </div>
    );
  }
}

ChoiseFilter.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ChoiseFilter;

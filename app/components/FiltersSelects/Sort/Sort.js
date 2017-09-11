import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import SortItem from './SortItem';

import { __t } from '../../../i18n/translator';

class Sort extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
    };
  }

  toggleDropdown = () => {
    this.setState({
      showDropdown: !this.state.showDropdown,
    });
  }

  render() {
    const {
      subClass,
      activeItem,
      listItems,
      className,
      onChange,
      name,
    } = this.props;

    return (
      <div className={`${className} ${subClass}`}>
        <input
          className="input"
          type="text"
          onFocus={this.toggleDropdown}
          onBlur={this.toggleDropdown}
          value={__t(activeItem)}
        />
        <svg className="icon icon-arrow" viewBox="0 0 11.3 19.6">
          <path d="M0.7,0.6c-0.8,0.8-0.9,2.1-0.1,2.9l5.9,6.4l-5.9,6.3c-0.8,0.9-0.8,2.2,0.1,2.9 c0.9,0.7,2.1,0.7,2.9-0.1l7.2-7.8c0.1-0.1,0.1-0.1,0.2-0.2l0,0c0.1-0.1,0.1-0.2,0.2-0.3l0,0c0-0.1,0.1-0.2,0.1-0.3v-0.1 c0-0.1,0-0.2,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.2,0-0.2V9.4c0-0.1-0.1-0.2-0.1-0.3l0,0C11.1,9,11.1,8.9,11,8.8 l0,0c-0.1-0.1-0.1-0.2-0.2-0.2L3.6,0.7C2.8-0.2,1.5-0.2,0.7,0.6z" />
        </svg>
        {
          this.state.showDropdown
          &&
          <div className={`${className}__dropdown`}>
            {
              listItems.map((item, idx) => (
                <SortItem
                  data={item}
                  key={idx}
                  onClick={onChange}
                  className={className}
                  name={name}
                />
              ))
            }
          </div>
        }
      </div>
    );
  }
}

Sort.defaultProps = {
  activeItem: '',
  className: 'select',
  subClass: '',
};

Sort.propTypes = {
  name: PropTypes.string.isRequired,
  subClass: PropTypes.string,
  activeItem: PropTypes.string,
  listItems: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])).isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Sort;

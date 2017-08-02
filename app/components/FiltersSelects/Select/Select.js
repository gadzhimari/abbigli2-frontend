import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { __t } from '../../../i18n/translator';

import './Select.less';

class Select extends PureComponent {
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
      placeholder,
      activeItem,
      listItems,
      className,
      ItemComponent,
      onChange,
      name,
      canReset,
    } = this.props;

    return (
      <div className={`${className} ${subClass}`}>
        <input
          className="input"
          type="text"
          placeholder={placeholder}
          onFocus={this.toggleDropdown}
          onBlur={this.toggleDropdown}
          value={activeItem}
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
                <ItemComponent
                  data={item}
                  key={idx}
                  onClick={onChange}
                  className={className}
                  name={name}
                />
              ))
            }
            {
              canReset && activeItem
              &&
              <a
                className="filter__reset select__item"
                onMouseDown={onChange}
                onTouchStart={onChange}
                data-value=""
                data-field={name}
              >
                {__t('Reset')}
              </a>
            }
          </div>
        }
      </div>
    );
  }
}

Select.defaultProps = {
  placeholder: '',
  activeItem: '',
  className: 'select',
  subClass: '',
  canReset: false,
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  subClass: PropTypes.string,
  placeholder: PropTypes.string,
  activeItem: PropTypes.string,
  listItems: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.string, PropTypes.object)).isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  ItemComponent: PropTypes.node.isRequired,
  canReset: PropTypes.bool,
};

export default Select;

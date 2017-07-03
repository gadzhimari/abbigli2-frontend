import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { __t } from '../../i18n/translator';
import './ChoiceSection.less';

class ChoiceSection extends Component {
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
    .onChange('section', target.innerText);

  render() {
    const { sections, activeSection } = this.props;

    return (
      <div className="choice-section">
        <div className="input-wrap">
          <input
            className="input"
            type="text"
            placeholder={__t('Choice a section')}
            onChange={this.onChangeInput}
            onFocus={this.toggleOpenDropdown}
            onBlur={this.toggleOpenDropdown}
            value={activeSection}
          />
        </div>
        {
          this.state.openDropdown
          &&
          <div className="choice-section__dropdown">
            {
              sections.map(item => <a
                className="choice-section__item"
                key={item.id}
                onMouseDown={this.changeValue}
                onTouchEnd={this.changeValue}
              >
                {item.title}
              </a>)
            }
          </div>
        }
      </div>
    );
  }
}

export default ChoiceSection;

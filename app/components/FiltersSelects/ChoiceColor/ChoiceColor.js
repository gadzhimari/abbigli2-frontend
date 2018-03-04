import React, { PureComponent } from 'react';
import Type from 'prop-types';

import Button from '../../Button';
import Color from './Color';
import ChoiceColorMobile from './ChoiceColor.mobile';

import { colors } from '../../../lib/constants/colors';
import { isClickOutside } from '../../../lib/window';

import { __t } from '../../../i18n/translator';
import './ChoiceColor.less';
import bindMethods from '../../../lib/bindMethods';
import cn from '../../../lib/cn';

@cn('ChoiceColor')
class ChoiceColor extends PureComponent {
  static propTypes = {
    onChange: Type.func.isRequired,
    activeColor: Type.string,
    className: Type.oneOfType([Type.string, Type.func]),
    isMobile: Type.bool,
  };

  static defaultProps = {
    activeColor: '',
    isMobile: false,
  };

  constructor(props) {
    super(props);

    this.state = { openedDropdown: false };

    bindMethods(this, [
      'onClear',
      'handleClickOutside',
      'openDropdown'
    ]);
  }

  componentDidMount() {
    if (!this.props.isMobile) {
      window.addEventListener('click', this.handleClickOutside);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickOutside);
  }

  onClear(e) {
    this.props.onChange(e, {
      value: [],
      name: 'colors',
    });
  }

  handleClickOutside({ target }) {
    if (isClickOutside(this.root, target)) {
      this.setState({ openedDropdown: false });
    }
  }

  openDropdown() {
    this.setState({ openedDropdown: true });
  }

  render(cn) {
    const { onChange, activeColor, isMobile, className } = this.props;
    const { openedDropdown } = this.state;

    if (isMobile) {
      return <ChoiceColorMobile {...this.props} />;
    }

    return (
      <div className={cn(className)} ref={root => (this.root = root)}>
        <Button
          className="input"
          onClick={this.openDropdown}
        >
          {activeColor ?
            __t(activeColor) : __t('Pick a color')}
        </Button>

        {activeColor ?
          <svg
            className="icon icon-close"
            viewBox="0 0 14 14.031"
            onMouseDown={this.onClear}
            onTouchStart={this.onClear}
          >
            <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z" />
          </svg> : <svg className="icon icon-arrow" viewBox="0 0 11.3 19.6">
            <path d="M0.7,0.6c-0.8,0.8-0.9,2.1-0.1,2.9l5.9,6.4l-5.9,6.3c-0.8,0.9-0.8,2.2,0.1,2.9 c0.9,0.7,2.1,0.7,2.9-0.1l7.2-7.8c0.1-0.1,0.1-0.1,0.2-0.2l0,0c0.1-0.1,0.1-0.2,0.2-0.3l0,0c0-0.1,0.1-0.2,0.1-0.3v-0.1 c0-0.1,0-0.2,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.2,0-0.2V9.4c0-0.1-0.1-0.2-0.1-0.3l0,0C11.1,9,11.1,8.9,11,8.8 l0,0c-0.1-0.1-0.1-0.2-0.2-0.2L3.6,0.7C2.8-0.2,1.5-0.2,0.7,0.6z" />
          </svg>
        }

        {openedDropdown &&
          <div className={cn('dropdown')}>
            {colors.map(color => <Color
              key={color}
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

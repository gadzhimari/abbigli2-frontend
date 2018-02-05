import React, { Component } from 'react';
import Type from 'prop-types';
import block from 'bem-cn';

import Color from './Color';

import { colors } from '../../../lib/constants/colors';
import { __t } from '../../../i18n/translator';

const b = block('ChoiceColor');

class ChoiceColor extends Component {
  static propTypes = {
    activeColor: Type.string,
    className: Type.oneOfType([Type.string, Type.func]),
    onChange: Type.func,
  }

  render() {
    const { activeColor, onChange, className } = this.props;

    return (
      <div className={b.mix(className)}>
        <div className={b('label')}>
          {__t('Pick a color')}
        </div>

        <div className={b('wrap')}>
          {colors.map(color => <Color
            key={color}
            color={color}
            onClick={onChange}
            isActive={activeColor === color}
          />)
          }
        </div>
      </div>
    );
  }
}

export default ChoiceColor;

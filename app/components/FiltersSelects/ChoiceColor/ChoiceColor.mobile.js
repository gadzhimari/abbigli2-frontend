import React, { Component } from 'react';
import Type from 'prop-types';

import Color from './Color';

import { colors } from '../../../lib/constants/colors';
import { __t } from '../../../i18n/translator';
import cn from '../../../lib/cn';

@cn('ChoiceColor')
class ChoiceColor extends Component {
  static propTypes = {
    activeColor: Type.string,
    className: Type.oneOfType([Type.string, Type.func]),
    onChange: Type.func,
  }

  render(cn) {
    const { activeColor, onChange } = this.props;

    return (
      <div className={cn()}>
        <div className={cn('label')}>
          {__t('Pick a color')}
        </div>

        <div className={cn('wrap')}>
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

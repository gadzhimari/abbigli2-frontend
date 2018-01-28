import React, { PureComponent } from 'react';
import Type from 'prop-types';

import Select from './Select';

export default class CitySelect extends PureComponent {
  static propTypes = {
    compact: Type.bool,
  }

  render() {
    const { compact, ...selectProps } = this.props;

    if (compact) {
      // TODO: Сделать мобильную версию с открытием попапа
    }

    return (
      <Select
        {...selectProps}
      />
    );
  }
}

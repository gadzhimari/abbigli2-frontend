import React, { PureComponent } from 'react';
import Type from 'prop-types';

import { __t } from '../../i18n/translator';

// TODO: Добавить отображение асинхронного запроса
class SubscribeButton extends PureComponent {
  static propTypes = {
    subscribed: Type.bool,
  }

  render() {
    const { subscribed, ...buttonProps } = this.props;

    return (
      <button {...buttonProps}>
        { subscribed ?
            __t('Unsubscribe') : __t('Subscribe')
        }
      </button>
    );
  }
}

export default SubscribeButton;

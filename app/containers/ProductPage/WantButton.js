import React, { PureComponent } from 'react';
import Type from 'prop-types';

import { gaSendClickEvent } from '../../lib/analitics';
import { __t } from '../../i18n/translator';

export default class WantButton extends PureComponent {
  static propTypes = {
    onClick: Type.func,
  }

  onClick = (e) => {
    gaSendClickEvent('product', 'order');
    this.props.onClick(e);
  }

  render() {
    return (
      <button
        className="want-button"
        onClick={this.onClick}
      >
        <svg className="icon icon-bag" viewBox="0 0 53.3 45.9">
          <path d="M51.3,17H39.1c-0.1-0.2-0.1-0.5-0.3-0.7L28.3,0.8c-0.1-0.2-0.3-0.3-0.5-0.5c0,0,0,0-0.1-0.1 c0,0,0,0,0,0C27.5,0.2,27.3,0.1,27,0c0,0,0,0,0,0c-0.1,0-0.3,0-0.4,0s-0.3,0-0.4,0c0,0,0,0,0,0c-0.2,0.1-0.5,0.1-0.7,0.3 c0,0,0,0,0,0c0,0,0,0-0.1,0.1c-0.2,0.1-0.3,0.3-0.5,0.5L14.5,16.3c-0.1,0.2-0.2,0.5-0.3,0.7H2c-1.3,0-2.3,1.3-1.9,2.5l7.4,25 c0.2,0.8,1,1.4,1.9,1.4h34.5c0.9,0,1.6-0.6,1.9-1.4l7.4-25C53.6,18.3,52.6,17,51.3,17z M26.6,5.5L34.4,17H18.8L26.6,5.5z M26.6,37.6 c-3.5,0-6.3-2.8-6.3-6.3c0-3.5,2.8-6.3,6.3-6.3s6.3,2.8,6.3,6.3C32.9,34.8,30.1,37.6,26.6,37.6z" />
        </svg>

        {__t('Want it')}
      </button>
    );
  }
}

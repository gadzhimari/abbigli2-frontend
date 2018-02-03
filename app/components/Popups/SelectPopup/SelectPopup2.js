import React, { PureComponent } from 'react';
import Type from 'prop-types';
import B from 'bem-cn';

import Select from '../../Inputs/Select';

const b = B('SelectPopup');

const exampleOptions = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 }
];

export default class SelectPopup extends PureComponent {
  static propTypes = {
    title: Type.string,
  }

  render() {
    const { title } = this.props;

    return (
      <div className="popup-wrap" id="sendMessage" style={{ display: 'block' }}>
        <div
          className="popup mobile-search__popup select-popup"
        >
          <header className="mobile-search__header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14.031"
              className="popup-close icon"
              onClick={this.onClose}
            >
              <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z" />
            </svg>

            <div className="popup-title">
              {title}
            </div>
          </header>

          <Select
            wrapperClass={b('wrapper')}
            className={b}
            options={exampleOptions}
          />
        </div>
      </div>
    );
  }
}

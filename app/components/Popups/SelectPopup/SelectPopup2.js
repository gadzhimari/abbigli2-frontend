import React, { PureComponent } from 'react';
import Type from 'prop-types';
import B from 'bem-cn';

import Select from '../../Inputs/Select';

import bindMethods from '../../../lib/bindMethods';

import './SelectPopup.less';

const b = B('SelectPopup');

export default class SelectPopup extends PureComponent {
  static propTypes = {
    options: Type.shape({
      title: Type.string
    }),
    closePopup: Type.func,
  }

  constructor(props) {
    super(props);

    bindMethods(this, [
      'onChange',
      'close'
    ]);
  }

  onChange(...args) {
    const { options } = this.props;

    options.onChange(...args);
    this.close();
  }

  close() {
    this.props.closePopup();
  }

  render() {
    const { options } = this.props;
    const { title, ...selectOptions } = options;

    delete selectOptions.onChange;

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
              onClick={this.close}
            >
              <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z" />
            </svg>

            <div className="popup-title">
              {title}
            </div>
          </header>

          <Select
            wrapperClass={b('wrapper')}
            className={b()}
            onChange={this.onChange}
            {...selectOptions}
          />
        </div>
      </div>
    );
  }
}

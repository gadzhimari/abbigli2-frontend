import React, { PureComponent } from 'react';
import Type from 'prop-types';

import Select from '../Select';
import Button from '../../Button';

import { Geo } from '../../../api';
import citiesToOpts from '../../../lib/adapters/cities-to-opts';

import './CitySelect.less';

export default class CitySelect extends PureComponent {
  static propTypes = {
    compact: Type.bool,
    openPopup: Type.func
  }

  getOptions(input) {
    return Geo.getCitiesByName(input)
      .then(({ data }) => ({ options: citiesToOpts(data.results) }));
  }

  openPopup() {
    this.props.openPopup('selectPopup', {
      async: true,
      loadOptions: this.getOptions
    });
  }

  render() {
    const { compact, ...selectProps } = this.props;
    const { wrapperClass, label } = selectProps;

    delete selectProps.openPopup;

    if (compact) {
      return (
        <div className={wrapperClass}>
          {label &&
            <label className="label" htmlFor={this.id}>
              {label}
            </label>
          }

          <Button
            className="CitySelect__button"
            type="button"
            onClick={this.openPopup}
          />
        </div>
      );
    }

    return (
      <Select
        {...selectProps}
        async
        loadOptions={this.getOptions}
      />
    );
  }
}

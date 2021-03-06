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
    openPopup: Type.func,
    onChange: Type.func,
    name: Type.string
  }

  static defaultProps = {
    options: []
  }

  state = {
    label: this.props.options[0] && this.props.options[0].label
  }

  onChange = (e, { label, ...otherFields }) => {
    this.setState({ label });

    this.props.onChange(e, { label, ...otherFields });
  }

  getOptions(name) {
    return Geo.getCities({ name })
      .then(({ data }) => ({ options: citiesToOpts(data.results) }));
  }

  openPopup = () => {
    this.props.openPopup('selectPopup', {
      async: true,
      loadOptions: this.getOptions,
      onChange: this.onChange,
      name: this.props.name,
    });
  }

  render() {
    const { compact, ...selectProps } = this.props;
    const { selectClassName, label } = selectProps;

    delete selectProps.openPopup;

    if (compact) {
      return (
        <div className={selectClassName}>
          {label &&
            <label className="label" htmlFor={this.id}>
              {label}
            </label>
          }

          <Button
            className="CitySelect__button"
            type="button"
            onClick={this.openPopup}
          >
            {this.state.label}
          </Button>
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

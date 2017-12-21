import React, { PureComponent } from 'react';
import Type from 'prop-types';

import './checkbox.less';

class Checkbox extends PureComponent {
  static propTypes = {
    checked: Type.bool,
    onChange: Type.func,
    label: Type.string,
    id: Type.string,
  };

  state = {
    checked: false,
  }

  get checked() {
    return typeof this.props.checked === 'undefined'
      ? this.state.checked : this.props.checked;
  }

  handleChange = (event) => {
    this.setState({
      checked: event.target.checked,
    });

    if (this.props.onChange) {
      this.props.onChange(event.target.checked, event);
    }
  }

  render() {
    const {
      label,
      id,
    } = this.props;

    const checked = this.checked;

    return (
      <div className="checkbox-wrap">
        <input
          id={id}
          className="checkbox"
          type="checkbox"
          onChange={this.handleChange}
          checked={checked}
        />
        <label htmlFor={id} className="label">{label}</label>
      </div>
    );
  }
}

export default Checkbox;

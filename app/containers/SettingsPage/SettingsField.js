/* eslint react/sort-comp: 0 */

import React, { PureComponent } from 'react';
import Type from 'prop-types';

class SettingsField extends PureComponent {
  static propTypes = {
    label: Type.string,
    value: Type.string,
    placeholder: Type.string,
  };

  static defaultProps = {
    value: '',
  };

  state = {
    editing: false,
  }

  changeEditingStatus = status => () => {
    this.setState({
      editing: status,
    });
  }

  getContent = () => {
    const { editing } = this.state;
    const { value, placeholder } = this.props;

    if (!editing) {
      return (
        <div className="settings-table__cell">{value || placeholder}</div>
      );
    }

    return (
      <div className="settings-table__cell settings-table__cell--changed">
        <input className="input" type="text" />
        <div className="settings-table__buttons">
          <button className="default-button" type="button">Сохранить</button>
        </div>
      </div>
    );
  }

  getButton = () => {
    const { editing } = this.state;
    const onClick = editing
      ? this.changeEditingStatus(false) : this.changeEditingStatus(true);
    const text = editing ? 'Отмена' : 'Изменить';

    return (
      <div className="settings-table__cell">
        <button
          className="settings-table__change"
          onClick={onClick}
        >
          {text}
        </button>
      </div>
    );
  }

  render() {
    const { label } = this.props;

    return (
      <div className="settings-table__row">
        <div className="settings-table__cell">{label}</div>
        {this.getContent()}
        {this.getButton()}
      </div>
    );
  }
}

export default SettingsField;

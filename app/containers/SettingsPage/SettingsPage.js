import React, { Component } from 'react';
import Type from 'prop-types';

import Checkbox from '../../components/Checkbox';
import SettingsField from './SettingsField';

import './settings-page.less';

class SettingsPage extends Component {
  static propTypes = {};

  render() {
    return (<main className="main">
      <div className="content">
        <div className="settings-table">
          <h1 className="section-title">Настройки</h1>
          <div className="settings-table__row">
            <div className="settings-table__cell">Настройки приватности</div>
            <div className="settings-table__cell">
              <Checkbox
                id="disableCommenting"
                label="Показывать мою ленту"
              />
              <Checkbox
                id="disableCommenting"
                label="Показывать моё избранное"
              />
            </div>
            <div className="settings-table__cell" />
          </div>
          <SettingsField
            label="Пароль"
            placeholder={'Обновлен 3 месяца назад'}
          />
          <SettingsField
            label="Электронная почта"
            value="mail@mail.ru"
          />
          <SettingsField
            label="Номер телефона"
            value="+79009009999"
          />
          <SettingsField
            label="Адрес страницы"
            value="facepalm"
          />
        </div>
      </div>
    </main>);
  }
}

export default SettingsPage;

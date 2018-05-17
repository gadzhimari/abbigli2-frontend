import { React, Component } from '../../components-lib/__base';
import { Checkbox } from '../../components-lib';
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
              <div className="settings-table__privacy">
                <Checkbox
                  id="showFeed"
                  text="Показывать мою ленту"
                />
              </div>
              <div className="settings-table__privacy">
                <Checkbox
                  id="showFavorites"
                  text="Показывать моё избранное"
                />
              </div>
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

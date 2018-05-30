import { connect } from 'react-redux';
import Select from 'react-select';

import { React, Component, cn } from '../../components-lib/__base';
import { Button, Spin, Link } from '../../components-lib';
import Image from '../../components/Image';

import ProfileBanners from '../Profile/components/ProfileBanners';

import * as actions from '../../ducks/ProfilePosts/actions';

import { __t } from './../../i18n/translator';

import '../LK/Profile.less';

const options = [
  { value: '7 дней', label: '7 дней' },
  { value: '15 дней', label: '15 дней' },
  { value: '30 дней', label: '30 дней' },
];

@cn('Profile')
class ProfileRaiseAds extends Component {
  state = {
    selectedValue: options[0],
  }

  handleChange = (newValue) => {
    this.setState({
      selectedValue: newValue,
    });
  }

  renderLoader() {
    const { isFetchingPosts } = this.props;

    return (
      <div className="spin-wrapper">
        <Spin visible={isFetchingPosts} />
      </div>
    );
  }

  renderColumn(cn) {
    return (
      <tr className={cn('table-row')}>
        <td className={cn('table-col')}>
          <div className={cn('table-cell')}>
            <Image
              src="https://abbigli.ru/thumbs/RLHuxVgODRbOO3DtOQZqm3XhaU8=/d54b4813a50c4f06930716abad01f10c"
              thumbSize="108x94"
              className={cn('item-preview')}
            />
          </div>
        </td>
        <td className={cn('table-col')}>
          <div className={cn('table-cell')}>
            <div className={cn('item-title')}>
              Шарф фетровый, натуральный
            </div>
            <div className={cn('item-price')}>
              300 Р
            </div>
          </div>
        </td>
        <td className={cn('table-col')}>
          <div className={cn('table-cell')}>
            <div className={cn('item-time-selector')}>
              <Select
                options={options}
                name="form-field-name"
                value={this.state.selectedValue}
                onChange={this.handleChange}
                clearable={false}
                autosize={false}
                onFocus={this.handleFocus}
              />
            </div>
            <div className={cn('item-period')}>
              <div className={cn('item-period-start')}>
                C: сегодня
              </div>
              <div className={cn('item-period-end')}>
                По: 10 марта
              </div>
            </div>
          </div>
        </td>
        <td className={cn('table-col')}>
          <div className={cn('table-cell')}>
            <div className={cn('item-category')}>
              Игрушки
            </div>
          </div>
        </td>
        <td className={cn('table-col')}>
          <div className={cn('table-cell')}>
            <div className={cn('item-price-of-raise')}>
              $15
            </div>
          </div>
        </td>
        <td className={cn('table-col')}>
          <div className={cn('table-cell')}>
            <div className={cn('item-actions')}>
              <div className={cn('item-action')}>
                <Button
                  view="link"
                  size="s"
                  text={__t('Archive')}
                />
              </div>
              <div className={cn('item-action')}>
                <Button
                  view="link"
                  size="s"
                  text={__t('Delete')}
                />
              </div>
            </div>
          </div>
        </td>
      </tr>
    );
  }

  render(cn) {
    const {
      isFetchingPosts,
      isMe,
    } = this.props;

    return (
      <div className={cn('content')}>
        <div className={cn('items')}>
          <div className={cn('items-header')}>
            <div className={cn('items-header-wrapper')}>
              <h1 className={cn('items-header-title')}>
                Поднятие объявлений вверх списка
              </h1>
              <h2 className={cn('items-header-subtitle')}>
                Выберите срок поднятия
              </h2>
              <div className={cn('items-header-info')}>
                <span className={cn('items-header-selected')}>
                  Выбрано: 3
                </span>
                <div className={cn('items-header-payment')}>
                  <span className={cn('items-header-total')}>
                    <span className={cn('items-header-total-title')}>Общая
                      стоимость:</span>
                    <span className={cn('items-header-total-price')}>$15</span>
                  </span>
                  <Button
                    view="outline"
                    text="Оплатить"
                    size="l"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={cn('items-panel')}>
            <table className="Table Profile__table">
              <thead>
                <tr>
                  <th />
                  <th>Название Цена</th>
                  <th>Срок поднятия</th>
                  <th>Категория</th>
                  <th>Стоимость поднятия</th>
                  <th>Архивировать/Удалить</th>
                </tr>
              </thead>
              <tbody>
                {
                  [1, 2, 3].map(() => this.renderColumn(cn))
                }
              </tbody>
            </table>
          </div>
          <div className={cn('items-footer')}>
            <div className={cn('items-footer-wrapper')}>
              <Link
                to="#"
                size="s"
                text="Вернуться в витрину"
              />
              <div className={cn('items-footer-payment')}>
                <span className={cn('items-footer-total')}>
                  <span className={cn('items-footer-total-title')}>Общая
                    стоимость:</span>
                  <span className={cn('items-footer-total-price')}>$15</span>
                </span>
                <Button
                  text="Оплатить"
                  size="l"
                />
              </div>
            </div>
          </div>
        </div>
        { isMe && <ProfileBanners /> }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  itemsPosts: state.ProfilePosts.items,
  next: state.ProfilePosts.next,
  isFetchingPosts: state.ProfilePosts.isFetching,
  me: state.Auth.me,
  user: state.Profile.data,
  isMe: state.Profile.isMe,
  isAuth: state.Auth.isAuthenticated,
  priceTemplate: state.Settings.data.CURRENCY,
});

export default connect(mapStateToProps, { ...actions })(ProfileRaiseAds);

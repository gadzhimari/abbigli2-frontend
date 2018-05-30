import { connect } from 'react-redux';
import Select from 'react-select';

import { React, Component, Type, cn } from '../../components-lib/__base';
import { Button, Spin, Link } from '../../components-lib';
import IconMore from '../../icons/more';

import { closePopup, openPopup } from '../../ducks/Popup/actions';

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

const data = {
  category: 'Игрушки',
  price: '$10',
  dateStart: 'сегодня',
  dateEnd: '10 марта',
};

@cn('Profile')
class ProfileRaiseAdsMobile extends Component {
  static propTypes = {
    dispatch: Type.func.isRequired,
    closePopup: Type.func.isRequired,
  };

  state = {
    selectedValue: options[0],
  }

  handleChange = (newValue) => {
    this.setState({
      selectedValue: newValue,
    });
  }

  handleMoreClick = () => {
    this.props.openDialog(data);
  }

  renderLoader() {
    const { isFetchingPosts } = this.props;

    return (
      <div className="spin-wrapper">
        <Spin visible={isFetchingPosts} />
      </div>
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
                <span className={cn('items-header-total')}>
                  <span className={cn('items-header-total-title')}>Общая
                    стоимость:</span>
                  <span className={cn('items-header-total-price')}>$15</span>
                </span>
              </div>

              <Button
                view="outline"
                text="Оплатить"
                size="l"
                fullWidth
              />
            </div>
          </div>
          <div className={cn('items-panel')}>
            <div className={cn('items-list')}>
              <div className={cn('item')}>
                <Image
                  src="https://abbigli.ru/thumbs/RLHuxVgODRbOO3DtOQZqm3XhaU8=/d54b4813a50c4f06930716abad01f10c"
                  thumbSize="108x94"
                  className={cn('item-preview')}
                />
                <div className={cn('item-desc')}>
                  <div className={cn('item-title')}>
                    Шарф фетровый, натуральный
                  </div>
                  <div className={cn('item-price')}>
                    300 Р
                  </div>
                </div>
                <Button
                  view="icon"
                  aria-label={__t('Show more')}
                  className={cn('item-show-more')}
                  onClick={this.handleMoreClick}
                  icon={<IconMore
                    size="xs"
                    color="gray-800"
                  />}
                />
              </div>
            </div>
            <div className={cn('items-footer')}>
              <div className={cn('items-footer-wrapper')}>
                <div className={cn('items-footer-payment')}>
                  <div className={cn('items-footer-total')}>
                    <span className={cn('items-footer-total-title')}>Общая
                      стоимость:</span>
                    <span className={cn('items-footer-total-price')}>$15</span>
                  </div>
                  <div className={cn('items-pay-button')}>
                    <Button
                      text="Оплатить"
                      size="l"
                      fullWidth
                    />
                  </div>
                  <div>
                    <Link
                      to="#"
                      size="s"
                      text="Вернуться в витрину"
                    />
                  </div>
                </div>
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

const mapDispatchToProps = dispatch => ({
  openDialog: data => dispatch(openPopup('mobilePopup', data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileRaiseAdsMobile);

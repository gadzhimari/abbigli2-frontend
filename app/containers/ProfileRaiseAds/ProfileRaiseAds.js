import { connect } from 'react-redux';

import { React, Component, cn } from '../../components-lib/__base';
import { Button, Spin, Link, PostsTable, Price } from '../../components-lib';

import ProfileRaiseAdsMobile from './ProfileRaiseAds.mobile';

import ProfileBanners from '../Profile/components/ProfileBanners';

import * as actions from '../../ducks/ProfilePosts/actions';

import { ADS_TARIFF_BY_PERIOD, ADS_DATE_PERIODS } from '../../lib/constants/ads-tariffs';
import { USD_PRICE_TEMPLATE } from '../../lib/constants/price';

import { __t } from './../../i18n/translator';

import '../LK/Profile.less';

const DEFAULT_TARIFF = ADS_TARIFF_BY_PERIOD[ADS_DATE_PERIODS[0].value];

@cn('Profile')
class ProfileRaiseAds extends Component {
  state = {
    totalPrice: this.props.posts.length * DEFAULT_TARIFF
  }

  onChangePrice = (previousTariff, newTariff) => {
    const totalPrice = (this.state.totalPrice - previousTariff) + newTariff;
    this.setState({ totalPrice });
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
    const { isTouch, posts } = this.props;
    const { totalPrice } = this.state;

    if (isTouch) {
      return <ProfileRaiseAdsMobile />;
    }

    return (
      <div className={cn('wrapper')}>
        <div className={cn('content', { noTopContent: true })}>
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
                    {__t('Selected', { count: posts.length })}
                  </span>

                  <div className={cn('items-header-payment')}>
                    <span className={cn('items-header-total')}>
                      <span className={cn('items-header-total-title')}>
                        Общая стоимость:
                      </span>

                      <Price
                        price={totalPrice}
                        className={cn('items-header-total-price')}
                        priceTemplate={USD_PRICE_TEMPLATE}
                      />
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
              <PostsTable
                posts={posts}
                showPeriod
                onChangePrice={this.onChangePrice}
              />
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
                    <span className={cn('items-footer-total-title')}>
                      Общая стоимость:
                    </span>

                    <Price
                      price={totalPrice}
                      className={cn('items-footer-total-price')}
                      priceTemplate={USD_PRICE_TEMPLATE}
                    />
                  </span>

                  <Button
                    text="Оплатить"
                    size="l"
                  />
                </div>
              </div>
            </div>
          </div>

          <ProfileBanners />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isTouch: state.isTouch,

  posts: state.AdvBucket.posts,
  postsIds: state.AdvBucket.postsIds,
});

export default connect(mapStateToProps, { ...actions })(ProfileRaiseAds);

import { React, Component, cn, connect } from '../../components-lib/__base';

import { Button, Spin, Link, PostsTable, Price } from '../../components-lib';
import ProfileBanners from '../Profile/components/ProfileBanners';

import * as actions from '../../ducks/ProfilePosts/actions';
import { loadBucket, removeFromBucket } from '../../ducks/AdvBucket/actions';
import { openPopup } from '../../ducks/Popup/actions';

import { ADS_TARIFF_BY_PERIOD, ADS_DATE_PERIODS } from '../../lib/constants/ads-tariffs';
import { USD_PRICE_TEMPLATE } from '../../lib/constants/price';
import { POST_TABLE_DELETE_ACTION } from '../../components-lib/PostsTable/PostsTableRow';

import { __t } from './../../i18n/translator';

import './RaiseAds.less';

import MobVer from './ProfileRaiseAds.mobile';

const DEFAULT_TARIFF = ADS_TARIFF_BY_PERIOD[ADS_DATE_PERIODS[0].value];
const postsTableActions = [POST_TABLE_DELETE_ACTION];

@cn('RaiseAds')
class RaiseAds extends Component {
  state = {
    totalPrice: this.props.posts.length * DEFAULT_TARIFF
  }

  componentDidMount() {
    this.fetchPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.posts.length !== nextProps.posts.length) {
      this.setState({ totalPrice: nextProps.posts.length * DEFAULT_TARIFF });
    }
  }

  onChangePrice = (previousTariff, newTariff) => {
    const totalPrice = (this.state.totalPrice - previousTariff) + newTariff;
    this.setState({ totalPrice });
  }

  fetchPosts = () => {
    const { loadBucket } = this.props;
    loadBucket();
  }

  renderLoader() {
    return (
      <div className="spin-wrapper">
        <Spin visible />
      </div>
    );
  }


  render(cn) {
    const { posts, isFetching, removeFromBucket, user, openPopup, isTouch } = this.props;
    const { totalPrice } = this.state;

    // if (isTouch) {
    //   return <MobVer {...this.props} />
    // }

    return (
      <div className={cn('wrapper')}>
        <div className={cn('items')}>
          <div className={cn('header')}>
            <h1 className={cn('title')}>
              {__t('bucket.title')}
            </h1>

            <h2 className={cn('subtitle')}>
              {__t('bucket.subTitle')}
            </h2>

            <div className={cn('info')}>
              <span className={cn('selectedCount')}>
                {__t('Selected', { count: posts.length })}
              </span>

              <div className={cn('paymentInfo')}>
                <span className={cn('totalPriceWrapper')}>
                  <span className={cn('totalPriceText')}>
                    {__t('bucket.totalPrice')}{' '}
                  </span>

                  <Price
                    price={totalPrice}
                    className={cn('totalPrice')}
                    priceTemplate={USD_PRICE_TEMPLATE}
                  />
                </span>

                <Button
                  view="outline"
                  text={__t('bucket.pay')}
                  size="l"
                  fullWidth={isTouch}
                  className={cn('payButton')}
                />
              </div>
            </div>

            {/* Используется на мобильных */}
            <Button
              view="outline"
              text={__t('bucket.pay')}
              size="l"
              fullWidth={isTouch}
              className={cn('payButtonMobile')}
            />
          </div>

          <div className={cn('itemsWrapper')}>
            {isFetching ? this.renderLoader()
              : <PostsTable
                posts={posts}
                showPeriod
                onChangePrice={this.onChangePrice}
                actions={postsTableActions}
                deletePost={removeFromBucket}
                openPopup={openPopup}
              />
            }
          </div>

          <div className={cn('footer')}>
            <Link
              to={`/profile/${user.id}/lk`}
              size="s"
              text={__t('bucket.backToShop')}
              className={cn('backLink')}
            />

            <div className={cn('paymentInfo')}>
              <span className={cn('totalPriceWrapper')}>
                <span className={cn('totalPriceText')}>
                  {__t('bucket.totalPrice')}{' '}
                </span>

                <Price
                  price={totalPrice}
                  className={cn('totalPrice')}
                  priceTemplate={USD_PRICE_TEMPLATE}
                />
              </span>

              <Button
                text={__t('bucket.pay')}
                size="l"
                fullWidth={isTouch}
                className={cn('payButton')}
              />

              {/* Показывается только на мобильном */}
              <Link
                to={`/profile/${user.id}/lk`}
                size="s"
                text={__t('bucket.backToShop')}
                className={cn('backLinkMobile')}
              />
            </div>
          </div>
        </div>

        <ProfileBanners />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isTouch: state.isTouch,

  posts: state.AdvBucket.posts,
  isFetching: state.AdvBucket.isFetching,
  user: state.Auth.me
});

export default connect(mapStateToProps, {
  ...actions, loadBucket, removeFromBucket, openPopup
})(RaiseAds);

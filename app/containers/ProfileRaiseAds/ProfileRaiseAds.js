import { React, Component, cn, connect } from '../../components-lib/__base';
import { Button, Spin, Link, PostsTable, Price } from '../../components-lib';

import ProfileBanners from '../Profile/components/ProfileBanners';

import * as actions from '../../ducks/ProfilePosts/actions';
import { loadBucket, removeFromBucket } from '../../ducks/AdvBucket/actions';

import { ADS_TARIFF_BY_PERIOD, ADS_DATE_PERIODS } from '../../lib/constants/ads-tariffs';
import { USD_PRICE_TEMPLATE } from '../../lib/constants/price';
import { POST_TABLE_DELETE_ACTION } from '../../components-lib/PostsTable/PostsTableRow';

import { __t } from './../../i18n/translator';

import '../LK/Profile.less';

const DEFAULT_TARIFF = ADS_TARIFF_BY_PERIOD[ADS_DATE_PERIODS[0].value];
const postsTableActions = [POST_TABLE_DELETE_ACTION];

@cn('Profile')
class ProfileRaiseAds extends Component {
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
    const { posts, isFetching, removeFromBucket, user } = this.props;
    const { totalPrice } = this.state;

    return (
      <div className={cn('wrapper')}>
        <div className={cn('content', { noTopContent: true })}>
          <div className={cn('items')}>
            <div className={cn('items-header')}>
              <div className={cn('items-header-wrapper')}>
                <h1 className={cn('items-header-title')}>
                  {__t('bucket.title')}
                </h1>

                <h2 className={cn('items-header-subtitle')}>
                  {__t('bucket.subTitle')}
                </h2>

                <div className={cn('items-header-info')}>
                  <span className={cn('items-header-selected')}>
                    {__t('Selected', { count: posts.length })}
                  </span>

                  <div className={cn('items-header-payment')}>
                    <span className={cn('items-header-total')}>
                      <span className={cn('items-header-total-title')}>
                        {__t('bucket.totalPrice')}
                      </span>

                      <Price
                        price={totalPrice}
                        className={cn('items-header-total-price')}
                        priceTemplate={USD_PRICE_TEMPLATE}
                      />
                    </span>

                    <Button
                      view="outline"
                      text={__t('bucket.pay')}
                      size="l"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={cn('items-panel')}>
              {isFetching ? this.renderLoader()
                : <PostsTable
                  posts={posts}
                  showPeriod
                  onChangePrice={this.onChangePrice}
                  actions={postsTableActions}
                  deletePost={removeFromBucket}
                />
              }
            </div>

            <div className={cn('items-footer')}>
              <div className={cn('items-footer-wrapper')}>
                <Link
                  to={`/profile/${user.id}/lk`}
                  size="s"
                  text={__t('bucket.backToShop')}
                />

                <div className={cn('items-footer-payment')}>
                  <span className={cn('items-footer-total')}>
                    <span className={cn('items-footer-total-title')}>
                      {__t('bucket.totalPrice')}
                    </span>

                    <Price
                      price={totalPrice}
                      className={cn('items-footer-total-price')}
                      priceTemplate={USD_PRICE_TEMPLATE}
                    />
                  </span>

                  <Button
                    text={__t('bucket.pay')}
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
  isFetching: state.AdvBucket.isFetching,
  user: state.Auth.me
});

export default connect(mapStateToProps, {
  ...actions, loadBucket, removeFromBucket
})(ProfileRaiseAds);

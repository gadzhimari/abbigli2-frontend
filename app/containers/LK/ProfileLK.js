import { connect } from 'react-redux';

import { React, Component, cn } from '../../components-lib/__base';
import { Button, Spin, Link, Tabs, Tab } from '../../components-lib';
import { Card } from '../../components-lib/Cards';
import Image from '../../components/Image';

import ProfileBanners from '../Profile/components/ProfileBanners';

import IconPlus from '../../icons/plus';
import IconElevation from '../../icons/elevation';
import IconArchive from '../../icons/archive';
import IconClose from '../../icons/close';

import * as actions from '../../ducks/ProfilePosts/actions';
import setLike from '../../ducks/Like/actions';


import { __t } from './../../i18n/translator';

import './Profile.less';

@cn('Profile')
class ProfileLK extends Component {
  state = {
    activeTab: 0,
  }

  handleTabChange = (e) => {
    e.preventDefault();

    this.setState({
      activeTab: e.currentTarget.id,
    });
  }

  renderTabs(cn) {
    const { id } = this.props.me;
    const tabs = [
      {
        url: `/profile/${id}/lk`,
        title: __t('Items'),
      },
      {
        url: `/profile/${id}/active`,
        title: __t('Active'),
      },
      {
        url: `/profile/${id}/archive`,
        title: __t('Archive')
      },
    ];

    return (
      <Tabs
        value={this.state.activeTab}
        onChange={this.handleTabChange}
        className={cn('tabs')}
      >
        {
          tabs.map((tab, index) =>
            <Tab
              key={index}
              to={tab.url}
              text={tab.title}
              id={index}
            />
          )
        }
      </Tabs>
    );
  }

  renderToolbar(cn) {
    return (
      <div className={cn('toolbar')}>
        <div className={cn('toolbar-wrapper')}>
          <span className={cn('toolbar-caption', { selected: true })}>
            {__t('Selected')}
          </span>
          <Button
            color="danger"
            text={__t('Raise')}
            className={cn('toolbar-button')}
            icon={<IconElevation
              size="xs"
              color="white"
            />}
          />
          <Button
            view="link"
            text={__t('Archive')}
            className={cn('toolbar-button')}
            icon={<IconArchive
              size="xs"
              color="blue"
            />}
          />
          <Button
            view="link"
            text={__t('Delete')}
            className={cn('toolbar-button')}
            icon={<IconClose
              size="xs"
              color="blue"
            />}
          />
        </div>
      </div>
    );
  }

  renderNoResultsPage(cn) {
    /* TODO Заменить на новое апи. Показ картинки при отсутствии
    продуктов при просмотре карточек в чужом профиле */

    return (
      <div className={cn('no-results')}>
        <h1 className={cn('no-results-title')}>
          {__t('There are currently no posts on this page')}
        </h1>
        <div className={cn('no-results-image-wrapper')}>
          <Image
            className={cn('no-results-image')}
            src={'/images/pages/no-results/bg.png'}
          />
        </div>
      </div>
    );
  }

  renderCards() {
    const {
      me,
      isMe,
      isAuth,
      itemsPosts,
      priceTemplate,
      deletePost,
      setLike,
    } = this.props;

    return (
      itemsPosts.map(item => (
        <Card
          data={item}
          key={item.slug}
          me={me}
          setLike={setLike}
          priceTemplate={priceTemplate}
          isAuthenticated={isAuth}
          delete={deletePost}
          isMe={isMe}
          canEdit={isMe}
          view={2}
          showLike={false}
          showAvatar={false}
          showShare
          showStats
          showActivationPeriod
          showMoreButton
          showCheckbox
          showMessages
          showRaiseButton
        />
      ))
    );
  }

  renderLoader() {
    const { isFetchingPosts } = this.props;

    return (
      <div className="spin-wrapper">
        <Spin visible={isFetchingPosts} />
      </div>
    );
  }

  renderPublications(cn) {
    const {
      me,
      isMe,
      isAuth,
      itemsPosts,
      priceTemplate,
      deletePost,
      setLike,
    } = this.props;

    return (
      <div className={cn('publications-wrapper')}>
        <h2 className={cn('publications-title')}>
          {
            isMe ?
            __t('My publications in other sections') :
            __t('You can view the author\'s publications in other sections')
          }
        </h2>
        <div className={cn('publications')}>
          {
            itemsPosts.map(item => (
              <Card
                data={item}
                key={item.slug}
                me={me}
                setLike={setLike}
                priceTemplate={priceTemplate}
                isAuthenticated={isAuth}
                isMe={isMe}
                view={4}
                showLike={false}
                showShare
                showAvatar={false}
                showDeleteButton={false}
              />
            ))
          }
        </div>
      </div>
    );
  }

  render(cn) {
    const {
      isFetchingPosts,
      itemsPosts,
      isMe,
    } = this.props;

    const hasProductsForAuthorized = (!isFetchingPosts && itemsPosts.length ===
      0) && isMe;
    const hasProductsForUnathorized = (!isFetchingPosts && itemsPosts.length === 0) && !isMe;

    return (
      <div className={cn('content', { 'no-padding': hasProductsForUnathorized })}>
        { isMe && this.renderTabs(cn) }
        { isMe && this.renderToolbar(cn) }

        <div className={cn('products')}>
          <div className={cn('cards', { row: hasProductsForAuthorized })}>
            {isMe &&
              <div className="Card Card_type_attach">
                <Link
                  className="Card__button Card__button_attach"
                  onClick={this.onCreateLinkClick}
                  to="/post/new"
                  text={__t('add.on.abbigli')}
                  size="l"
                  color="black"
                  icon={<IconPlus
                    size={'s'}
                    color="white"
                  />}
                />
              </div>
            }
            {/* TODO Заменить на новое апи. Показ сообщения в своем профиле при
            * отсутствии продуктов */}
            {hasProductsForAuthorized &&
              <div className={cn('no-results-text')}>
                {
                  __t('There are no products in your store yet. It\'s time to put them out! And remember, the better the quality photo, the more chances to attract a buyer, as well as the opportunity to get to the main page of the site. (eg)')
                }
              </div>
            }
            {
              isFetchingPosts ? this.renderLoader() : this.renderCards()
            }
          </div>
          {
            isFetchingPosts ? this.renderLoader() : this.renderPublications(cn)
          }
          { hasProductsForUnathorized && this.renderNoResultsPage(cn) }
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

export default connect(mapStateToProps, { ...actions, setLike })(ProfileLK);

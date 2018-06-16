import { React, PureComponent, cn, connect } from '../../../components-lib/__base';

import getProps from './getProps';

import { Button, Spin, Link } from '../../../components-lib';
import { Card } from '../../../components-lib/Cards';
import Image from '../../../components/Image';

import IconPlus from '../../../icons/plus';
import IconElevation from '../../../icons/elevation';
import IconArchive from '../../../icons/archive';
import IconClose from '../../../icons/close';

import pages from '../../../lib/pages';

import * as bucketActions from '../../../ducks/AdvBucket/actions';

import { __t } from '../../../i18n/translator';

@cn('Profile')
class ShopPage extends PureComponent {
  componentDidMount() {
    this.fetchPosts();
  }

  handleRaising = () => {
    const { router } = this.props;
    console.log('async creating bucket. TODO!');

    router.push({
      pathname: pages.RAISE_ADS_PAGE.path
    });
  }

  fetchPosts = (page = 1) => {
    const { isMe, params, loadPosts } = this.props;

    loadPosts({
      isMe,
      profileId: params.profile,
      type: 'posts',
      page,
    });
  }

  renderToolbar(cn) {
    const { bucketPostsIds } = this.props;
    const selectedCount = bucketPostsIds.length;

    return (
      <div className={cn('toolbar')}>
        <div className={cn('toolbar-wrapper')}>
          <span className={cn('toolbar-caption', { selected: true })}>
            {__t('Selected', { count: selectedCount })}
          </span>

          <Button
            color="danger"
            text={__t('Raise')}
            className={cn('toolbar-button')}
            disabled={!selectedCount}
            onClick={this.handleRaising}
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

  renderLoader() {
    const { isFetchingPosts } = this.props;

    return (
      <div className="spin-wrapper">
        <Spin visible={isFetchingPosts} />
      </div>
    );
  }

  renderCards() {
    const { itemsPosts, bucketPostsIds } = this.props;
    const cardProps = getProps.propsForPostsCards(this);

    return (
      itemsPosts.map(item => (
        <Card
          data={item}
          key={item.slug}
          checked={bucketPostsIds.includes(item.id)}

          {...cardProps}
        />
      ))
    );
  }

  render(cn) {
    const { isFetchingPosts, itemsPosts, isMe } = this.props;

    const hasProductsForAuthorized = (!isFetchingPosts && itemsPosts.length === 0) && isMe;
    const hasProductsForUnathorized = (!isFetchingPosts && itemsPosts.length === 0) && !isMe;

    return (
      <div className={cn('products')}>
        {isMe && this.renderToolbar(cn)}

        <div className={cn('cards', { row: hasProductsForAuthorized })}>
          {isMe && !isFetchingPosts &&
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
              {__t('There are no products in your store yet. It\'s time to put them out! And remember, the better the quality photo, the more chances to attract a buyer, as well as the opportunity to get to the main page of the site. (eg)')}
            </div>
          }
          {
            isFetchingPosts ? this.renderLoader() : this.renderCards()
          }
        </div>
        {hasProductsForUnathorized && this.renderNoResultsPage(cn)}
      </div>
    );
  }
}

const mapStateToProps = ({ AdvBucket }) => ({
  bucketPostsIds: AdvBucket.postsIds,
  bucketPosts: AdvBucket.posts
});

export default connect(mapStateToProps, bucketActions)(ShopPage);

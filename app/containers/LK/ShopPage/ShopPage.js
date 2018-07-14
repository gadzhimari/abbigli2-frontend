import { React, PureComponent, cn, connect } from '../../../components-lib/__base';

import getProps from './getProps';

import { Button, Spin, Icon } from '../../../components-lib';
import { Product } from '../../../components-lib/Cards';
import Image from '../../../components/Image';
import Attach from '../../Profile/components/Attach';

import pages from '../../../lib/pages';
import { PRODUCT_TYPE } from '../../../lib/constants/posts-types';

import { selectPost, unselectPost, clearSelectedPosts } from '../../../ducks/Profile/actions';

import { __t } from '../../../i18n/translator';
import { batchAddToBucket } from '../../../ducks/AdvBucket/actions/addToBucket';

@cn('Profile')
class ShopPage extends PureComponent {
  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = (page = 1) => {
    const { params, loadPosts } = this.props;

    loadPosts({
      author: params.profile,
      page,
    }, PRODUCT_TYPE);
  }

  raiseBatchPosts = () => {
    const { router, batchAddToBucket, selectedPostsSlugs, clearSelectedPosts } = this.props;

    batchAddToBucket(selectedPostsSlugs)
      .then(() => router.push({ pathname: `/${pages.RAISE_ADS_PAGE.path}` }));

    clearSelectedPosts();
  }

  deleteBatchPosts = () => {
    const { selectedPostsSlugs, deleteBatchPosts, clearSelectedPosts } = this.props;
    deleteBatchPosts(selectedPostsSlugs, PRODUCT_TYPE, clearSelectedPosts);
  }

  addToArchiveBatchPosts = () => {
    const { selectedPostsSlugs, batchAddToArchive, clearSelectedPosts } = this.props;
    batchAddToArchive(selectedPostsSlugs);
    clearSelectedPosts();
  }

  renderToolbar(cn) {
    const { selectedPostsSlugs, isCreatingBucket } = this.props;
    const selectedCount = selectedPostsSlugs.length;

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
            onClick={this.raiseBatchPosts}
            isFetching={isCreatingBucket}
            icon={<Icon
              glyph="elevation"
              size="xs"
              color="white"
            />}
          />

          <Button
            view="link"
            text={__t('common.addToArchive')}
            className={cn('toolbar-button')}
            disabled={!selectedCount}
            onClick={this.addToArchiveBatchPosts}
            icon={<Icon
              glyph="archive"
              size="xs"
              color="blue"
            />}
          />

          <Button
            view="link"
            text={__t('common.delete')}
            className={cn('toolbar-button')}
            disabled={!selectedCount}
            onClick={this.deleteBatchPosts}
            icon={<Icon
              glyph="close"
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
              <Product
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
    const { itemsPosts, selectedPostsSlugs } = this.props;
    const cardProps = getProps.propsForPostsCards(this);

    return (
      itemsPosts.map(item => (
        <Product
          data={item}
          key={item.slug}
          checked={selectedPostsSlugs.includes(item.slug)}

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
            <Attach
              isVisible={isMe}
              url="/post/new"
            />
          }

          {hasProductsForAuthorized &&
            <div className={cn('no-results-text')}>
              {__t('There are no products in your store yet. It\'s time to put them out! And remember, the better the quality photo, the more chances to attract a buyer, as well as the opportunity to get to the main page of the site. (eg)')}
            </div>
          }

          {isFetchingPosts ? this.renderLoader() : this.renderCards()}
        </div>

        {hasProductsForUnathorized && this.renderNoResultsPage(cn)}
      </div>
    );
  }
}

const mapStateToProps = ({ Profile, AdvBucket }) => ({
  selectedPostsSlugs: Profile.selectedPostsSlugs,
  selectedPosts: Profile.selectedPosts,
  isCreatingBucket: AdvBucket.isCreating
});

export default connect(mapStateToProps, {
  selectPost,
  unselectPost,
  clearSelectedPosts,
  batchAddToBucket
})(ShopPage);

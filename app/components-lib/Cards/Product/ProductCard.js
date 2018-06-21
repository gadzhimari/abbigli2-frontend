import { connect } from 'react-redux';

import { React, PureComponent, Type, cn } from '../../__base';

import Image from '../../../components/Image';
import Avatar from '../../../components/Avatar';
import { Share } from '../../../components';
import { Button, Checkbox, Like, Link, Price, Icon } from '../../../components-lib';

import getImageUrl from '../../../lib/getImageUrl';
import getUserName from '../../../lib/getUserName';
import createProfileLink from '../../../lib/links/profile-link';
import createPostLink from '../../../lib/links/post-link';
import toLocaleDateString from '../../../lib/date/toLocaleDateString';
import { PRODUCT_TYPE } from '../../../lib/constants/posts-types';
import createPostEditLink from '../../../lib/links/edit-post-link';

import { CARD_DATE_SHORT_FORMAT } from '../../../lib/date/formats';
import { __t } from '../../../i18n/translator';

import setLike from '../../../ducks/Like/actions';
import '../Card.less';

const avatar = {
  sizes: {
    1: {
      size: 's',
      ratio: '25x25',
    },
    2: {
      size: 's',
      ratio: '25x25',
    },
    3: {
      size: 'm',
      ratio: '36x36',
    },
  },
  bordered: {
    1: false,
    2: false,
    3: false,
  }
};

@cn('Card')
class ProductCard extends PureComponent {
  static propTypes = {
    data: Type.shape({
      title: Type.string,
      slug: Type.string,
      price: Type.string,
      user: Type.object,
      images: Type.array,
    }).isRequired,
    view: Type.number,
    isMe: Type.bool,
    canEdit: Type.bool,
    showLike: Type.bool,
    showShare: Type.bool,
    showStats: Type.bool,
    showAvatar: Type.bool,
    showActivationPeriod: Type.bool,
    showDeleteButton: Type.bool,
    showMoreButton: Type.bool,
    showMessages: Type.bool,
    showCheckbox: Type.bool,
    showRaiseButton: Type.bool,
  };

  static defaultProps = {
    view: 1,
    isMe: false,
    canEdit: false,
    showLike: true,
    showShare: false,
    showStats: false,
    showAvatar: true,
    showActivationPeriod: false,
    showDeleteButton: true,
    showMoreButton: false,
    showMessages: false,
    showCheckbox: false,
    showRaiseButton: false,
  };

  handleDelete = () => {
    const { slug } = this.props.data;
    this.props.delete(slug, PRODUCT_TYPE);
  }

  handleCheckboxChange = (e, checked) => {
    const { selectPost, unselectPost, data } = this.props;

    if (checked) {
      selectPost(data);
    } else {
      unselectPost(data.id);
    }
  }

  renderTitle(cn, postUrl) {
    const { title } = this.props.data;

    return (
      <Link
        className={cn('title', { weight: 'bold' })}
        to={postUrl}
        text={title}
        color="black"
        title={title}
        icon={<Icon glyph="bag" size="s" color="blue" />}
      />
    );
  }

  renderAvatar(cn) {
    const { view, showAvatar, data } = this.props;
    const { author } = data;
    const { size, ratio } = avatar.sizes[view];

    const name = getUserName(data);
    const authorUrl = createProfileLink(author);

    return (
      showAvatar &&
      <Link
        className={cn('user')}
        to={authorUrl}
        text={name}
        title={name}
        color="gray-600"
        icon={
          <Avatar
            className={cn('avatar', { bordered: avatar.bordered[view], size })}
            imgClassName="avatar__img"
            avatar={author.avatar}
            thumbSize={ratio}
            alt={name}
          />
        }
      />
    );
  }

  renderStats(cn) {
    return (
      <div className={cn('stats')}>
        <span className={cn('stats-meta')}>
          <span className={cn('like-count')}>
            <Icon glyph="eye2" size="xs" color="gray-400" />

            {this.props.data.favorites_num}
          </span>

          <span className={cn('view-count')}>
            <Icon glyph="heart" size="xs" color="gray-400" />

            {this.props.data.likes_num}
          </span>
        </span>
      </div>
    );
  }

  render(cn) {
    const {
      data,
      setLike,
      showLike,
      showShare,
      showStats,
      showAvatar,
      showActivationPeriod,
      showDeleteButton,
      showMoreButton,
      showRaiseButton,
      showCheckbox,
      showMessages,
      view,
      canEdit,
      isMe,
      isTouch,
      checked
    } = this.props;

    const {
      is_favorite: isFavorite,
      title,
      slug,
      created,
      price,
    } = data;

    const type = PRODUCT_TYPE;
    const imageUrl = getImageUrl(data);
    const postUrl = createPostLink(data, type);
    const postEditingUrl = createPostEditLink(data, type);

    const mods = { view, type, ownerCard: isMe };

    return (
      <div className={cn(mods)}>
        {view === 3 &&
          <div className={cn('wrapper')}>
            <div className={cn('header', { align: 'vertical' })}>
              {
                showAvatar && this.renderAvatar(cn)
              }
              <div className={cn('date', { short: true })}>
                {toLocaleDateString(created, CARD_DATE_SHORT_FORMAT)}
              </div>
            </div>
          </div>
        }
        <div className={cn('img-wrapper')}>
          <Link to={postUrl}>
            <Image
              className={cn('img')}
              alt={title}
              thumbSize="360x250"
              src={imageUrl}
            />
          </Link>
          <div className={cn('actions', { align: 'top-left' })}>
            {showCheckbox &&
              <Checkbox
                view="fab"
                size="xxl"
                className={cn('checkbox')}
                aria-label={__t('Check')}

                onChange={this.handleCheckboxChange}
                checked={checked}
              />
            }
            {showShare &&
              <span className="share Card__share">
                <Button
                  view="fab"
                  className={cn('button', { share: true, hide: !isTouch })}
                  aria-label={__t('Share')}
                  icon={<Icon glyph="share" size="xs" color="gray-400" />}
                />
                <div className="dropdown">
                  <div className="dropdown-corner" />
                  <Share
                    postLink={createPostLink(this.props.data)}
                    buttonClass="social-btn"
                    media={imageUrl}
                    description={title}
                  />
                </div>
              </span>
            }
            { showRaiseButton &&
              <div className={cn('spacer')}>
                <Button
                  view="fab"
                  className={cn('button', { raise: true })}
                  aria-label={__t('Raise')}
                  icon={<Icon glyph="elevation" size="xs" color="red" />}
                />

                <div className="dropdown">
                  <div className="dropdown-corner" />
                  <Share
                    postLink={postUrl}
                    buttonClass="social-btn"
                    media={imageUrl}
                    description={title}
                  />
                </div>
              </div>
            }
          </div>
          <div className={cn('actions', { align: 'top-right' })}>
            { showLike &&
              <Like
                liked={isFavorite}
                onClick={setLike}
                slug={slug}
                type={type}
                className={cn('button', { like: true, hide: !isTouch })}
              />
            }
            { canEdit && !showMoreButton &&
              <Link
                to={postEditingUrl}
                view="fab"
                className={cn('button', { edit: true })}
                aria-label={__t('Edit')}
                icon={<Icon glyph="pencil" size="xs" color="gray-400" />}
              />
            }
            { isMe && showDeleteButton && !showMoreButton &&
              <Button
                onClick={this.handleDelete}
                view="fab"
                className={cn('button', { delete: true })}
                aria-label={__t('Delete')}
                icon={<Icon glyph="close" size="xs" color="gray-400" />}
              />
            }
            { isMe && showMoreButton &&
              <span className="share">
                <Button
                  view="fab"
                  className={cn('dropdown-item')}
                  aria-label={__t('Show more')}
                  icon={<Icon glyph="more" size="xs" color="gray-400" />}
                />
                <div className="dropdown">
                  <div className="dropdown-corner" />
                  <Button
                    view="link"
                    className={cn('dropdown-item')}
                    text={__t('Delete')}
                    color="gray-400"
                    onClick={this.handleDelete}
                    icon={<Icon glyph="close" size="xs" color="gray-400" />}
                  />
                  { canEdit &&
                    <Link
                      to="#"
                      className={cn('dropdown-item')}
                      text={__t('Edit')}
                      color="gray-400"
                      icon={<Icon glyph="pencil" size="xs" color="gray-400" />}
                    />
                  }
                  <Link
                    to="#"
                    className={cn('dropdown-item')}
                    text={__t('Archive')}
                    color="gray-400"
                    icon={<Icon glyph="archive" size="xs" color="gray-400" />}
                  />
                </div>
              </span>
            }
          </div>
          <div className={cn('actions', { align: 'bottom-right' })}>
            { showMessages &&
              <Button
                className={cn('button', { messages: true })}
                text={2}
                icon={<Icon glyph="mail" size="xs" color="white" />}
              />
            }
          </div>
        </div>
        <div className={cn('wrapper')}>
          <div className={cn('body')}>
            { view !== 3 && this.renderTitle(cn, postUrl) }
            {/* TODO Заменить на новое апи  */}
            { showActivationPeriod &&
              <div className={cn('activation-period')}>
                {__t('From')}:{' '}
                <span className={cn('activation-period-start')}>
                  сегодня
                </span>
                {__t('To')}:{' '}
                <span className={cn('activation-period-end')}>
                  10 марта
                </span>
              </div>
            }
          </div>
          <div className={cn('footer', { align: 'vertical' })}>
            <div className={cn('footer-col', { left: true })}>
              { view !== 3 && showAvatar && this.renderAvatar(cn) }
              { view === 3 && this.renderTitle(cn, postUrl) }
              { isMe && showStats && this.renderStats(cn) }
            </div>
            <div className={cn('footer-col', { right: true })}>
              <Price className={cn('price')} price={price} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ isTouch }) => ({ isTouch }), { setLike })(ProductCard);

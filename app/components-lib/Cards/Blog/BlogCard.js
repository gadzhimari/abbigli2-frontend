import { connect } from 'react-redux';

import { React, PureComponent, Type, cn } from '../../__base';

import Image from '../../../components/Image';
import Avatar from '../../../components/Avatar';
import { Share } from '../../../components';
import { Button, Like, Link } from '../../../components-lib';
import IconBlog from '../../../icons/blog';
import IconClose from '../../../icons/close';
import IconComment from '../../../icons/comment';
import IconShare from '../../../icons/share';
import IconPencil from '../../../icons/pencil';

import getUserName from '../../../lib/getUserName';
import getImageUrl from '../../../lib/getImageUrl';
import createProfileLink from '../../../lib/links/profile-link';
import createPostLink from '../../../lib/links/post-link';
import toLocaleDateString from '../../../lib/date/toLocaleDateString';
import { BLOG_TYPE } from '../../../lib/constants/posts-types';
import createPostEditLink from '../../../lib/links/edit-post-link';

import {
  MESSAGE_DATE_FORMAT,
  CARD_DATE_SHORT_FORMAT,
} from '../../../lib/date/formats';
import { __t } from '../../../i18n/translator';

import setLike from '../../../ducks/Like/actions';
import '../Card.less';

const avatar = {
  sizes: {
    1: {
      size: 'm',
      ratio: '36x36',
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
  position: {
    1: 'float'
  },
  align: {
    1: 'center',
  },
  block: {
    1: true,
  },
  bordered: {
    1: true,
    2: false,
    3: false,
  }
};

const titleText = {
  align: {
    1: 'center',
  },
};

@cn('Card')
class BlogCard extends PureComponent {
  static propTypes = {
    data: Type.shape({
      title: Type.string,
      slug: Type.string,
      user: Type.object,
      image: Type.string,
    }).isRequired,
    view: Type.number,
    isMe: Type.bool,
    canEdit: Type.bool,
    showLike: Type.bool,
    showShare: Type.bool,
    showAvatar: Type.bool,
    showDeleteButton: Type.bool,
  };

  static defaultProps = {
    view: 1,
    isMe: false,
    canEdit: false,
    showLike: true,
    showShare: false,
    showAvatar: true,
    showDeleteButton: true,
  };

  handleDelete = () => {
    const { slug } = this.props.data;
    this.props.delete(slug, BLOG_TYPE);
  }

  renderAvatar(cn) {
    const { view, showAvatar, data } = this.props;
    const { author } = data;

    const name = getUserName(data);

    const avatarPos = avatar.position[view] || '';
    const { size, ratio } = avatar.sizes[view];

    return showAvatar && (
      <Link
        className={cn('user', { block: avatar.block[view], align: avatar.align[view], position: avatarPos })}
        to={createProfileLink(author)}
        color="gray-600"
        text={name}
        title={name}
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

  renderTitle(cn, postUrl) {
    const { view } = this.props;
    const { title } = this.props.data;

    return (
      <Link
        className={cn('title', { align: titleText.align[view], weight: 'bold' })}
        to={postUrl}
        text={title}
        title={title}
        color="black"
        icon={<IconBlog
          size="s"
          color="green"
        />}
      />
    );
  }

  render(cn) {
    const {
      data,
      setLike,
      showLike,
      showShare,
      showDeleteButton,
      showAvatar,
      view,
      isMe,
      canEdit,
      isTouch
    } = this.props;

    const {
      title,
      is_favorite: isFavorite,
      slug,
      created,
      comments_num: commentsCount,
      preview
    } = data;

    const type = BLOG_TYPE;
    const imageUrl = getImageUrl(data);
    const postUrl = createPostLink(data, type);
    const postEditingUrl = createPostEditLink(data, type);

    const mods = { type, view };

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
          <Link
            to={postUrl}
          >
            <Image
              className={cn('img')}
              alt={title}
              thumbSize="360x250"
              src={imageUrl}
            />
          </Link>

          <div className={cn('actions', { align: 'top-left' })}>
            { showShare &&
              <div className="share">
                <Button
                  view="fab"
                  className={cn('button', { share: true, hide: !isTouch })}
                  aria-label={__t('Share')}
                  icon={<IconShare
                    size="xs"
                    color="gray-400"
                  />}
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
            {showLike &&
              <Like
                liked={isFavorite}
                onClick={setLike}
                slug={slug}
                type={type}
                className={cn('button', { like: true, hide: !isTouch })}
              />
            }
            { canEdit &&
              <Link
                to={postEditingUrl}
                view="fab"
                className={cn('button', { edit: true })}
                aria-label={__t('Edit')}
                icon={<IconPencil
                  size="xs"
                  color="gray-400"
                />}
              />
            }
            { isMe && showDeleteButton &&
              <Button
                onClick={this.handleDelete}
                view="fab"
                className={cn('button', { delete: true })}
                aria-label={__t('common.delete')}
                icon={<IconClose
                  size="xs"
                  color="gray-400"
                />}
              />
            }
          </div>
        </div>
        <div className={cn('wrapper')}>
          <div className={cn('body')}>
            {/* TODO Заменить на новое апи  */}
            { view === 4 &&
              <Link
                className={cn('category')}
                text="Блоги"
                size="s"
                color="green"
              />
            }
            { view === 1 && showAvatar && this.renderAvatar(cn) }
            { view !== 3 && this.renderTitle(cn, postUrl) }
            { view === 1 &&
              <div
                className={cn('text')}
                dangerouslySetInnerHTML={{ __html: preview }}
              />
            }
          </div>

          <div className={cn('footer', { align: 'vertical' })}>
            <div className={cn('footer-col', { left: true })}>
              { view === 1 &&
                <div className={cn('date')}>
                  {toLocaleDateString(created, MESSAGE_DATE_FORMAT)}
                </div>
              }
              { view === 2 && showAvatar && this.renderAvatar(cn) }
            </div>
            <div className={cn('footer-col', { right: true })}>
              { view === 3 && this.renderTitle(cn, postUrl) }
              <div className={cn('comments')}>
                <IconComment size="xs" className={cn('comments-icon')} />
                <span className={cn('comments-count')}>
                  {commentsCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ isTouch }) => ({ isTouch }), { setLike })(BlogCard);

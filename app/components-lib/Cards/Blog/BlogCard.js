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
import { POST_PATH_BY_TYPE } from '../../../lib/constants/posts-types';
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
      price: Type.number,
      user: Type.object,
      images: Type.array,
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
    this.props.delete(slug);
  }

  renderAvatar(cn) {
    const { view, isMe } = this.props;
    const { user } = this.props.data;
    const name = getUserName(user);
    const avatarPos = avatar.position[view] || '';
    const { size, ratio } = avatar.sizes[view];

    return (
      !isMe &&
      <Link
        className={cn('user', { block: avatar.block[view], align: avatar.align[view], position: avatarPos })}
        to={createProfileLink(user)}
        color="gray-600"
        text={name}
        title={name}
        icon={
          <Avatar
            className={cn('avatar', { bordered: avatar.bordered[view], size })}
            imgClassName="avatar__img"
            avatar={user.avatar}
            thumbSize={ratio}
            alt={name}
          />
        }
      />
    );
  }

  renderTitle(cn) {
    const { view } = this.props;
    const { title } = this.props.data;

    return (
      <Link
        className={cn('title', { align: titleText.align[view], weight: 'bold' })}
        to={createPostLink(this.props.data)}
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
      user,
      liked,
      title,
      type,
      slug,
      created,
      seo_description,
      comments_num: commentsCount,
    } = this.props.data;
    const imageUrl = getImageUrl(this.props.data);

    return (
      <div className={cn({ type: POST_PATH_BY_TYPE[type], view })}>
        { view === 3 &&
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
            to={createPostLink(this.props.data)}
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
                    postLink={createPostLink(this.props.data)}
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
                liked={liked}
                onClick={setLike}
                slug={slug}
                className={cn('button', { like: true, hide: !isTouch })}
              />
            }
            { canEdit &&
              <Link
                to={createPostEditLink({ id: user.id, slug })}
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
                aria-label={__t('Delete')}
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
            { view !== 3 && this.renderTitle(cn) }
            { view === 1 &&
              <div
                className={cn('text')}
                dangerouslySetInnerHTML={{ __html: seo_description }}
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
              { view === 3 && this.renderTitle(cn) }
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

const mapStateToProps = state => ({
  isAuth: state.Auth.isAuthenticated,
  isTouch: state.isTouch,
});

export default connect(mapStateToProps, { setLike })(BlogCard);

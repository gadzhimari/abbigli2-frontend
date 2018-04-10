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
  };

  static defaultProps = {
    view: 1,
    isMe: false,
    canEdit: false,
  };

  handleDelete = () => {
    const { slug } = this.props.data;
    this.props.delete(slug);
  }

  renderAvatar(cn) {
    const { view, isMe } = this.props;
    const { user } = this.props.data;
    const name = user.profile_name ? user.profile_name : `ID: ${user.id}`;
    const avatarPos = avatar.position[view] || '';
    const { size, ratio } = avatar.sizes[view];

    return (
      isMe ?
        <div /> :
        <Link
          className={cn('user', { block: avatar.block[view], align: avatar.align[view], position: avatarPos })}
          to={createProfileLink(user)}
          text={name}
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
        color="blog"
        icon={<IconBlog
          size={'s'}
        />}
      />
    );
  }

  render(cn) {
    const { setLike, view, isMe, canEdit, deleteFromFavorite } = this.props;
    const {
      user,
      images,
      liked,
      title,
      type,
      slug,
      created,
      seo_description,
      comments_num: commentsCount,
    } = this.props.data;
    const imageUrl = images && images[0] && images[0].file;

    return (
      <div className={cn({ type: POST_PATH_BY_TYPE[type], view })}>
        { view === 3 &&
          <div className={cn('wrapper')}>
            <div className={cn('header', { align: 'vertical' })}>
              {
                this.renderAvatar(cn)
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
            <div className="share">
              <Button
                size={'s'}
                view="fab"
                color="outline"
                className={cn('button', { share: true })}
                label={__t('Share')}
                icon={<IconShare
                  size={'xs'}
                />}
              />
              <div className="dropdown-corner" />
              <div className="dropdown">
                <Share
                  postLink={createPostLink(this.props.data)}
                  buttonClass="social-btn"
                  media={imageUrl}
                  description={title}
                />
              </div>
            </div>
          </div>
          <div className={cn('actions', { align: 'top-right' })}>
            { isMe &&
              <Button
                size={'s'}
                onClick={this.handleDelete}
                view="fab"
                color="outline"
                className={cn('button', { delete: true })}
                label={__t('Delete')}
                icon={<IconClose
                  size={'xs'}
                />}
              />}
            <Like
              liked={liked}
              onClick={setLike}
              slug={slug}
              className={cn('button', { like: true })}
            />
          </div>
          <div className={cn('actions', { align: 'bottom-right' })}>
            { canEdit &&
              <Link
                to={createPostEditLink({ id: user.id, slug })}
                size={'s'}
                view={'default'}
                text={__t('Edit')}
              />
            }
          </div>
          <div className={cn('actions', { align: 'bottom-right' })}>
            { isMe && deleteFromFavorite &&
              <Link
                to={createPostEditLink({ id: user.id, slug })}
                size={'s'}
                view={'default'}
                text={__t('Edit')}
              />
            }
          </div>
        </div>
        <div className={cn('wrapper')}>
          <div className={cn('body')}>
            { view === 1 && this.renderAvatar(cn) }
            { view !== 3 && this.renderTitle(cn) }
            { view === 1 &&
              <div
                className={cn('text')}
                dangerouslySetInnerHTML={{ __html: seo_description }}
              />
            }
          </div>
          <div className={cn('footer', { align: 'vertical' })}>
            { view === 1 &&
              <div className={cn('date')}>
                {toLocaleDateString(created, MESSAGE_DATE_FORMAT)}
              </div>
            }
            { view === 2 && this.renderAvatar(cn) }
            { view === 3 && this.renderTitle(cn) }
            <div className={cn('comments')}>
              <IconComment size={'xs'} className={cn('comments-icon')} />
              <span className={cn('comments-count')}>
                {commentsCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps, { setLike })(BlogCard);

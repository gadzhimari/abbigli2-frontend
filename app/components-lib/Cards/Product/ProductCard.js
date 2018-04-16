import { connect } from 'react-redux';

import { React, PureComponent, Type, cn } from '../../__base';

import Image from '../../../components/Image';
import Avatar from '../../../components/Avatar';
import { Share } from '../../../components';
import { Button, Like, Link } from '../../../components-lib';
import IconBag from '../../../icons/bag';
import IconClose from '../../../icons/close';
import IconShare from '../../../icons/share';

import getUserName from '../../../lib/getUserName';
import createProfileLink from '../../../lib/links/profile-link';
import createPostLink from '../../../lib/links/post-link';
import toLocaleDateString from '../../../lib/date/toLocaleDateString';
import { POST_PATH_BY_TYPE } from '../../../lib/constants/posts-types';
import createPostEditLink from '../../../lib/links/edit-post-link';

import {
  CARD_DATE_SHORT_FORMAT,
} from '../../../lib/date/formats';
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
      price: Type.number,
      user: Type.object,
      images: Type.array,
    }).isRequired,
    priceTemplate: Type.string.isRequired,
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

  renderTitle(cn) {
    const { title } = this.props.data;

    return (
      <Link
        className={cn('title', { weight: 'bold' })}
        to={createPostLink(this.props.data)}
        text={title}
        color="goods"
        icon={<IconBag
          size="s"
        />}
      />
    );
  }

  renderAvatar(cn) {
    const { view, isMe } = this.props;
    const { user } = this.props.data;
    const name = getUserName(user);
    const { size, ratio } = avatar.sizes[view];

    return (
      isMe ?
        <div /> :
        <Link
          className={cn('user')}
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

  render(cn) {
    const { setLike, priceTemplate, view, canEdit, isMe } = this.props;
    const {
      user,
      images,
      liked,
      title,
      type,
      slug,
      created,
      price,
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
                size="s"
                view="fab"
                color="outline"
                className={cn('button', { share: true })}
                aria-label={__t('Share')}
                icon={<IconShare
                  size="xs"
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
                size="s"
                onClick={this.handleDelete}
                view="fab"
                color="outline"
                className={cn('button', { delete: true })}
                label={__t('Delete')}
                icon={<IconClose
                  size="xs"
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
                size="s"
                view={'default'}
                text={__t('Edit')}
              />
            }
          </div>
        </div>
        <div className={cn('wrapper')}>
          <div className={cn('body')}>
            { view !== 3 && this.renderTitle(cn) }
          </div>
          <div className={cn('footer', { align: 'vertical' })}>
            { view !== 3 && this.renderAvatar(cn) }
            { view === 3 && this.renderTitle(cn) }
            <div className={cn('price')}>
              { priceTemplate && priceTemplate.replace('?', price)}
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

export default connect(mapStateToProps, { setLike })(ProductCard);

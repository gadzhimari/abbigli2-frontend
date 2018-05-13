import { connect } from 'react-redux';

import { React, PureComponent, Type, cn } from '../../__base';

import Image from '../../../components/Image';
import Avatar from '../../../components/Avatar';
import { Share } from '../../../components';
import { Button, Like, Link, Price } from '../../../components-lib';
import IconBag from '../../../icons/bag';
import IconClose from '../../../icons/close';
import IconShare from '../../../icons/share';
import IconPencil from '../../../icons/pencil';

import getImageUrl from '../../../lib/getImageUrl';
import getUserName from '../../../lib/getUserName';
import createProfileLink from '../../../lib/links/profile-link';
import createPostLink from '../../../lib/links/post-link';
import toLocaleDateString from '../../../lib/date/toLocaleDateString';
import { PRODUCT_TYPE } from '../../../lib/constants/posts-types';
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
      price: Type.string,
      user: Type.object,
      images: Type.array,
    }).isRequired,
    view: Type.number,
    isMe: Type.bool,
    canEdit: Type.bool,
    showLike: Type.bool,
    showShare: Type.bool,
    showAvatar: Type.bool,
  };

  static defaultProps = {
    view: 1,
    isMe: false,
    canEdit: false,
    showLike: true,
    showShare: false,
    showAvatar: true,
  };

  handleDelete = () => {
    const { slug } = this.props.data;
    this.props.delete(slug, PRODUCT_TYPE);
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
        icon={<IconBag
          size="s"
          color="blue"
        />}
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

  render(cn) {
    const { data, setLike, showLike, showShare, view, canEdit, isMe, isTouch } = this.props;
    const {
      liked,
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
            { showLike &&
              <Like
                liked={liked}
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
            { isMe &&
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
            {view !== 3 && this.renderTitle(cn, postUrl)}
          </div>
          <div className={cn('footer', { align: 'vertical' })}>
            { view !== 3 && this.renderAvatar(cn) }
            {view === 3 && this.renderTitle(cn, postUrl)}
            <Price className={cn('price')} price={price} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ isTouch }) => ({ isTouch }), { setLike })(ProductCard);

import { connect } from 'react-redux';

import { React, PureComponent, Type, cn } from '../../__base';

import Image from '../../../components/Image';
import Avatar from '../../../components/Avatar';
import { Share } from '../../../components';
import { Button, Like, Link } from '../../../components-lib';
import IconEvent from '../../../icons/event';
import IconClose from '../../../icons/close';
import IconShare from '../../../icons/share';

import getImageUrl from '../../../lib/getImageUrl';
import getUserName from '../../../lib/getUserName';
import createPostLink from '../../../lib/links/post-link';
import createProfileLink from '../../../lib/links/profile-link';
import toLocaleDateString from '../../../lib/date/toLocaleDateString';
import { POST_PATH_BY_TYPE } from '../../../lib/constants/posts-types';
import createPostEditLink from '../../../lib/links/edit-post-link';
import {
  EVENT_DATE_FORMAT,
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
  bordered: {
    1: false,
    2: false,
    3: false,
  }
};

const titleText = {
  align: {
    1: 'center',
  },
};

const eventInfo = {
  align: {
    1: 'center',
    2: 'left',
  }
};

const dateRangeText = {
  weight: {
    1: 'bold',
  },
  marginLeft: {
    1: false,
    2: true,
    3: true,
  }
};

@cn('Card')
class EventCard extends PureComponent {
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
  };

  static defaultProps = {
    view: 1,
    isMe: false,
    canEdit: false,
    showLike: true,
    showShare: false,
  };

  handleDelete = () => {
    const { slug } = this.props.data;
    this.props.delete(slug);
  }

  renderTitle(cn) {
    const { view } = this.props;
    const { title } = this.props.data;

    return (
      <Link
        className={cn('title', { align: titleText.align[view], weight: 'bold' })}
        to={createPostLink(this.props.data)}
        text={title}
        color="black"
        icon={<IconEvent
          size="s"
          color="pink"
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
          color="gray-600"
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
    const { setLike, showLike, showShare, view, canEdit, isMe } = this.props;
    const {
      user,
      liked,
      title,
      type,
      slug,
      created,
      seo_description,
      city,
      date_start: dateStart,
      date_end: dateEnd,
    } = this.props.data;
    const imageUrl = getImageUrl(this.props.data);

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
            {
              showShare &&
              <div className="share">
                <Button
                  view="fab"
                  className={cn('button', { share: true })}
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
                className={cn('button', { like: true })}
              />
            }
            { isMe &&
              <Button
                onClick={this.handleDelete}
                view="fab"
                className={cn('button', { delete: true })}
                label={__t('Delete')}
                icon={<IconClose
                  size="xs"
                  color="gray-400"
                />}
              />
            }
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
            { this.renderTitle(cn) }
            { view === 1 &&
              <div
                className={cn('text')}
                dangerouslySetInnerHTML={{ __html: seo_description }}
              />
            }
          </div>
          <div className={cn('footer', { direction: 'column' })}>
            <div className={cn('event-info', { align: eventInfo.align[view] })}>
              <div
                className={cn('date-range', { weight: dateRangeText.weight[view], 'has-margin': dateRangeText.marginLeft[view] })}
              >
                { toLocaleDateString(dateStart, EVENT_DATE_FORMAT) }
                { dateEnd ? ` - ${toLocaleDateString(dateEnd, EVENT_DATE_FORMAT)}` : ''}
              </div>
              <div className={cn('city')}>
                {city && city.name}
              </div>
            </div>
            { view !== 3 && this.renderAvatar(cn) }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps, { setLike })(EventCard);

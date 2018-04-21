import { connect } from 'react-redux';

import { React, PureComponent, Type, cn } from '../../__base';

import Image from '../../../components/Image';
import Avatar from '../../../components/Avatar';
import { Share } from '../../../components';
import { Button, Like, Link } from '../../../components-lib';
import IconEvent from '../../../icons/event';
import IconClose from '../../../icons/close';
import IconShare from '../../../icons/share';
import IconPencil from '../../../icons/pencil';

import getImageUrl from '../../../lib/getImageUrl';
import getUserName from '../../../lib/getUserName';
import createPostLink from '../../../lib/links/post-link';
import createProfileLink from '../../../lib/links/profile-link';
import toLocaleDateString from '../../../lib/date/toLocaleDateString';
import { EVENT_TYPE } from '../../../lib/constants/posts-types';
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
        icon={<IconEvent
          size="s"
          color="pink"
        />}
      />
    );
  }

  renderAvatar(cn) {
    const { view, isMe, data } = this.props;
    const { author } = data;
    const name = getUserName(data);
    const { size, ratio } = avatar.sizes[view];

    return isMe || (
      <Link
        className={cn('user')}
        to={createProfileLink(author)}
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
      preview,
      city,
      date_start: dateStart,
      date_end: dateEnd,
    } = data;

    const type = EVENT_TYPE;
    const imageUrl = getImageUrl(data);
    const postUrl = createPostLink(data, type);
    const postEditUrl = createPostEditLink(data, type);

    const mods = { type, view };

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
                className={cn('button', { like: true, hide: !isTouch })}
              />
            }
            { canEdit &&
              <Link
                to={postEditUrl}
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
            {this.renderTitle(cn, postUrl)}
            {view === 1 &&
              <div
                className={cn('text')}
                dangerouslySetInnerHTML={{ __html: preview }}
              />
            }
          </div>
          <div className={cn('footer', { direction: 'column' })}>
            <div className={cn('event-info', { align: eventInfo.align[view] })}>
              <div
                className={cn('date-range', { weight: dateRangeText.weight[view], 'has-margin': dateRangeText.marginLeft[view] })}
              >
                {toLocaleDateString(dateStart, EVENT_DATE_FORMAT)}
                {dateEnd ? ` - ${toLocaleDateString(dateEnd, EVENT_DATE_FORMAT)}` : ''}
              </div>

              {city &&
                <div className={cn('city')} title={city.name}>
                  {city.name}
                </div>
              }
            </div>
            {view !== 3 && this.renderAvatar(cn)}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ isTouch }) => ({ isTouch }), { setLike })(EventCard);

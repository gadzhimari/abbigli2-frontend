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

  renderTitle(cn, postUrl) {
    const { view } = this.props;
    const { title } = this.props.data;

    return (
      <Link
        className={cn('title', { align: titleText.align[view], weight: 'bold' })}
        to={postUrl}
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
    const { view, isMe, data } = this.props;
    const { author } = data;
    const name = getUserName(data);
    const { size, ratio } = avatar.sizes[view];

    return isMe || (
      <Link
        className={cn('user')}
        to={createProfileLink(author)}
        text={name}
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
    const { setLike, view, canEdit, isMe, data } = this.props;
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
              <div className="dropdown-corner" />
              <div className="dropdown">
                <Share
                  postLink={postUrl}
                  buttonClass="social-btn"
                  media={imageUrl}
                  description={title}
                />
              </div>
            </div>
          </div>
          <div className={cn('actions', { align: 'top-right' })}>
            {isMe &&
              <Button
                onClick={this.handleDelete}
                view="fab"
                className={cn('button', { delete: true })}
                label={__t('Delete')}
                icon={<IconClose
                  size="xs"
                  color="gray-400"
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
            {canEdit &&
              <Link
                to={postEditUrl}
                size={'s'}
                view={'default'}
                text={__t('Edit')}
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
              <div className={cn('city')}>
                {city && city.name}
              </div>
            </div>
            {view !== 3 && this.renderAvatar(cn)}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), { setLike })(EventCard);

import { connect } from 'react-redux';
import { React, PureComponent, Type, cn } from '../../__base';

import Image from '../../../components/Image';
import Avatar from '../../../components/Avatar';
import { Share } from '../../../components';
import { Like, Link } from '../../../components-lib';

import IconBag from '../../../icons/bag';
import IconBlog from '../../../icons/blog';
import IconEvent from '../../../icons/event';
import IconComment from '../../../icons/comment';

import createPostLink from '../../../lib/links/post-link';
import createProfileLink from '../../../lib/links/profile-link';
import toLocaleDateString from '../../../lib/date/toLocaleDateString';
import { EVENT_DATE_FORMAT } from '../../../lib/date/formats';

import setLike from '../../../ducks/Like/actions';
import '../Card.less';

@cn('Card')
class Uni extends PureComponent {
  static propTypes = {
    item: Type.shape({
      title: Type.string,
      slug: Type.string,
      price: Type.number,
      user: Type.object,
      images: Type.array,
    }).isRequired,
    priceTemplate: Type.string,
  };

  icons = {
    1: IconBag,
    3: IconEvent,
    4: IconBlog,
  };

  colors = {
    1: 'goods',
    3: 'event',
    4: 'blog',
  }

  render(cn) {
    const { item, priceTemplate } = this.props;
    const imageUrl = item.images && item.images[0] && item.images[0].file;
    const name = item.user.profile_name ? item.user.profile_name : `ID: ${item.user.id}`;
    const Icon = this.icons[item.type];
    const color = this.colors[item.type];

    return (
      <div className={cn()}>
        <div className={cn('actions')}>
          <Like
            liked={item.liked}
            onClick={setLike}
            slug={item.slug}
            className={cn('like')}
          />

          <div className="share Card__share">
            <div className="share__icon" />
            <div className="dropdown-corner" />
            <div className="dropdown">
              <Share
                postLink={createPostLink(item)}
                buttonClass="social-btn"
                media={imageUrl}
                description={item.title}
              />
            </div>
          </div>
        </div>
        <div className={cn('img-wrapper')}>
          <Link
            to={createPostLink(item)}
          >
            <Image
              className={cn('img')}
              alt={item.title}
              thumbSize="400x300"
              src={imageUrl}
            />
          </Link>
        </div>
        <div className={cn('wrapper')}>
          <div className={cn('body')}>
            <Link
              className={cn('title', { weight: 'bold' })}
              to={createPostLink(item)}
              text={item.title}
              color={color}
              icon={<Icon
                size={'xs'}
              />}
            />
            {
              (item.type === 3)
              &&
              <div className={cn('event-info')}>
                <div className={cn('date-range')}>
                  { toLocaleDateString(item.date_start, EVENT_DATE_FORMAT) }
                  { item.date_end ? ` - ${toLocaleDateString(item.data_end, EVENT_DATE_FORMAT)}` : ''}
                </div>
                <div className={cn('city')}>
                  {item.city && item.city.name}
                </div>
              </div>
            }
          </div>
          <div className={cn('footer', { align: 'vertical' })}>
            <Link
              className={cn('user')}
              to={createProfileLink(item.user)}
              text={name}
              icon={
                <Avatar
                  className="avatar Card__avatar"
                  imgClassName="avatar__img"
                  avatar={item.user.avatar}
                  thumbSize="36x36"
                  alt={name}
                />
              }
            />
            {
              (item.type === 4)
              &&
              <div className={cn('comments')}>
                <IconComment size={'xs'} className={cn('comments-icon')} />
                <span className={cn('comments-count')}>
                  {item.comments_num}
                </span>
              </div>
            }
            {
              item.price &&
              <div className={cn('price')}>
                {priceTemplate.replace('?', item.price)}
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), { setLike })(Uni);

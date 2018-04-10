import { React, PureComponent, Type, cn } from '../../__base';

import { Link } from '../../../components-lib';
import Image from '../../../components/Image';
import Avatar from '../../../components/Avatar';
import IconBag from '../../../icons/bag';

import createProfileLink from '../../../lib/links/profile-link';
import createPostLink from '../../../lib/links/post-link';

import '../Card.less';

@cn('Card')
class GoodsCard extends PureComponent {
  static propTypes = {
    item: Type.shape({
      title: Type.string,
      slug: Type.string,
      price: Type.number,
      user: Type.object,
      images: Type.array,
    }).isRequired,
    priceTemplate: Type.string.isRequired,
  };

  render(cn) {
    const { item, priceTemplate } = this.props;
    const imageUrl = item.images && item.images[0] && item.images[0].file;
    const name = item.user.profile_name ? item.user.profile_name : `ID: ${item.user.id}`;

    return (
      <div className={cn({ view: 'goods' })}>
        <div className={cn('wrapper')}>
          <div className={cn('header')}>
            <Link
              className={cn('user')}
              to={createProfileLink(item.user)}
              text={name}
              icon={
                <Avatar
                  className="avatar Card__avatar"
                  imgClassName="avatar__img"
                  avatar={item.user.avatar}
                  thumbSize="60x60"
                  alt={name}
                />
              }
            />
          </div>
          <div className={cn('img-wrapper')}>
            <Link
              to={createPostLink(item)}
            >
              <Image
                className={cn('img')}
                alt={item.title}
                thumbSize="360x250"
                src={imageUrl}
              />
            </Link>
          </div>
          <div className={cn('footer', { align: 'vertical' })}>
            <Link
              className={cn('title')}
              to={createPostLink(item)}
              text={item.title}
              size={'s'}
              color="goods"
              icon={<IconBag
                size={'xs'}
              />}
            />
            <div className={cn('price')}>
              {priceTemplate.replace('?', item.price)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GoodsCard;

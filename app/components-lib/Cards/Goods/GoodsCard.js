import { React, PureComponent, Type, cn } from '../../__base';

import { Link } from '../../../components-lib';
import Image from '../../../components/Image';
import Avatar from '../../../components/Avatar';
import IconBag from '../../../icons/bag';

import getUserName from '../../../lib/getUserName';
import getImageUrl from '../../../lib/getImageUrl';
import createProfileLink from '../../../lib/links/profile-link';
import createPostLink from '../../../lib/links/post-link';

import '../Card.less';

@cn('Card')
class GoodsCard extends PureComponent {
  static propTypes = {
    data: Type.shape({
      title: Type.string,
      slug: Type.string,
      price: Type.number,
      user: Type.object,
      images: Type.array,
    }).isRequired,
    priceTemplate: Type.string.isRequired,
  };

  render(cn) {
    const { data, priceTemplate } = this.props;
    const imageUrl = getImageUrl(data);
    const name = getUserName(data.user);

    return (
      <div className={cn({ view: 'goods' })}>
        <div className={cn('wrapper')}>
          <div className={cn('header')}>
            <Link
              className={cn('user')}
              to={createProfileLink(data.user)}
              text={name}
              color="gray-600"
              icon={
                <Avatar
                  className="avatar Card__avatar"
                  imgClassName="avatar__img"
                  avatar={data.user.avatar}
                  thumbSize="60x60"
                  alt={name}
                />
              }
            />
          </div>
          <div className={cn('img-wrapper')}>
            <Link
              to={createPostLink(data)}
            >
              <Image
                className={cn('img')}
                alt={data.title}
                thumbSize="360x250"
                src={imageUrl}
              />
            </Link>
          </div>
          <div className={cn('footer', { align: 'vertical' })}>
            <Link
              className={cn('title')}
              to={createPostLink(data)}
              text={data.title}
              size="s"
              icon={<IconBag
                size="xs"
                color="blue"
              />}
            />
            <div className={cn('price')}>
              {priceTemplate.replace('?', data.price)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GoodsCard;

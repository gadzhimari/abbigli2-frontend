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
    const { author, title, price } = data;

    const imageUrl = getImageUrl(data);
    const name = getUserName(data);
    const postUrl = createPostLink(data);
    const profileUrl = createProfileLink(author);

    const mods = { view: 'goods' };

    return (
      <div className={cn(mods)}>
        <div className={cn('wrapper')}>
          <div className={cn('header')}>
            <Link
              className={cn('user')}
              to={profileUrl}
              text={name}
              icon={
                <Avatar
                  className="avatar Card__avatar"
                  imgClassName="avatar__img"
                  avatar={author.avatar}
                  thumbSize="60x60"
                  alt={name}
                />
              }
            />
          </div>
          <div className={cn('img-wrapper')}>
            <Link to={postUrl}>
              <Image
                className={cn('img')}
                alt={title}
                thumbSize="360x250"
                src={imageUrl}
              />
            </Link>
          </div>
          <div className={cn('footer', { align: 'vertical' })}>
            <Link
              className={cn('title')}
              to={postUrl}
              text={title}
              size="s"
              color="goods"
              icon={<IconBag
                size="xs"
              />}
            />
            <div className={cn('price')}>
              {priceTemplate.replace('?', price)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GoodsCard;

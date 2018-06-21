import { React, PureComponent, Type, cn } from '../../__base';

import { Link, Price, Icon} from '../../../components-lib';
import Image from '../../../components/Image';
import Avatar from '../../../components/Avatar';

import getUserName from '../../../lib/getUserName';
import getImageUrl from '../../../lib/getImageUrl';
import createProfileLink from '../../../lib/links/profile-link';
import createPostLink from '../../../lib/links/post-link';

import '../Card.less';
import { PRODUCT_TYPE } from '../../../lib/constants/posts-types';

@cn('Card')
class GoodsCard extends PureComponent {
  static propTypes = {
    data: Type.shape({
      title: Type.string,
      slug: Type.string,
      price: Type.string,
      user: Type.object,
      images: Type.array,
    }).isRequired
  };

  render(cn) {
    const { data } = this.props;
    const { author, title, price } = data;

    const imageUrl = getImageUrl(data);
    const name = getUserName(data);
    const postUrl = createPostLink(data, PRODUCT_TYPE);
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
              title={name}
              color="gray-600"
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
            <div className={cn('footer-col', { left: true })}>
              <Link
                className={cn('title')}
                to={postUrl}
                text={data.title}
                title={data.title}
                size="s"
                icon={<Icon glyph="bag" size="xs" color="blue" />}
              />
            </div>
            <div className={cn('footer-col', { right: true })}>
              <Price className={cn('price')} price={price} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GoodsCard;

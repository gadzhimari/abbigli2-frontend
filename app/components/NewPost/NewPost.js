import { React, PureComponent, Type } from '../../components-lib/__base';

import Link from '../Link/Link';

import { __t } from '../../i18n/translator';
import Avatar from '../Avatar';
import Image from '../../components/Image';
import createProfileLink from '../../lib/links/profile-link';
import createPostLink from '../../lib/links/post-link';

import './NewPost.less';
import { PRODUCT_TYPE, EVENT_TYPE, BLOG_TYPE } from '../../lib/constants/posts-types';
import getImageUrl from '../../lib/getImageUrl';
import getUserName from '../../lib/getUserName';

const rubricByType = {
  [BLOG_TYPE]: __t('New in blogs'),
  [EVENT_TYPE]: __t('New in events'),
  [PRODUCT_TYPE]: __t('New in posts'),
};

class NewPost extends PureComponent {
  static propTypes = {
    data: Type.shape({
      title: Type.string,
      slug: Type.string,
      price: Type.string,
      user: Type.object,
      images: Type.array,
    }).isRequired
  };

  render() {
    const { data } = this.props;

    const imageUrl = getImageUrl(data);
    const postUrl = createPostLink(data, data.type);
    const name = getUserName(data);
    const authorUrl = createProfileLink(data.author);

    return (
      <div className="new-post">
        <Link
          className="new-post__img-wrap"
          to={postUrl}
        >
          <Image
            className="new-post__img"
            alt={data.title}
            thumbSize="592x140"
            src={imageUrl}
          />
        </Link>
        <div className="new-post__info">
          <div className="new-post__rubric">
            {rubricByType[data.type]}
          </div>

          <Link
            className="new-post__title"
            to={postUrl}
            title={data.title}
          >
            {data.title}
          </Link>

          {data.date &&
            <div className="new-post__date">
              {data.date}
            </div>
          }

          <Link
            className="user"
            to={authorUrl}
          >
            <Avatar
              className="avatar"
              imgClassName="avatar__img"
              avatar={data.author.avatar}
              thumbSize="25x25"
              alt={name}
            />

            {name}
          </Link>
        </div>
      </div>
    );
  }
}

export default NewPost;

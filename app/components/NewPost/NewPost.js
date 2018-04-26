import { React, PureComponent, Type } from '../../components-lib/__base';

import Link from '../Link/Link';

import { __t } from '../../i18n/translator';
import Avatar from '../Avatar';
import Image from '../../components/Image';
import createProfileLink from '../../lib/links/profile-link';
import createPostLink from '../../lib/links/post-link';

import './NewPost.less';

const rubricByType = {
  4: __t('New in blogs'),
  3: __t('New in events'),
  1: __t('New in posts'),
};

class NewPost extends PureComponent {
  static propTypes = {
    data: Type.shape({
      title: Type.string,
      slug: Type.string,
      price: Type.number,
      user: Type.object,
      images: Type.array,
    }).isRequired
  };

  render() {
    const { data } = this.props;
    const imageUrl = data.images && data.images[0] && data.images[0].file;

    return (
      <div className="new-post">
        <Link
          className="new-post__img-wrap"
          to={createPostLink(data)}
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
            to={createPostLink(data)}
            title={data.title}
          >
            {data.title}
          </Link>
          <div className="new-post__date">
            {
              !!data.date
              &&
              data.date
            }
          </div>

          <Link
            className="user"
            to={createProfileLink(data.user)}
          >
            <Avatar
              className="avatar"
              imgClassName="avatar__img"
              avatar={data.user.avatar}
              thumbSize="25x25"
              alt={data.user.profile_name}
            />

            {data.user.profile_name}
          </Link>
        </div>
      </div>
    );
  }
}

export default NewPost;

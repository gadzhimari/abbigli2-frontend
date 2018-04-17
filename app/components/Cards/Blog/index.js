import { connect } from 'react-redux';

import { React, Component, Type } from '../../../components-lib/__base';

import Image from '../../../components/Image';
import Avatar from '../../Avatar';
import { Share, Link } from '../../../components';
import { Like } from '../../../components-lib';

import createProfileLink from '../../../lib/links/profile-link';
import createPostLink from '../../../lib/links/post-link';
import localeDateString from '../../../lib/date/toLocaleDateString';
import { MESSAGE_DATE_FORMAT } from '../../../lib/date/formats';
import { BLOG_TYPE } from '../../../lib/constants/posts-types';

import setLike from '../../../ducks/Like/actions';

import './index.less';

class BlogCard extends Component {
  static propTypes = {
    data: Type.shape({
      title: Type.string,
      slug: Type.string,
      price: Type.number,
      author: Type.object,
      images: Type.array,
    }).isRequired
  };;

  render() {
    const { data, setLike } = this.props;
    return (
      <div className="blog-card">
        <div className="blog-card__img-wrap">
          <Link
            to={createPostLink(data)}
          >
            <Image
              className="blog-card__img"
              alt={data.title}
              thumbSize="360x250"
              src={data.image}
            />
          </Link>

          <Like
            liked={data.liked}
            onClick={setLike}
            slug={data.slug}
            type={BLOG_TYPE}
          />

          <div className="share">
            <div className="share__icon" />
            <div className="dropdown-corner" />
            <div className="dropdown">
              <Share
                postLink={createPostLink(data)}
                buttonClass="social-btn"
                media={data.image}
                description={data.title}
              />
            </div>
          </div>
        </div>

        <div className="blog-card__info">
          <Link
            className="user"
            to={createProfileLink(data.author)}
          >
            <Avatar
              className="avatar"
              imgClassName="avatar__img"
              avatar={data.author.avatar}
              thumbSize="36x36"
              alt={data.author.profile_name}
            />

            {data.author.profile_name}
          </Link>

          <Link
            className="blog-card__title"
            to={createPostLink(data)}
          >
            <svg className="icon icon-blog" viewBox="0 0 51 52.7">
              <path d="M51,9.4L41.5,0L31,10.4H4.1c-2.3,0-4.1,1.8-4.1,4.1v27.8c0,2.3,1.8,4.1,4.1,4.1h1.4l0.7,6.3 l8.3-6.3H38c2.3,0,4.1-1.8,4.1-4.1V18.1L51,9.4z M16.2,34.4l1-6.3l5.3,5.4L16.2,34.4z M47.2,9.4L24,32.2l-5.6-5.6l23-22.8L47.2,9.4z" />
            </svg>
            {data.title}
          </Link>

          <div
            className="blog-card__text"
            dangerouslySetInnerHTML={{ __html: data.seo_description }}
          />

          <div className="blog-card__date">
            {localeDateString(data.created, MESSAGE_DATE_FORMAT)}

            <div className="comment-count">
              <svg className="icon icon-comment" viewBox="0 0 16.1 16.1">
                <polygon points="6.9,11.6 16.1,11.6 16.1,0 0,0 0,11.6 2.1,11.6 2.1,16.1 " />
              </svg>

              {data.comments_num}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps, { setLike })(BlogCard);

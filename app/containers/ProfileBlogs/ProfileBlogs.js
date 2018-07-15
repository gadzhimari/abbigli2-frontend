import { React, PureComponent } from '../../components-lib/__base';

import { Blog } from '../../components-lib/Cards';
import Attach from '../Profile/components/Attach';

import wrapper from '../../HOC/profileSectionsWrapper';
import paginateWrapper from '../../HOC/paginate';

import { BLOG_TYPE } from '../../lib/constants/posts-types';

class ProfileBlogs extends PureComponent {
  static fetchPosts = (props) => {
    const { params, loadPosts, query } = props;

    loadPosts({ ...query, author: params.profile }, BLOG_TYPE);
  }

  render() {
    const { posts, setLike, renderPaginator, isMe, deletePost } = this.props;

    return (
      <div className="profile_content">
        <div className="cards-row">
          <Attach isVisible={isMe} type="blog" url={`/post/new?type=${BLOG_TYPE}`} />

          {posts.map(item => (
            <Blog
              key={item.slug}
              data={item}
              view={2}

              setLike={setLike}
              delete={deletePost}

              isMe={isMe}
              showShare={isMe}
              canEdit={isMe}
              showAvatar={!isMe}
            />
          ))
          }
        </div>

        {renderPaginator()}
      </div>
    );
  }
}

export default wrapper(ProfileBlogs.fetchPosts, paginateWrapper(ProfileBlogs));

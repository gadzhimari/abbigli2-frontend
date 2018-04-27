import { React, PureComponent } from '../../components-lib/__base';

import { Blog } from '../../components-lib/Cards';
import wrapper from '../../HOC/profileSectionsWrapper';
import paginateWrapper from '../../HOC/paginate';

import { BLOG_TYPE } from '../../lib/constants/posts-types';

class ProfileBlogs extends PureComponent {
  static fetchPosts = (props) => {
    const { params, loadPosts } = props;

    loadPosts({ author: params.profile }, BLOG_TYPE);
  }

  render() {
    const { posts, setLike, renderPaginator } = this.props;

    return (
      <div className="profile_content">
        <div className="cards-row">
          {posts.map(item => (
            <Blog
              data={item}
              key={item.slug}
              setLike={setLike}
              view={3}
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

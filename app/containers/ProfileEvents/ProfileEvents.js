import { React, PureComponent } from '../../components-lib/__base';

import { Event } from '../../components-lib/Cards';
import wrapper from '../../HOC/profileSectionsWrapper';

import { EVENT_TYPE } from '../../lib/constants/posts-types';
import paginateWrapper from '../../HOC/paginate';

class ProfileEvents extends PureComponent {
  static fetchPosts = (props) => {
    const { params, loadPosts } = props;

    loadPosts({ author: params.profile }, EVENT_TYPE);
  }

  render() {
    const { posts, setLike, renderPaginator } = this.props;

    return (
      <div className="profile_content">
        <div className="cards-row">
          {posts.map(item => (
            <Event
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

export default wrapper(ProfileEvents.fetchPosts, paginateWrapper(ProfileEvents));

import { React, PureComponent } from '../../components-lib/__base';

import { Event } from '../../components-lib/Cards';
import Attach from '../Profile/components/Attach';

import wrapper from '../../HOC/profileSectionsWrapper';
import paginateWrapper from '../../HOC/paginate';

import { EVENT_TYPE } from '../../lib/constants/posts-types';

class ProfileEvents extends PureComponent {
  static fetchPosts = (props) => {
    const { params, loadPosts, query } = props;

    loadPosts({ ...query, author: params.profile }, EVENT_TYPE);
  }

  render() {
    const { posts, setLike, renderPaginator, isMe, deletePost } = this.props;

    return (
      <div className="profile_content">
        <div className="cards-row">
          <Attach isVisible={isMe} type="event" url={`/post/new?type=${EVENT_TYPE}`} />

          {posts.map(item => (
            <Event
              key={item.slug}
              data={item}
              view={2}

              setLike={setLike}
              delete={deletePost}

              showShare={isMe}
              isMe={isMe}
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

export default wrapper(ProfileEvents.fetchPosts, paginateWrapper(ProfileEvents));

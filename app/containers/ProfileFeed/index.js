import { withRouter } from 'react-router';
import { React, PureComponent } from '../../components-lib/__base';

import { Card } from '../../components-lib/Cards';

import wrapper from '../../HOC/profileSectionsWrapper';
import paginateWrapper from '../../HOC/paginate';

import { __t } from './../../i18n/translator';

import './index.less';

class ProfileFeed extends PureComponent {
  static fetchPosts = (props) => {
    const { query, loadFeed } = props;

    loadFeed(query);
  }

  render() {
    const {
      posts,
      isMe,
      setLike,
      renderPaginator
    } = this.props;

    return (
      <div className="profile_content">
        <div className="cards-row">
          {posts.map(item => (
            <Card
              data={item}
              key={item.slug}
              setLike={setLike}
              view={3}
            />
          ))
          }
        </div>

        {isMe && !posts.length &&
          <div>{__t('profilePage.feed.defaultText')}</div>
        }

        {!isMe && !posts.length &&
          <div>{__t('Nothing here yet')}</div>
        }

        {renderPaginator()}
      </div>
    );
  }
}

export default wrapper(
  ProfileFeed.fetchPosts,
  withRouter(paginateWrapper(ProfileFeed))
);

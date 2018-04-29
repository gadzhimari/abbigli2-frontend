import { React, PureComponent } from '../../components-lib/__base';

import { Blog } from '../../components-lib/Cards';
import { Icon, Link } from '../../components-lib';

import wrapper from '../../HOC/profileSectionsWrapper';
import paginateWrapper from '../../HOC/paginate';

import { BLOG_TYPE } from '../../lib/constants/posts-types';
import { __t } from '../../i18n/translator';

class ProfileBlogs extends PureComponent {
  static fetchPosts = (props) => {
    const { params, loadPosts } = props;

    loadPosts({ author: params.profile }, BLOG_TYPE);
  }

  render() {
    const { posts, setLike, renderPaginator, isMe } = this.props;

    return (
      <div className="profile_content">
        <div className="cards-row">
          {isMe &&
            <div className="Card Card_type_attach">
              <div className="Card__attach Card__attach_blog">
                <Link
                  className="Card__button Card__button_attach Card__button_attach_blog"
                  onClick={this.onCreateLinkClick}
                  to={'/post/new'}
                  text={__t('add.on.abbigli')}
                  color="white"
                  size={'l'}
                  icon={<Icon glyph="plus" size="s" />}
                />
              </div>
            </div>
          }

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

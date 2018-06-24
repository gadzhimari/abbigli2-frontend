import { React, PureComponent } from '../../../components-lib/__base';
import { PostsTable, Spin } from '../../../components-lib';

class ActivePostsPage extends PureComponent {
  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = (page) => {
    const { getActivePosts, params } = this.props;

    getActivePosts({
      profileId: params.profile,
      page,
    });
  }

  renderLoader() {
    const { isFetchingPosts } = this.props;

    return (
      <div className="spin-wrapper">
        <Spin visible={isFetchingPosts} />
      </div>
    );
  }

  render() {
    const { itemsPosts, isFetchingPosts, ...postsTableProps } = this.props;

    return (isFetchingPosts ?
      this.renderLoader() : <PostsTable posts={itemsPosts} {...postsTableProps} />
    );
  }
}

export default ActivePostsPage;

import { React, PureComponent } from '../../../components-lib/__base';
import { PostsTable, Spin } from '../../../components-lib';

class ArchivePage extends PureComponent {
  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = (page) => {
    const { getArchivePosts, params } = this.props;

    getArchivePosts({
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
    const { itemsPosts, isFetchingPosts } = this.props;

    return (isFetchingPosts ?
      this.renderLoader() : <PostsTable posts={itemsPosts} />
    );
  }
}

export default ArchivePage;

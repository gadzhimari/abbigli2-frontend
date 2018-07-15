import { React, PureComponent } from '../../../components-lib/__base';
import { PostsTable, Spin } from '../../../components-lib';
import { POST_TABLE_UNARCHIVE_ACTION, POST_TABLE_DELETE_ACTION } from '../../../components-lib/PostsTable/PostsTableRow';

const postTableActions = [POST_TABLE_UNARCHIVE_ACTION, POST_TABLE_DELETE_ACTION];

class ArchivePage extends PureComponent {
  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = (page) => {
    const { getArchivePosts, params } = this.props;
    getArchivePosts({ author: params.profile, page });
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
    const { itemsPosts, isFetchingPosts, ...postTableProps } = this.props;

    return (isFetchingPosts ?
      this.renderLoader() : <PostsTable
        posts={itemsPosts}
        actions={postTableActions}
        {...postTableProps}
      />
    );
  }
}

export default ArchivePage;

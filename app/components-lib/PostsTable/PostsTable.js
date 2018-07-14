import { React, PureComponent, cn, connect } from '../__base';

import PostsTableRow from './PostsTableRow';
import PostsTableRowMobile from './PostsTableRow.mobile';

import { __t } from '../../i18n/translator';

import './PostsTable.less';

@cn('PostsTable')
class PostsTable extends PureComponent {
  static defaultProps = {
    showPeriod: false,
    posts: []
  }

  renderForTouch(cn) {
    const { posts, ...restProps } = this.props;

    return posts
      .map(post => <PostsTableRowMobile {...restProps} postData={post} cn={cn} />);
  }

  render(cn) {
    const { posts, showPeriod, isTouch, ...restProps } = this.props;

    if (!posts.length) return null;

    if (isTouch) {
      return this.renderForTouch(cn);
    }

    return (
      <table className={`Table ${cn()}`}>
        <thead>
          <tr>
            <th />
            <th>{__t('postsTable.header.postTitle')}</th>
            {showPeriod && <th>{__t('postsTable.header.raisingTerm')}</th>}
            {showPeriod && <th>{__t('common.price')}</th>}
            <th>{__t('postsTable.header.actions')}</th>
          </tr>
        </thead>

        <tbody>
          {
            posts.map(post => <PostsTableRow
              postData={post}
              cn={cn}
              showPeriod={showPeriod}
              {...restProps}

              key={post.id}
            />)
          }
        </tbody>
      </table>
    );
  }
}

export default connect(({ isTouch }) => ({ isTouch }))(PostsTable);

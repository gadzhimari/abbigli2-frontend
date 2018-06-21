import { React, PureComponent, cn } from '../__base';

import PostsTableRow from './PostsTableRow';

import { __t } from '../../i18n/translator';

import './PostsTable.less';

@cn('PostsTable')
class PostsTable extends PureComponent {
  static defaultProps = {
    showPeriod: false,
    posts: []
  }

  render(cn) {
    const { posts, showPeriod, ...restProps } = this.props;

    if (!posts.length) return null;

    return (
      <table className={`Table ${cn()}`}>
        <thead>
          <tr>
            <th />
            <th>{__t('Title and Price')}</th>
            {showPeriod && <th>{__t('The term raising')}</th>}
            <th>{__t('Category')}</th>
            {showPeriod && <th>{__t('Price')}</th>}
            <th>{__t('Actions')}</th>
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

export default PostsTable;

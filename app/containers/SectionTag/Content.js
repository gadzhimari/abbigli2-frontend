import React, { PureComponent } from 'react';
import Type from 'prop-types';

import { ListWithNew } from '../../components';
import { Product } from '../../components-lib/Cards';

class Content extends PureComponent {
  static propTypes = {
    posts: Type.arrayOf(Type.object),
    pages: Type.number,
    paginate: Type.func,
    activePage: Type.string,
  }

  render() {
    const { posts, renderPaginator } = this.props;

    return (
      <div>
        <ListWithNew
          ItemComponent={Product}
          items={posts}
          count={8}
        />

        {renderPaginator()}
      </div>
    );
  }
}

export default Content;

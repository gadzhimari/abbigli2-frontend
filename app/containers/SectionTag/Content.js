import React, { PureComponent } from 'react';
import Type from 'prop-types';

import { ListWithNew } from '../../components';
import { Product } from '../../components-lib/Cards';

class Content extends PureComponent {
  static propTypes = {
    posts: Type.arrayOf(Type.object),
    priceTemplate: Type.string,
    pages: Type.number,
    paginate: Type.func,
    activePage: Type.string,
  }

  render() {
    const {
      posts,
      priceTemplate,
      renderPaginator
    } = this.props;

    return (
      <div>
        <ListWithNew
          ItemComponent={Product}
          items={posts}
          count={8}
          itemProps={{ priceTemplate }}
        />

        {renderPaginator()}
      </div>
    );
  }
}

export default Content;

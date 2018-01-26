/* eslint-disable react/no-array-index-key */

import React, { PureComponent } from 'react';
import Type from 'prop-types';

import Tag from './Tag';

export default class TagsList extends PureComponent {
  static propTypes = {
    tags: Type.arrayOf(Type.string),
  }

  render() {
    return (
      <div className="goods-post__tags">
        {this.props.tags.map((tag, idx) => (
          <Tag key={idx} tag={tag} />
        ))}
      </div>
    );
  }
}

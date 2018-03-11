import React, { PureComponent } from 'react';
import Type from 'prop-types';

import Link from '../../components/Link/Link';
import { gaSendClickEvent } from '../../lib/analitics';

export default class Tag extends PureComponent {
  static propTypes = {
    tag: Type.string,
  }

  onClick = () => {
    gaSendClickEvent('product', this.props.tag);
  }

  render() {
    const { tag } = this.props;

    return (
      <Link
        className="tag"
        to={`/find?tags=${tag}`}
        onClick={this.onClick}
      >
        #{tag}
      </Link>
    );
  }
}

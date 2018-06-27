import { React, PureComponent, Type } from '../__base';

import Link from '../../components/Link/Link';

class Crumb extends PureComponent {
  static propTypes = {
    url: Type.string.isRequired,
    title: Type.string.isRequired,
    pos: Type.number,
    cn: Type.func
  }

  render() {
    const { url, title, pos, cn } = this.props;

    return (
      <li
        className={cn('item')}
        itemProp="itemListElement"
        itemScope
        itemType="http://schema.org/ListItem"
      >
        <Link
          to={url}
          className={cn('link')}
          itemProp="item"
        >
          <span itemProp="name">{title}</span>
          <meta itemProp="position" content={pos} />
        </Link>
      </li>
    );
  }
}

export default Crumb;

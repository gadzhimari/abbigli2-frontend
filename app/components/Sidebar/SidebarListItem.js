import { React, PureComponent } from '../../components-lib/__base';

import toLocaleDateString from '../../lib/date/toLocaleDateString';
import { POST_DATE_FORMAT } from '../../lib/date/formats';
import createPostLink from '../../lib/links/post-link';

import Link from '../Link/Link';
import Image from '../Image';

class SidebarListItem extends PureComponent {
  render() {
    const { data, type } = this.props;
    const postUrl = createPostLink(data, type);

    return (
      <div className="sidebar-news__item">
        <Link
          className="sidebar-news__img"
          to={postUrl}
        >
          <Image
            src={data.image}
            alt={data.title}
            thumbSize="120x103"
          />
        </Link>

        <Link
          className="sidebar-news__title"
          to={postUrl}
        >
          {data.title}
        </Link>

        <div className="sidebar-news__date">
          {toLocaleDateString(data.created, POST_DATE_FORMAT)}
        </div>
      </div>
    );
  }
}

export default SidebarListItem;

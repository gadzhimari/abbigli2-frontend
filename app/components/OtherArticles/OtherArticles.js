import { React, PureComponent, Type } from '../../components-lib/__base';

import Image from '../Image';
import { Link } from '../../components-lib';
import createPostLink from '../../lib/links/post-link';
import createProfileLink from '../../lib/links/profile-link';

import { __t } from '../../i18n/translator';

import './OtherArticles.less';

class OtherArticles extends PureComponent {
  static propTypes = {
    articles: Type.arrayOf(Type.object).isRequired,
    data: Type.shape({ id: Type.number }),
  };

  render() {
    const { articles, data } = this.props;
    if (!articles || articles.length === 0) {
      return null;
    }

    return (
      <div className="other-articles">
        <Link
          className="other-articles__item other-articles__item_more"
          text={__t('More from author')}
          color="gray-600"
          to={createProfileLink(data)}
        />
        {
          articles.slice(0, 4)
            .map(article => (
              <Link
                className="other-articles__item"
                key={article.id}
                to={createPostLink(article)}
              >
                <Image
                  src={article.image}
                  thumbSize="120x103"
                  alt={article.title}
                />
              </Link>
            ))
        }
      </div>
    );
  }
}

export default OtherArticles;

import React from 'react';

import { Link } from 'react-router';
import { DOMAIN_URL } from 'config';

import './OtherArticles.less';

const urls = {
  3: 'event',
  4: 'blog',
};

const OtherArticles = ({
  articles,
}) => {
  return (
    <div className="other-articles">
      <a className="other-articles__item">
        <span className="other-articles__item-text">
          Другие статьи автора
        </span>
      </a>
      {
        articles
        &&
        articles
          .slice(0, 4)
          .map(article => (
            <Link
              className="other-articles__item"
              key={article.id}
              to={`/${urls[article.type]}/${article.slug}`}
            >
              <img
                src={`${DOMAIN_URL}thumbs/unsafe/120x103/${article.images[0].file}`}
                alt={article.title}
              />
            </Link>
          ))
      }
    </div>
  );
};

export default OtherArticles;

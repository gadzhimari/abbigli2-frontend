import React from 'react';
import PropTypes from 'prop-types';

import Image from '../Image';
import Link from '../Link/Link';

import { __t } from '../../i18n/translator';


import './OtherArticles.less';

const urls = {
  3: 'event',
  4: 'blog',
  1: 'post',
};

const OtherArticles = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className="other-articles">
      <a className="other-articles__item">
        <span className="other-articles__item-text">
          {__t('More from author')}
        </span>
      </a>
      {
        articles && articles.slice(0, 4)
          .map(article => (
            <Link
              className="other-articles__item"
              key={article.id}
              to={`/${urls[article.type]}/${article.slug}`}
            >
              <Image
                src={article.images[0] && article.images[0].file}
                thumbSize="120x103"
                alt={article.title}
              />
            </Link>
          ))
      }
    </div>
  );
};

OtherArticles.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OtherArticles;

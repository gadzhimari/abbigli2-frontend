import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { THUMBS_URL } from 'config';
import { __t } from '../../i18n/translator';


import './OtherArticles.less';

const urls = {
  3: 'event',
  4: 'blog',
};

const OtherArticles = ({ articles }) => (
  <div className="other-articles">
    <a className="other-articles__item">
      <span className="other-articles__item-text">
        {__t("Other autor's posts")}
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
              src={`${THUMBS_URL}unsafe/120x103/${article.images[0].file}`}
              alt={article.title}
            />
          </Link>
        ))
    }
  </div>
);

OtherArticles.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OtherArticles;

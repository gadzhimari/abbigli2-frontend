import React from 'react';

import UserItem from './UserItem';

import { __t } from '../../../i18n/translator';

const ResultsUsers = ({
  items,
  onScroll,
  onClick,
  searchString,
  isFetching,
}) => (
    <div
      className="mobile-search__results"
      onScroll={onScroll}
    >
      {
        items.length === 0
        &&
        searchString.length !== 0
        &&
        !isFetching
        &&
        <div className="mobile-search__no-results">
          {__t('No results for request')}
          <strong>
            {` ${searchString}`}
          </strong>
        </div>
      }
      {
        isFetching
        &&
        items.length === 0
        &&
        searchString.length !== 0
        &&
        <div className="mobile-search__no-results">
          {__t('Loading...')}
        </div>
      }
      {
        items.map(item => (
          <UserItem
            key={item.id}
            item={item}
            searchString={searchString}
            onClick={onClick}
          />
        ))
      }
    </div>
  );

export default ResultsUsers;

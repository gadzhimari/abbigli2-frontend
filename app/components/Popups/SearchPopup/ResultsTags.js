import React from 'react';

import TagItem from './TagItem';

import { __t } from '../../../i18n/translator';

const Results = ({
  items,
  isFetching,
  searchQuery,
  onScroll,
  onClick,
}) => (
    <div
      className="mobile-search__results"
      onScroll={onScroll}
    >
      {
        items.length === 0
        &&
        searchQuery.value && searchQuery.value.length !== 0
        &&
        !isFetching
        &&
        <div className="mobile-search__no-results">
          {__t('No results for request')}
          <strong>
            {` ${searchQuery.value}`}
          </strong>
        </div>
      }
      {
        isFetching
        &&
        items.length === 0
        &&
        searchQuery.currentRequest && searchQuery.currentRequest.length !== 0
        &&
        <div className="mobile-search__no-results">
          {__t('Loading...')}
        </div>
      }
      {
        items
          .map(item => (<TagItem
            data={item}
            key={item.id}
            searchQuery={searchQuery}
            onClick={onClick}
          />))
      }
    </div>
  );

export default Results;

import React from 'react';

const TagItem = ({
  data,
  searchQuery,
  onClick,
}) => {
  const formatedTitle = data.title
      .replace(searchQuery.currentRequest, `<strong>${searchQuery.value}</strong>`);
  const value = searchQuery.latestRequest.length > 0
    ? `${searchQuery.latestRequest} ${data.title}`
    : data.title;

  return (
    <div
      className="mobile-search__results-item"
      onClick={onClick}
      data-value={value}
      dangerouslySetInnerHTML={{ __html: formatedTitle }}
    />
  );
};

export default TagItem;

import React from 'react';

const TagItem = ({
  data,
  searchQuery,
  onClick,
}) => {
  const regex = new RegExp(searchQuery.currentRequest, 'i');
  const formatedTitle = data.title
      .replace(regex, `<strong>${searchQuery.value}</strong>`);
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

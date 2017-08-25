import React from 'react';
import PropTypes from 'prop-types';

import './PageSwitcher.less';

const Page = ({ page, isActive, paginate }) => (<div
  className={`pagination__item${isActive ? ' active' : ''}`}
  onClick={paginate}
  data-page={page}
>
  {page}
</div>);

const PageSwitcher = ({ active, count, paginate, }) => {
  const pages = Array(count)
    .fill(1)
    .map((_, idx) => {
      const pageNumber = idx + 1;
      if (pageNumber === 1 || pageNumber === count) {
        return (<Page
          key={idx}
          page={pageNumber}
          isActive={pageNumber === active}
          paginate={paginate}
        />);
      }

      if (pageNumber === active) {
        return (<Page
          key={idx}
          page={pageNumber}
          isActive
          paginate={paginate}
        />);
      }

      if (active - (pageNumber) <= 2 && active - pageNumber >= -2) {
        return (<Page
          key={idx}
          page={idx + 1}
          isActive={pageNumber === active}
          paginate={paginate}
        />);
      }

      if (pageNumber === active - 3 || pageNumber === active + 3) {
        return <div key={idx} className="pagination__item">...</div>;
      }

      return null;
    });

  return (
    <div className="pagination">
      <div
        className={`pagination__nav${active === 1 ? ' disabled' : ''}`}
        onClick={paginate}
        data-page={active - 1}
      >
        <svg className="icon icon-arrow" viewBox="0 0 11.3 19.6">
          <path d="M0.7,0.6c-0.8,0.8-0.9,2.1-0.1,2.9l5.9,6.4l-5.9,6.3c-0.8,0.9-0.8,2.2,0.1,2.9 c0.9,0.7,2.1,0.7,2.9-0.1l7.2-7.8c0.1-0.1,0.1-0.1,0.2-0.2l0,0c0.1-0.1,0.1-0.2,0.2-0.3l0,0c0-0.1,0.1-0.2,0.1-0.3v-0.1 c0-0.1,0-0.2,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.2,0-0.2V9.4c0-0.1-0.1-0.2-0.1-0.3l0,0C11.1,9,11.1,8.9,11,8.8 l0,0c-0.1-0.1-0.1-0.2-0.2-0.2L3.6,0.7C2.8-0.2,1.5-0.2,0.7,0.6z"/>
        </svg>
        Предыдущая
      </div>
      {pages}
      <div
        className={`pagination__nav${active === count ? ' disabled' : ''}`}
        onClick={paginate}
        data-page={active + 1}
      >
        Следующая
        <svg className="icon icon-arrow" viewBox="0 0 11.3 19.6">
          <path d="M0.7,0.6c-0.8,0.8-0.9,2.1-0.1,2.9l5.9,6.4l-5.9,6.3c-0.8,0.9-0.8,2.2,0.1,2.9 c0.9,0.7,2.1,0.7,2.9-0.1l7.2-7.8c0.1-0.1,0.1-0.1,0.2-0.2l0,0c0.1-0.1,0.1-0.2,0.2-0.3l0,0c0-0.1,0.1-0.2,0.1-0.3v-0.1 c0-0.1,0-0.2,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.2,0-0.2V9.4c0-0.1-0.1-0.2-0.1-0.3l0,0C11.1,9,11.1,8.9,11,8.8 l0,0c-0.1-0.1-0.1-0.2-0.2-0.2L3.6,0.7C2.8-0.2,1.5-0.2,0.7,0.6z"/>
        </svg>
      </div >
    </div >
  );
};

export default PageSwitcher;

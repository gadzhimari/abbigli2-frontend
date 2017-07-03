import React from 'react';
import PropTypes from 'prop-types';

import './PageSwitcher.less';

const PageSwitcher = () => {
  return (
    <div className="pagination">
      <div className="pagination__nav disabled" />
      <div className="pagination__item active">1</div>
      <div className="pagination__item">2</div>
      <div className="pagination__item">3</div>
      <div className="pagination__item">...</div>
      <div className="pagination__item">6</div>
      <div className="pagination__nav" />
    </div>
  );
};

export default PageSwitcher;

import React from 'react';
import PropTypes from 'prop-types';

import Crumb from './Crumb';

import { __t } from '../../i18n/translator';
import './BreadCrumbs.less';

const defaultCrumb = [{
  title: __t('Home'),
  url: '/',
}];

const BreadCrumbs = ({
  crumbs,
}) => (
    <div className="breadcrumbs">
      {
        [...defaultCrumb, ...crumbs]
          .map((crumb, id) => <Crumb
            title={crumb.title}
            url={crumb.url}
            key={id}
          />)
      }
    </div>
  );

BreadCrumbs.defaultProps = {
  crumbs: [],
};

BreadCrumbs.propTypes = {
  crumbs: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
  })),
};

export default BreadCrumbs;

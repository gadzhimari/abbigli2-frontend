import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Crumb from './Crumb';

import { __t } from '../../i18n/translator';
import './BreadCrumbs.less';

const defaultCrumb = [{
  title: __t('Home'),
  url: '/',
}];

class BreadCrumbs extends PureComponent {
  static propTypes = {
    crumbs: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string,
    })),
  }

  static defaultProps = {
    crumbs: [],
  }

  render() {
    const { crumbs } = this.props;

    return (
      <ul
        className="breadcrumbs"
        itemScope
        itemType="http://schema.org/BreadcrumbList"
      >
        {
          [...defaultCrumb, ...crumbs]
            .map((crumb, idx) => <Crumb {...crumb} pos={idx + 1} key={crumb.title} />)
        }
      </ul>
    );
  }
}

export default BreadCrumbs;

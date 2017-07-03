import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  BreadCrumbs,
} from 'components';

import { __t } from '../../i18n/translator';

class Blogs extends Component {

  render() {
    const crumbs = [{
      title: __t('Blogs'),
      url: '/blogs',
    }];

    return (
      <main className="main blog">
        <BreadCrumbs
          crumbs={crumbs}
        />
        <h1 className="section-title">
          <svg className="icon icon-blog" viewBox="0 0 51 52.7">
            <path d="M51,9.4L41.5,0L31,10.4H4.1c-2.3,0-4.1,1.8-4.1,4.1v27.8c0,2.3,1.8,4.1,4.1,4.1h1.4l0.7,6.3 l8.3-6.3H38c2.3,0,4.1-1.8,4.1-4.1V18.1L51,9.4z M16.2,34.4l1-6.3l5.3,5.4L16.2,34.4z M47.2,9.4L24,32.2l-5.6-5.6l23-22.8L47.2,9.4z" />
          </svg>
          {__t('Blogs')}
        </h1>
      </main >
    );
  }
}

export default Blogs;

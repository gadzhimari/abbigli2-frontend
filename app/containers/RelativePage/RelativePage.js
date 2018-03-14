import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'recompose';

import paginateHOC from '../../HOC/paginate';

import { __t } from '../../i18n/translator';
import * as actions from 'ducks/Relative/actions';

import {
  BreadCrumbs,
  PageSwitcher,
  ListWithNew,
} from 'components';

import { Spin } from '../../components-lib';
import { Blog } from 'components/Cards';

const typesUrl = {
  1: 'post',
  3: 'event',
  4: 'blog',
};

class RelativePage extends Component {
  componentDidMount() {
    const { params, fetchData } = this.props;

    fetchData(params.slug);
  }

  render() {
    const {
      isFetching,
      items,
      post,
      pages,
      paginate,
      activePage,
    } = this.props;

    return (
      <main className="main">
        <div className="content">
          <BreadCrumbs />
          {
            !isFetching
            &&
            <h1 className="section-title">
              {__t('Relative posts for')}
              {' '}
              <a href={`/${typesUrl[post.type]}/${post.slug}`}>
                {post.title}
              </a>
            </h1>
          }
          {
            isFetching
            ? <div className="cards-wrap">
              <div className="spin-wrapper">
                <Spin visible={isFetching} />
              </div>
            </div>
              : <div className="cards-wrap">
                {
                  items.map(item => <Blog
                    key={item.id}
                    data={item}
                  />)
                }
              </div>
          }
          {
            !isFetching
            &&
            <PageSwitcher
              count={pages}
              paginate={paginate}
              active={activePage}
            />
          }
        </div>
      </main>
    );
  }
}

const mapStateToProps = store => ({
  isFetching: store.RelativePage.isFetching,
  items: store.RelativePage.items,
  post: store.RelativePage.post,
  routing: store.routing.locationBeforeTransitions,
  pages: store.RelativePage.pages,
});

const mapDispatchToProps = dispatch => ({
  fetchData: slug => dispatch(actions.fetchData(slug)),
});

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), paginateHOC);

export default enhance(RelativePage);

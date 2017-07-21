import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { __t } from '../../i18n/translator';
import * as actions from 'ducks/Relative/actions';

import {
  BreadCrumbs,
  BlogCard,
  Loading,
  PageSwitcher,
  ListWithNew,
} from 'components';

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
    const { isFetching, items, post } = this.props;

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
              ? <div className="cards-wrap"><Loading loading={isFetching} /></div>
              : <div className="cards-wrap">
                {
                  items.map(item => <BlogCard
                    key={item.id}
                    data={item}
                  />)
                }
              </div>
          }
          {
            !isFetching
            &&
            <PageSwitcher />
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
});

const mapDispatchToProps = dispatch => ({
  fetchData: slug => dispatch(actions.fetchData(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RelativePage);

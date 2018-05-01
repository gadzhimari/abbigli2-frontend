import React, { Component } from 'react';

import { connect } from 'react-redux';
import { compose } from 'recompose';

import paginateHOC from '../../HOC/paginate';

import { __t } from '../../i18n/translator';
import * as actions from '../../ducks/Relative/actions';
import createPostLink from '../../lib/links/post-link';

import { BreadCrumbs, Link } from '../../components';

import { Spin } from '../../components-lib';
import { Card } from '../../components-lib/Cards';

class RelativePage extends Component {
  componentDidMount() {
    const { params, fetchData } = this.props;
    fetchData(params.slug, params.path);
  }

  render() {
    const {
      isFetching,
      items,
      post,
      renderPaginator
    } = this.props;

    return (
      <main className="main">
        <div className="content">
          <BreadCrumbs />
          {!isFetching
            &&
            <h1 className="section-title">
              {__t('Relative posts for')}
              {' '}
              <Link to={createPostLink(post, post.type)}>
                {post.title}
              </Link>
            </h1>
          }
          {
            isFetching
            ? <div className="cards-wrap">
              <div className="spin-wrapper">
                <Spin visible={isFetching} />
              </div>
            </div>
              : <div className="cards-row">
                {
                  items.map(item => <Card
                    data={item}
                    key={item.id}
                    view={1}
                  />
                  )
                }
              </div>
          }
          {!isFetching && renderPaginator()}
        </div>
      </main>
    );
  }
}

const mapStateToProps = store => ({
  isFetching: store.RelativePage.isFetching,
  items: store.RelativePage.items,
  post: store.RelativePage.post,
  pagesCount: store.RelativePage.pages,
});

const mapDispatchToProps = dispatch => ({
  fetchData: (slug, path) => dispatch(actions.fetchData(slug, path))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  paginateHOC
);

export default enhance(RelativePage);

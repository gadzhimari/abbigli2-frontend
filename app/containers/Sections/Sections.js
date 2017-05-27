import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {
  CardsWrap,
  CardTag,
  CardsSort,
  CardsSortItem,
  EventButtons,
  Loading,
} from 'components'
import Helmet from 'react-helmet';
import './Sections.styl';
import { connect } from 'preact-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { fetchData } from 'ducks/SubSections';
import { fetchData as topFetchData } from 'ducks/TopAuthors';


import { DOMAIN_URL } from 'config';
import { __t } from './../../i18n/translator';

class Sections extends Component {
  constructor() {
    super();

    this.page = 1;
  }

  componentDidMount() {
    const { dispatch, routeParams } = this.props;

    dispatch(fetchData(routeParams.section, this.page++));
    dispatch(topFetchData());
  }

  componentDidUpdate(prevProps) {
    const { dispatch, routes, routeParams } = this.props;

    if (prevProps.routes !== routes) {
      dispatch(fetchData(routeParams.section));
      dispatch(topFetchData());
    }
  }

  loadMore = () => {
    const { dispatch, routeParams, isFetchingMore, next } = this.props;

    if (isFetchingMore || next === null) return;

    dispatch(fetchData(routeParams.section, this.page++));
  }

  render() {
    const {
      items,
      isFetching,
      topAuthorsFetching,
      topAuthors,
      section_title,
      seo_title,
      seo_description,
      next,
      sections,
      dispatch,
      routeParams,
      isFetchingMore,
    } = this.props;

    const seoTextsObj = sections
      .filter(section => section.slug === routeParams.section)[0] || {};
    const infiniteScrollLoader = <Loading loading={isFetchingMore} />;

    return (
      <div className="container-fluid tags-page">

        <Helmet
          title={seo_title ? seo_title : seoTextsObj.seo_title}
          meta={[
            { "name": "description", "content": seo_description }
          ]}
        />
        <EventButtons />

        <div className="best-authors">
          <div className="best-authors__title">Top authors</div>
            {
              (!topAuthorsFetching && topAuthors.length > 0)
              &&
              topAuthors.map(item => (
                <Link
                  className="best-author"
                  to={`/profile/${item.id}`}
                  title={item.profile_name}
                  key={`${item.id}-topautors`}
                >
                  <img className="best-author__img" src={`${DOMAIN_URL}/thumbs/unsafe/38x38/${item.avatar}`} />
                </Link>
               ))
            }
        </div>

        <CardsWrap legacy={true}>
          <CardsSort>
            {section_title}
            <CardsSortItem to="/new-products">{__t('New')}</CardsSortItem>
            <CardsSortItem to="/popular-products">{__t('Popular')}</CardsSortItem>
            <CardsSortItem to="/nearest-products">{__t('Beside')}</CardsSortItem>
          </CardsSort>

          {
            isFetching
              ? <Loading loading={isFetching} />
              : (<InfiniteScroll
                loadMore={this.loadMore}
                hasMore={next !== null}
                loader={infiniteScrollLoader}
              >
                {
                  items.length > 0
                    ? items.map(item => <CardTag
                      key={`${item.id}--cardtag`}
                      data={item}
                      currentSlug={routeParams.section}
                    />)
                    : <div className="pages__error-text">{__t('Not results for your request')}</div>
                }
              </InfiniteScroll>)
          }
        </CardsWrap>

        {
          seoTextsObj
            ? (<div className="pre-footer">
              <div className="w-inner">
                <h3>{seoTextsObj.seo_title}</h3>
                <p>{seoTextsObj.seo_bottom_text}</p>
              </div>
            </div>)
            : null
        }

      </div>
    );
  }
}

Sections.propTypes = {
  items: PropTypes.array.isRequired,
  topAuthors: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  topAuthorsFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const {
    isFetching,
    items,
    next,
  } = (state.SubSections) || {
    isFetching: true,
    items: [],
    next: null,
  };

  const section_title = state.SubSections.data ? state.SubSections.data.section_title : '';
  const seo_title = state.SubSections.data ? state.SubSections.data.seo_title : '';
  const seo_description = state.SubSections.data ? state.SubSections.data.seo_description : '';

  const authors = (state.TopAuthors) || { isFetching: true, items: [] };

  return {
    sections: state.Sections.items,
    next,
    items,
    isFetching,
    isFetchingMore: state.SubSections.isFetchingMore,
    section_title,
    seo_title,
    seo_description,
    topAuthors: authors.items,
    topAuthorsFetching: authors.isFetching,
  };
}

export default connect(mapStateToProps)(Sections);

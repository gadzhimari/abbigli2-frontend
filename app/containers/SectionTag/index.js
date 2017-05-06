import React, { Component, PropTypes } from 'react';
import {
  CardsWrap,
  CardProduct,
  CardsSort,
  CardsSortItem,
  TagsBar,
  EventButtons,
  Loading,
} from 'components';
import Helmet from 'react-helmet';
import { connect } from 'preact-redux';
import InfiniteScroll from 'react-infinite-scroller';
import './index.styl';
import { fetchData } from 'ducks/Posts';
import { API_URL } from 'config';

import { __t } from './../../i18n/translator';

class SectionTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: {
        results: [],
      },
    };

    this.page = 1;
  }

  componentWillMount() {
    const { dispatch, routeParams } = this.props;

    dispatch(fetchData(routeParams.section, routeParams.tag, this.page++));

    this.fetchSectionTags();
  }

  componentWillUpdate(nextProps) {
    const { dispatch, routeParams } = this.props;

    if (nextProps.routeParams !== routeParams) {
      this.page = 1;

      dispatch(fetchData(nextProps.routeParams.section, nextProps.routeParams.tag, this.page++));
    }
  }

  fetchSectionTags() {
    const { routeParams } = this.props;

    fetch(`${API_URL}tags/?section=${routeParams.section}&title=${routeParams.tag}`)
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }

        return response.json();
      })
      .then(tags => {
        this.setState({
          tags,
        });
      });
  }

  loadMore = () => {
    const { dispatch, routeParams, isFetchingMore, next } = this.props;

    if (isFetchingMore || next === null) return;

    dispatch(fetchData(routeParams.section, routeParams.tag, this.page++));
  }

  render() {
    const {
      items,
      isFetching,
      isFetchingMore,
      section_title,
      tag_title,
      seo_title,
      seo_description,
      next,
      dispatch,
      isAuthenticated,
      routeParams,
      sections,
    } = this.props;

    const tags = this.state.tags;
    const infiniteScrollLoader = <Loading loading={isFetchingMore} />;
    const seoTextsObj = sections
    .filter(section => section.slug === routeParams.section)[0] || {};

    return (
      <div className="container-fluid tag-page">
        <Helmet
          title={seo_title ? seo_title : `${routeParams.tag} - ${seoTextsObj.title}`}
          meta={[
            { "name": "description", "content": seo_description }
          ]}
        />
        <EventButtons />
        {
          tags.results.length > 1
            &&
          <TagsBar
            tags={tags.results}
            link={`/sections/${routeParams.section}/`}
          />
        }
        <CardsWrap legacy>
          <CardsSort>
            {seoTextsObj.title} #{routeParams.tag}
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
                    ? items.map(item => <CardProduct
                      key={`${item.id}`}
                      data={item}
                      legacy
                      isAuthenticated={isAuthenticated}
                      dispatch={dispatch}
                    />)
                    : <div className="pages__error-text">{__t('Not results for your request')}</div>
                }
              </InfiniteScroll>)
          }
        </CardsWrap>
      </div>
    );
  }
}

SectionTag.propTypes = {
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isFetchingMore: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  routeParams: PropTypes.object.isRequired,
  next: PropTypes.any,
  routes: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  const {
    isFetching,
    items,
  } = (state.Posts) || {
    isFetching: true,
    items: [],
  };
  const auth = state.Auth || {
    isAuthenticated: false,
  };

  const tag_title = state.Posts.data ? state.Posts.data.tag_title : '';
  const section_title = state.Posts.data ? state.Posts.data.section_title : '';
  const seo_title = state.Posts.data ? state.Posts.data.seo_title : '';
  const seo_description = state.Posts.data ? state.Posts.data.seo_description : '';


  return {
    next: state.Posts.next,
    items,
    isFetching,
    section_title,
    tag_title,
    seo_title,
    seo_description,
    isFetchingMore: state.Posts.isFetchingMore,
    isAuthenticated: auth.isAuthenticated,
    sections: state.Sections.items,
  };
}

export default connect(mapStateToProps)(SectionTag);

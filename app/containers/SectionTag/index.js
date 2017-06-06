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
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { fetchData } from 'ducks/Posts';
import { API_URL } from 'config';

import { __t } from './../../i18n/translator';

import './index.styl';

const getSectionUrl = (slug, section, tag) => {
  if (tag) {
    return `/sections/${section}/${tag}/${slug}`;
  }

  return `/${slug}-products/${section}`;
};

class SectionTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: {
        results: [],
      },
    };
  }

  componentWillMount() {
    const {
      dispatch,
      routeParams,
      items,
      currentTag,
      currentSection,
      route,
    } = this.props;

    this.fetchSectionTags();

    if (
      items.length === 0
      || currentTag !== routeParams.tag
      || currentSection !== routeParams.section
    ) {
      const options = Object.assign({}, routeParams);

      if (route.slug) {
        options[route.slug] = true;
      }

      if (routeParams.filter) {
        options[routeParams.filter] = true;
      }

      dispatch(fetchData(options));
    }
  }

  componentWillUpdate(nextProps) {
    const { dispatch, routeParams } = this.props;

    if (nextProps.routeParams !== routeParams) {
      const options = Object.assign({}, nextProps.routeParams);

      if (nextProps.route.slug) {
        options[nextProps.route.slug] = true;
      }

      if (nextProps.routeParams.filter) {
        options[nextProps.routeParams.filter] = true;
      }

      dispatch(fetchData(options));
    }
  }

  fetchSectionTags() {
    const { routeParams } = this.props;

    fetch(`${API_URL}tags/?section=${routeParams.section}&title=${routeParams.tag}`)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }

        return response.json();
      })
      .then((tags) => {
        this.setState({
          tags,
        });
      });
  }

  loadMore = () => {
    const {
      dispatch,
      routeParams,
      isFetchingMore,
      next,
      page,
      route,
    } = this.props;

    if (isFetchingMore || next === null) return;

    const options = Object.assign({}, routeParams, {
      page,
    });

    if (route.slug) {
      options[route.slug] = true;
    }

    if (routeParams.filter) {
      options[routeParams.filter] = true;
    }

    dispatch(fetchData(options));
  }

  render() {
    const {
      items,
      isFetching,
      isFetchingMore,
      seo_title,
      seo_description,
      next,
      dispatch,
      isAuthenticated,
      routeParams,
      sections,
      route,
    } = this.props;

    const tags = this.state.tags;
    const infiniteScrollLoader = <Loading loading={isFetchingMore} />;
    const seoTextsObj = sections
      .filter(section => section.slug === routeParams.section)[0] || {};
    const alternativeTitle = routeParams.tags
      ? `${routeParams.tags} - ${seoTextsObj.title}`
      : seoTextsObj.title;

    return (
      <div className="container-fluid tag-page">
        <Helmet
          title={seo_title
            ? seo_title
            : alternativeTitle
          }
          meta={[
            {
              name: 'description',
              content: seo_description,
            },
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
            {seoTextsObj.title} {routeParams.tags ? ` #${routeParams.tags}` : null}
            <CardsSortItem
              to={getSectionUrl('new', routeParams.section, routeParams.tags)}
              isActive={route.slug === 'new' || (!routeParams.filter && !route.slug) || routeParams.filter === 'new'}
            >
              {__t('New')}
            </CardsSortItem>
            <CardsSortItem
              to={getSectionUrl('popular', routeParams.section, routeParams.tags)}
              isActive={route.slug === 'popular' || routeParams.filter === 'popular'}
            >
              {__t('Popular')}
            </CardsSortItem>
            <CardsSortItem
              to={getSectionUrl('nearest', routeParams.section, routeParams.tags)}
              isActive={route.slug === 'nearest' || routeParams.filter === 'nearest'}
            >
              {__t('Beside')}
            </CardsSortItem>
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
                      priceTemplate={this.props.priceTemplate}
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

SectionTag.defaultProps = {
  currentTag: '',
  currentSection: '',
};

SectionTag.propTypes = {
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isFetchingMore: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  routeParams: PropTypes.object.isRequired,
  next: PropTypes.any,
  routes: PropTypes.array.isRequired,
  currentTag: PropTypes.string,
  currentSection: PropTypes.string,
};

function mapStateToProps(state) {
  const {
    isFetching,
    items,
    page,
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
    page,
    priceTemplate: state.Settings.data.CURRENCY,
    currentTag: state.Posts.currentTag,
    currentSection: state.Posts.currentSection,
  };
}

export default connect(mapStateToProps)(SectionTag);

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Helmet from 'react-helmet';

import {
  BreadCrumbs,
  SliderBar,
  ListWithNew,
} from '../../components';

import Tag from '../../components/SliderBar/components/Tag';
import { Spin } from '../../components-lib';

import { openPopup } from '../../ducks/Popup/actions';
import { fetchPosts, fetchTags } from '../../ducks/TagSearch/actions';

import paginateHOC from '../../HOC/paginate';
import mapFiltersToProps from '../../HOC/mapFiltersToProps';

import { API_URL } from '../../config';
import { PRODUCT_TYPE, BLOG_TYPE, EVENT_TYPE } from '../../lib/constants/posts-types';
import { __t } from './../../i18n/translator';

import './Tag.styl';

const allowedTypes = new Set([PRODUCT_TYPE, BLOG_TYPE, EVENT_TYPE]);

class TagSearchResults extends Component {
  static propTypes = {
    routeParams: PropTypes.shape().isRequired,
    dispatch: PropTypes.func.isRequired,
    applyFilters: PropTypes.func.isRequired,
    updateFilter: PropTypes.func.isRequired,
    changeFiltersType: PropTypes.func.isRequired,
    updateFieldByName: PropTypes.func.isRequired,
    paginate: PropTypes.func.isRequired,
    reversePriceRange: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    filters: PropTypes.shape({
      price_from: PropTypes.string,
      price_to: PropTypes.string,
      section: PropTypes.string,
      color: PropTypes.string,
      distance: PropTypes.string,
    }).isRequired,
  };

  componentDidMount() {
    const { location, router, items } = this.props;

    if (!window.location.search.includes('?tags')) {
      router.push('/');
    }

    if (location.action === 'POP' && items.length === 0) {
      this.loadItems();
      this.loadRelativeTags();
    }

    if (location.action === 'PUSH') {
      this.loadItems();
      this.loadRelativeTags();
    }
  }

  componentDidUpdate(prevProps) {
    const { routeParams } = this.props;

    if (prevProps.routeParams !== routeParams) {
      this.loadItems();
      this.loadRelativeTags();
    }
  }

  loadRelativeTags = () => {
    const { query, dispatch } = this.props;
    const options = {
      related_with: query.tags
    };

    if (!allowedTypes.has(query.type)) {
      options.type = `${PRODUCT_TYPE}s`;
    } else {
      options.type = `${query.type}s`;
    }

    dispatch(fetchTags(options));
  }

  loadItems = () => {
    const { query: { type, ...query }, dispatch } = this.props;

    dispatch(fetchPosts(query, type));
  }

  changeCity = city => this.props.updateFieldByName('city', city.name);

  openSelectPopup = () => this.props
    .dispatch(openPopup('selectPopup', {
      onClickItem: this.changeCity,
      title: 'city',
      async: true,
      apiUrl: `${API_URL}geo/cities/`,
    }));

  clickOnTag = (tag) => {
    const { router, filters } = this.props;
    const tags = filters.tags.split(',');
    const newTags = [...tags, tag];

    router.push({
      pathname: '/find',
      query: Object.assign({}, filters, {
        tags: newTags.join(','),
      }),
    });
  }

  openMobileFilters = () => this.props
    .dispatch(openPopup('filtersPopup', {
      filters: this.props.filters,
      updateFilter: this.props.updateFilter,
      applyFilters: this.props.applyFilters,
      changeCity: this.changeCity,
    }));

  renderResultsOfSearch() {
    const { items, query } = this.props;
    const tags = query.tags || '';

    return ((items.length !== 0) &&
      <h1 className="section-title">
        <span>{__t('Search results')}</span>
        {` "${tags.split(',').join(' ')}"`}
      </h1>
    );
  }

  render() {
    const {
      tags,
      items,
      isFetching,
      filters,
      renderPaginator
    } = this.props;

    return (
      <div>
        <Helmet>
          <title>{__t('Searching on Abbigli')}</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        {
          tags.length > 0
          &&
          <SliderBar
            sliderName="slider-tags"
            items={tags}
            ItemComponent={Tag}
            itemWidth={175}
            itemProps={{ onClick: this.clickOnTag }}
          />
        }
        <main className="main">
          <BreadCrumbs />
          <div className="content">
            {this.renderResultsOfSearch()}

            {
              isFetching
                ? <div className="cards-wrap">
                  <div className="spin-wrapper">
                    <Spin visible={isFetching} />
                  </div>
                </div>
                : <ListWithNew
                  items={items}
                  count={4}
                  query={filters.tags}
                  type={PRODUCT_TYPE}
                />
            }
            {!isFetching && renderPaginator()}
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ Auth, TagSearch, Sections, Location }) => ({
  isAuthenticated: Auth.isAuthenticated,
  items: TagSearch.items,
  tags: TagSearch.tags,
  isFetching: TagSearch.isFetching,
  pagesCount: TagSearch.pagesCount,
  sections: Sections.items,

  query: Location.query
});

const enhance = compose(
  connect(mapStateToProps),
  mapFiltersToProps,
  paginateHOC
);

export default enhance(TagSearchResults);

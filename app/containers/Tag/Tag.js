import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Helmet from 'react-helmet';

import {
  BreadCrumbs,
  SliderBar,
  Filters,
  ListWithNew,
  PageSwitcher,
} from 'components';

import Tag from 'components/SliderBar/components/Tag';
import { Spin } from '../../components-lib';

import { openPopup } from 'ducks/Popup/actions';
import { fetchPosts, fetchTags } from 'ducks/TagSearch/actions';

import paginateHOC from '../../HOC/paginate';
import mapFiltersToProps from '../../HOC/mapFiltersToProps';

import { API_URL } from 'config';

import { __t } from './../../i18n/translator';

import './Tag.styl';

class TagSearchResults extends Component {
  componentDidMount() {
    const { location, items } = this.props;

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
    const { routing, dispatch } = this.props;

    dispatch(fetchTags(routing.query.tags));
  }

  loadItems = () => {
    const { routing, dispatch } = this.props;
    const options = routing.query;

    dispatch(fetchPosts(options));
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
    const newTags = filters.tags.split(',');
    newTags.push(tag);

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
    const { items, routing } = this.props;

    return ((items.length !== 0) &&
      <h1 className="section-title">
        <span>{__t('Search results')}</span>
        {routing && ` "${routing.query.tags.split(',').join(' ')}"`}
        {/* <div className="section-title__subscribe">
          {<button className="default-button" type="button">
            {__t('Subscribe')}
          </button>}
          <a
            className="filter-open"
            onClick={this.openMobileFilters}
          >
            {__t('Filters')}
          </a>
        </div>*/}
      </h1>
    );
  }

  render() {
    const {
      routeParams,
      dispatch,
      isAuthenticated,
      tags,
      pageCount,
      items,
      isFetching,
      priceTemplate,
      routing,
      sections,
      filters,
      updateFilter,
      applyFilters,
      reversePriceRange,
      paginate,
      changeFiltersType,
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
            { this.renderResultsOfSearch() }
            {/* <Filters
              sections={sections}
              activeFilters={filters}
              updateFilter={updateFilter}
              applyFilters={applyFilters}
              reversePriceRange={reversePriceRange}
              changeFiltersType={changeFiltersType}
              openCityPopup={this.openSelectPopup}
            />
            */}
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
                  itemProps={{ priceTemplate, legacy: true }}
                  query={filters.tags}
                />
            }
            {
              !isFetching
              &&
              <PageSwitcher
                count={pageCount}
                paginate={paginate}
                active={(routing && Number(routing.query.page)) || 1}
              />
            }
          </div>
        </main>
      </div>
    );
  }
}

TagSearchResults.propTypes = {
  routeParams: PropTypes.object.isRequired,
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

const mapStateToProps = ({
  Auth,
  Settings,
  TagSearch,
  routing,
  Sections }) => ({
    isAuthenticated: Auth.isAuthenticated,
    priceTemplate: Settings.data.CURRENCY,
    items: TagSearch.items,
    tags: TagSearch.tags,
    isFetching: TagSearch.isFetching,
    pageCount: TagSearch.pageCount,
    routing: routing.locationBeforeTransitions,
    sections: Sections.items,
  });

const enhance = compose(connect(mapStateToProps), mapFiltersToProps, paginateHOC);

export default enhance(TagSearchResults);

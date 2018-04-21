import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { compose } from 'recompose';

import { BreadCrumbs, SliderBar, ListWithNew } from '../../components';
import { Spin } from '../../components-lib';
import { Event } from '../../components-lib/Cards';
import BlogSection from '../../components/SliderBar/components/BlogSection';

import mapFiltersToProps from '../../HOC/mapFiltersToProps';
import paginateHOC from '../../HOC/paginate';

import { openPopup } from '../../ducks/Popup/actions';
import { fetchEvents } from '../../ducks/Events/actions';

import { EVENT_TYPE } from '../../lib/constants/posts-types';
import { API_URL } from '../../config';
import { __t } from './../../i18n/translator';

import './EventPage.less';

class EventsPage extends Component {
  componentDidMount() {
    const { items, location } = this.props;
    this.globalWrapper = document.body;
    this.globalWrapper.classList.add('event', 'blogs-page');

    if (location.action === 'POP' && items.length === 0) {
      this.loadItems();
    }

    if (location.action === 'PUSH') {
      this.loadItems();
    }
  }

  componentDidUpdate(prevProps) {
    const { query } = this.props;

    if (prevProps.query !== query) {
      this.loadItems();
    }
  }

  componentWillUnmount() {
    this.globalWrapper.classList.remove('event', 'blogs-page');
  }

  loadItems = () => {
    const { query, dispatch } = this.props;
    dispatch(fetchEvents(query));
  }

  changeCity = city => this.props
    .updateFieldByName('city', city.name);

  openSelectPopup = () => this.props
    .dispatch(openPopup('selectPopup', {
      onClickItem: this.changeCity,
      title: 'city',
      async: true,
      apiUrl: `${API_URL}geo/cities/`,
    }));

  openMobileFilters = () => this.props
    .dispatch(openPopup('filtersPopup', {
      filters: this.props.filters,
      updateFilter: this.props.updateFilter,
      applyFilters: this.props.applyFilters,
      changeCity: this.changeCity,
      type: '3',
    }));

  render() {
    const {
      sections,
      query,
      isFetching,
      items,
      renderPaginator } = this.props;
    const section = sections.filter(item => item.slug === query.category)[0];

    const crumbs = [{
      title: __t('Events'),
      url: '/events',
    }];

    if (section) {
      crumbs.push({
        title: section.title,
        url: `/events?section=${section.slug}`,
      });
    }

    return (
      <main className="main">
        <BreadCrumbs
          crumbs={crumbs}
        />
        <div className="content">
          <h1 className="section-title">
            <svg className="icon icon-event" viewBox="0 0 27 26">
              <path d="M22.2,3v2.1c0,2-1.6,3.5-3.5,3.5S15.1,7,15.1,5.1V3h-2.9v2.1c0,2-1.6,3.5-3.5,3.5 S5.1,7,5.1,5.1V3H0V26h27V3H22.2z M8.8,22.8H4.2v-4h4.5V22.8z M8.8,15.7H4.2v-4h4.5V15.7z M15.8,22.8h-4.5v-4h4.5V22.8z M15.8,15.7 h-4.5v-4h4.5V15.7z M18.2,22.8v-4h4.5L18.2,22.8z M22.8,15.7h-4.5v-4h4.5V15.7z" />
              <path d="M8.6,6.9c1,0,1.8-0.8,1.8-1.8V1.8c0-1-0.8-1.8-1.8-1.8S6.8,0.8,6.8,1.8v3.3 C6.8,6.1,7.6,6.9,8.6,6.9z" />
              <path d="M18.6,6.9c1,0,1.8-0.8,1.8-1.8V1.8c0-1-0.8-1.8-1.8-1.8s-1.8,0.8-1.8,1.8v3.3 C16.8,6.1,17.6,6.9,18.6,6.9z" />
            </svg>
            {__t('Events')}
            {section && `- ${section.title}`}
          </h1>
          {
            sections.length > 0
            &&
            <SliderBar
              sliderName="slider-category"
              items={sections}
              ItemComponent={BlogSection}
              itemWidth={120}
              itemProps={{
                baseUrl: '/events',
                isBlog: true,
              }}
            />
          }
          {/* <a
            className="filter-open"
            onClick={this.openMobileFilters}
          >
            Фильтры
          </a>

          <EventsFilters
            filters={filters}
            applyFilters={applyFilters}
            updateFilter={updateFilter}
            openCityPopup={this.openSelectPopup}
          /> */}
          {
            isFetching
            ? <div className="cards-wrap">
              <div className="spin-wrapper">
                <Spin visible={isFetching} />
              </div>
            </div>
              : <ListWithNew
                items={items}
                itemsType={EVENT_TYPE}
                itemProps={{ legacy: true }}
                count={8}
                ItemComponent={Event}
              />
          }
          {!isFetching && renderPaginator()}
        </div>
      </main>
    );
  }
}

EventsPage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  updateFieldByName: PropTypes.func.isRequired,
  paginate: PropTypes.func.isRequired,
  pages: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  const events = state.Events;
  const auth = state.Auth;

  return {
    items: events.page.items,
    isFetching: events.eventsFetchingState,
    isAuthenticated: auth.isAuthenticated,
    geoCity: state.Geo.city,
    sections: state.Sections.items,
    query: state.Location.query,
    pagesCount: events.page.count,
  };
}

const enhance = compose(connect(mapStateToProps), mapFiltersToProps, paginateHOC);

export default enhance(EventsPage);

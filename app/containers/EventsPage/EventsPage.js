import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { compose } from 'recompose';

import { BreadCrumbs, SliderBar, ListWithNew, Loading, PageSwitcher } from 'components';
import { Event } from 'components/Cards';
import { EventsFilters } from 'components/Filters';
import BlogSection from 'components/SliderBar/components/BlogSection';

import mapFiltersToProps from '../../HOC/mapFiltersToProps';
import paginateHOC from '../../HOC/paginate';


import { openPopup } from 'ducks/Popup/actions';
import { fetchData, changeSearchField } from 'ducks/Events';
import { API_URL } from 'config';
import { __t } from './../../i18n/translator';

import './EventPage.less';

const newData = [{
  id: 0,
  type: 4,
  title: 'Blog title',
  author: {
    name: 'Mike',
  },
},
{
  id: 1,
  type: 3,
  title: 'Event title',
  date: '22.07.2017',
  author: {
    name: 'Mike',
  },
}];

class EventsPage extends Component {
  componentDidMount() {
    const { items, location } = this.props;
    this.globalWrapper = document.querySelector('.global-wrapper');
    this.globalWrapper.classList.add('event');

    if (location.action === 'POP' && items.length === 0) {
      this.loadItems();
    }

    if (location.action === 'PUSH') {
      this.loadItems();
    }
  }

  componentDidUpdate(prevProps) {
    const { routing } = this.props;

    if (prevProps.routing !== routing) {
      this.loadItems();
    }
  }

  componentWillUnmount() {
    this.globalWrapper.classList.remove('event');
  }

  loadItems = () => {
    const { routing, dispatch } = this.props;
    const options = Object.assign({}, routing.query, {
      type: 3,
    });

    dispatch(fetchData(options));
  }

  handleChangeField = ({ target }) => this.props
    .dispatch(changeSearchField(target.name, target.value));

  changeCity = city => this.props.updateFieldByName('city', city.name);

  openSelectPopup = () => this.props
    .dispatch(openPopup('selectPopup', {
      onClickItem: this.changeCity,
      title: 'city',
      async: true,
      apiUrl: `${API_URL}geo/cities/`,
    }));

  render() {
    const {
      sections,
      routing,
      isFetching,
      items,
      filters,
      applyFilters,
      updateFilter,
      pages,
      paginate,
    } = this.props;
    const section = sections.filter(item => routing && item.slug === routing.query.section)[0];

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
          </h1>
          {/* {
            sections.length > 0
            &&
            <SliderBar
              sliderName="slider-category"
              items={sections}
              ItemComponent={BlogSection}
              itemWidth={120}
              itemProps={{ baseUrl: '/events' }}
            />
          } */}
          <EventsFilters
            filters={filters}
            applyFilters={applyFilters}
            updateFilter={updateFilter}
            openCityPopup={this.openSelectPopup}
          />
          {
            isFetching
              ? <div className="cards-wrap"><Loading loading={isFetching} /></div>
              : <ListWithNew
                items={items}
                newItems={newData}
                itemProps={{ legacy: true }}
                count={8}
                ItemComponent={Event}
              />
          }
          {
            !isFetching
            &&
            <PageSwitcher
              active={(routing && Number(routing.query.page || 1)) || 1}
              count={pages}
              paginate={paginate}
            />
          }
        </div>
      </main>
    );
  }
}

EventsPage.propTypes = {
  items: PropTypes.array.isRequired,
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
    items: events.items,
    isFetching: events.isFetching,
    next: events.next,
    isFetchingMore: events.isFetchingMore,
    isAuthenticated: auth.isAuthenticated,
    page: events.page,
    city: events.searchFields.city,
    start: events.searchFields.start,
    end: events.searchFields.end,
    geoCity: state.Geo.city,
    sections: state.Sections.items,
    routing: state.routing.locationBeforeTransitions,
    pages: events.pages,
  };
}

const enhance = compose(connect(mapStateToProps), mapFiltersToProps, paginateHOC);

export default enhance(EventsPage);

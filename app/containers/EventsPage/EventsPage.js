import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { compose } from 'recompose';

import { BreadCrumbs, SliderBar, ListWithNew, SliderBarCard } from '../../components';
import { Spin } from '../../components-lib';
import { Event } from '../../components-lib/Cards';

import mapFiltersToProps from '../../HOC/mapFiltersToProps';
import paginateHOC from '../../HOC/paginate';

import { fetchEvents } from '../../ducks/Events/actions';

import { EVENT_TYPE } from '../../lib/constants/posts-types';
import { __t } from './../../i18n/translator';

import './EventPage.less';

class EventsPage extends Component {
  componentDidMount() {
    const { items, location } = this.props;
    this.globalWrapper = document.body;

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

  loadItems = () => {
    const { query, dispatch, params } = this.props;
    dispatch(fetchEvents({
      ...query,
      category: params.category
    }));
  }

  render() {
    const {
      categories,
      query,
      isFetching,
      items,
      renderPaginator } = this.props;

    const category = categories.filter(item => item.slug === query.category)[0];

    const crumbs = [{
      title: __t('Events'),
      url: '/events',
    }];

    if (category) {
      crumbs.push({
        title: category.title,
        url: category.url,
      });
    }

    return (
      <main className="main EventsPage">
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

            {category && `- ${category.title}`}
          </h1>

          <SliderBar
            items={categories}
            ItemComponent={SliderBarCard}
          />

          {isFetching ? (
            <div className="cards-wrap">
              <div className="spin-wrapper">
                <Spin visible={isFetching} />
              </div>
            </div>
          ) : (
            <ListWithNew
              items={items}
              itemsType={EVENT_TYPE}
              itemProps={{ legacy: true }}
              count={8}
              ItemComponent={Event}
            />
            )
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
    categories: state.Sections.eventsCategories,
    query: state.Location.query,
    pagesCount: events.page.count,
  };
}

const enhance = compose(connect(mapStateToProps), mapFiltersToProps, paginateHOC);

export default enhance(EventsPage);

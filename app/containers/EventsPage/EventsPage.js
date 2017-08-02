import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

import moment from 'moment';

import { BreadCrumbs, SliderBar, ListWithNew, Loading } from 'components';
import { Event } from 'components/Cards';
import { EventsFilters } from 'components/Filters';
import BlogSection from 'components/SliderBar/components/BlogSection';

import { openPopup, closePopup } from 'ducks/Popup/actions';

import { fetchData as fetchDataEvents, changeSearchField } from 'ducks/Events';
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
  constructor(props) {
    super(props);
    this.state = {
      popular: false,
    };
  }

  componentWillMount() {
    const { dispatch, items, location, geoCity, city } = this.props;

    if (location.action === 'POP' && items.length === 0) {
      dispatch(fetchDataEvents(1));
    }

    if (location.action === 'PUSH') {
      dispatch(fetchDataEvents(1));
    }
  }

  componentDidMount() {
    this.globalWrapper = document.querySelector('.global-wrapper');
    this.globalWrapper.classList.add('event');
  }

  componentWillUnmount() {
    this.globalWrapper.classList.remove('event');
  }

  setFilter = (filter) => {
    const { dispatch } = this.props;

    this.setState({
      popular: filter,
      city: null,
      start: null,
      end: null,
    });

    dispatch(fetchDataEvents(1, filter));
  }

  handleChangeField = ({ target }) => this.props
    .dispatch(changeSearchField(target.name, target.value));

  search = () => {
    const { city, start, end, dispatch } = this.props;

    if (city || start || end) {
      this.setState({
        popular: false,
      });

      dispatch(closePopup());
      dispatch(fetchDataEvents(1, false, city,
        moment(start).format('YYYY-MM-DDThh:mm'),
        moment(end).format('YYYY-MM-DDThh:mm')
      ));
    }
  }

  loadMore = () => {
    const { popular } = this.state;
    const {
      dispatch,
      isFetchingMore,
      next,
      page,
      city,
      start,
      end,
    } = this.props;

    if (isFetchingMore || next === null) return;

    dispatch(fetchDataEvents(page, popular, city, start, end));
  }

  changeCity = city => this.props.dispatch(changeSearchField('city', city));


  openMobileModal = () => this.props
    .dispatch(openPopup('eventSearch', {
      findEvents: this.search,
    }));

  openSelectPopup = () => this.props
    .dispatch(openPopup('selectPopup', {
      onClickItem: this.changeCity,
      title: 'city',
      async: true,
      apiUrl: `${API_URL}geo/cities/`,
    }));

  render() {
    const { sections, routing, isFetching, items } = this.props;
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
          {
            sections.length > 0
            &&
            <SliderBar
              sliderName="slider-category"
              items={sections}
              ItemComponent={BlogSection}
              itemWidth={120}
              itemProps={{ baseUrl: '/events' }}
            />
          }
          <EventsFilters />
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
        </div>
      </main>
    );
  }
}

EventsPage.propTypes = {
  itemsEvents: PropTypes.array.isRequired,
  isFetchingEvents: PropTypes.bool.isRequired,
  isFetchingMore: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  next: PropTypes.any,
  geoCity: PropTypes.shape({
    name: PropTypes.string,
    country: PropTypes.object,
  }),
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
  };
}

export default connect(mapStateToProps)(EventsPage);

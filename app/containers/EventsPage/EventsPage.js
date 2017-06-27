import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import { DateInput } from 'components/Inputs';

import moment from 'moment';

import {
  CardsWrap,
  CardsSort,
  EventCard,
  Loading,
} from 'components';

import { openPopup, closePopup } from 'ducks/Popup/actions';

import { fetchData as fetchDataEvents, changeSearchField } from 'ducks/Events';
import { API_URL } from 'config';
import { __t } from './../../i18n/translator';

import './EventPage.styl';

class EventsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popular: false,
    };
  }

  componentWillMount() {
    const { dispatch, itemsEvents, location, geoCity, city } = this.props;

    if (location.action === 'POP' && itemsEvents.length === 0) {
      dispatch(fetchDataEvents(1));
    }

    if (location.action === 'PUSH') {
      dispatch(fetchDataEvents(1));
    }

    if (!city && geoCity) {
      dispatch(changeSearchField('city', {
        name: `${geoCity.name}, ${geoCity.country.name}`,
        id: geoCity.id,
      }));
    }
  }

  componentDidUpdate() {
    const { dispatch, geoCity, city } = this.props;

    if (!city && geoCity) {
      dispatch(changeSearchField('city', {
        name: `${geoCity.name}, ${geoCity.country.name}`,
        id: geoCity.id,
      }));
    }
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
    const {
      isFetchingEvents,
      itemsEvents,
      isFetchingMore,
      dispatch,
      isAuthenticated,
      city,
      start,
      end,
    } = this.props;
    const { popular } = this.state;

    const loader = <Loading loading={isFetchingMore} />;

    return (
      <div className="container-fluid events-page">
        <CardsWrap legacy>
          <CardsSort>

            <div className="cards-sort__page">
              <div className="cards-sort__icon">
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 36">
                  <path d="M29,36H3c-1.657,0-3-1.344-3-3V7c0-1.656,1.343-3,3-3h1V0h4v4h16V0h4 v4h1c1.657,0,3,1.343,3,3v26C32,34.656,30.657,36,29,36z M29,14H3v19h26V14z M26,30h-8v-8h8V30z" />
                </svg>
              </div>
            </div>
            {__t('events')}
            <a
              className={`cards-sort__item ${popular ? '' : 'cards-sort__item--active'}`}
              onClick={() => this.setFilter(false)}
            >
              {__t('New')}
            </a>
            <a
              className={`cards-sort__item ${popular ? 'cards-sort__item--active' : ''}`}
              onClick={() => this.setFilter(true)}
            >
              {__t('Popular')}
            </a>
            <div className="search-event-wrap">
              <form className="search-event">
                <div className="selectize-address">
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.6 18">
                    <path d="M6.3,0C2.817,0,0,2.816,0,6.3C0,11.025,6.3,18,6.3,18s6.3-6.975,6.3-11.7C12.6,2.816,9.785,0,6.3,0z M6.3,8.55 c-1.242,0-2.25-1.008-2.25-2.25S5.058,4.05,6.3,4.05c1.241,0,2.25,1.008,2.25,2.25S7.542,8.55,6.3,8.55z" />
                  </svg>
                  <div className="selectize-control single">
                    <div className="selectize-input items not-full">
                      <input
                        name="city"
                        placeholder={__t('city')}
                        value={(city && city.name) || ''}
                        onClick={this.openSelectPopup}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="input-wrap input-date"
                >
                  <DateInput
                    name="start"
                    onChange={this.handleChangeField}
                    placeholder={__t('Date.from')}
                    className="input events__search-input"
                    value={start}
                    mustFormat={false}
                    format="YYYY-MM-DD"
                  />
                </div>
                <div
                  className="input-wrap input-date"
                >
                  <DateInput
                    name="end"
                    onChange={this.handleChangeField}
                    placeholder={__t('Date.to')}
                    className="input events__search-input"
                    value={end}
                    mustFormat={false}
                    format="YYYY-MM-DD"
                  />
                </div>
                <button
                  className="search-submit-button"
                  type="button"
                  onClick={this.search}
                >
                  {__t('Find.the.event')}
                </button>
              </form>
            </div>
          </CardsSort>
          <button
            className="search-submit-button event-search__button--mobile"
            type="button"
            onClick={this.openMobileModal}
          >
            {__t('Find.the.event')}
          </button>
          {
            isFetchingEvents
              ? <Loading loading={isFetchingEvents} />
              : <InfiniteScroll
                loadMore={this.loadMore}
                loader={loader}
                hasMore={!!this.props.next}
              >
                {
                  itemsEvents.length > 0
                    ? itemsEvents.map(item => <EventCard
                      key={'event' + item.id}
                      data={item}
                      legacy
                      dispatch={dispatch}
                      isAuthenticated={isAuthenticated}
                    />)
                    : <div className="pages__error-text">{__t('Not results for your request')}</div>
                }
              </InfiniteScroll>
          }
        </CardsWrap>
      </div>
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
    itemsEvents: events.items,
    isFetchingEvents: events.isFetching,
    next: events.next,
    isFetchingMore: events.isFetchingMore,
    isAuthenticated: auth.isAuthenticated,
    page: events.page,
    city: events.searchFields.city,
    start: events.searchFields.start,
    end: events.searchFields.end,
    geoCity: state.Geo.city,
  };
}

export default connect(mapStateToProps)(EventsPage);

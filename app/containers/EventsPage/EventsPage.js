import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import DayPicker, { DateUtils } from 'react-day-picker';

import moment from 'moment';

import {
  CardsWrap,
  CardsSort,
  EventCard,
  Loading,
  SelectInput,
} from 'components';

import { openPopup, closePopup } from 'ducks/Popup/actions';

import { fetchData as fetchDataEvents } from 'ducks/Events';
import { API_URL } from 'config';
import { __t } from './../../i18n/translator';

import './EventPage.styl';

const overlayStyle = {
  position: 'absolute',
  background: 'white',
  boxShadow: '0 2px 5px rgba(0, 0, 0, .15)',
  zIndex: '100',
  left: '-12px'
};

class EventsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: null,
      start: null,
      end: null,
      popular: false,
    };

    this.input = null;
    this.daypickerFrom = null;
    this.daypickerTo = null;
    this.clickedFromInside = false;
    this.clickFromTimeout = null;
    this.clickedToInside = false;
    this.clicktToTimeout = null;
  }

  componentDidMount() {
    const { dispatch, page, itemsEvents } = this.props;

    if (itemsEvents.length === 0) {
      dispatch(fetchDataEvents(page));
    }
  }

  handleInputFocus(event, calendar) {
    switch (calendar) {
      case 'from':
        this.setState({
          showDayFromOverlay: true,
        });
        break;
      case 'to':
        this.setState({
          showDayToOverlay: true,
        });
        break;
    }
  }

  handleContainerMouseDown(e, calendar) {
    switch (calendar) {
      case 'from':
        this.clickedFromInside = true;
        this.clickFromTimeout = setTimeout(() => {
          this.clickedFromInside = false;
        }, 0);
        break;
      case 'to':
        this.clickedToInside = true;
        this.clickToTimeout = setTimeout(() => {
          this.clickedToInside = false;
        }, 0);
        break;
    }
  }

  handleInputBlur(event, calendar) {
    switch (calendar) {
      case 'from': {
        const showDayFromOverlay = this.clickedFromInside;

        this.setState({
          showDayFromOverlay,
        });

        break;
      }
      case 'to': {
        const showDayToOverlay = this.clickedToInside;

        this.setState({
          showDayToOverlay,
        });

        break;
      }
    }
  }

  handleDayClick(e, day, calendar) {
    switch (calendar) {
      case 'from':
        this.setState({
          start: moment(day).format('YYYY-MM-DD'),
          selectedDayFrom: day,
          showDayFromOverlay: false,
        });
        break;
      case 'to':
        this.setState({
          end: moment(day).format('YYYY-MM-DD'),
          selectedDayTo: day,
          showDayToOverlay: false,
        });
        break;
    }
  }

  handleInputChange(e, calendar) {
    switch (calendar) {
      case 'from':
        const { valueFrom } = e.target;
        const momentDayFrom = moment(valueFrom, 'L', true);
        if (momentDayFrom.isValid()) {
          this.setState({
            selectedDayFrom: momentDayFrom.toDate(),
            dayFrom: valueFrom,
          }, () => {
            this.daypickerFrom.showMonth(this.state.selectedDayFrom);
          });
        } else {
          this.setState({ dayFrom: valueFrom, selectedDayFrom: null });
        }
        break;
      case 'to':
        const { valueTo } = e.target;
        const momentDayTo = moment(valueTo, 'L', true);
        if (momentDayTo.isValid()) {
          this.setState({
            selectedDayTo: momentDayTo.toDate(),
            dayTo: valueTo,
          }, () => {
            this.daypickerTo.showMonth(this.state.selectedDayTo);
          });
        } else {
          this.setState({ dayTo: valueTo, selectedDayTo: null });
        }
        break;
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

  search = () => {
    const { city, start, end } = this.state;
    const { dispatch } = this.props;

    if (city || start || end) {
      this.setState({
        popular: false,
      });

      dispatch(fetchDataEvents(1, false, city, start, end));
    }
  }

  mobileSearch = (city, start, end) => {
    const { dispatch } = this.props;

    if (city || start || end) {
      this.setState({
        popular: false,
        openMobileSearch: false,
      });

      dispatch(closePopup());
      dispatch(fetchDataEvents(1, false, city, start, end));
    }
  }

  loadMore = () => {
    const { city, start, end, popular } = this.state;
    const { dispatch, isFetchingMore, next, page } = this.props;

    if (isFetchingMore || next === null) return;

    dispatch(fetchDataEvents(page, popular, city, start, end));
  }

  changeCity = (city) => {
    this.setState({
      city,
    });
  }

  openMobileModal = () => this.props
    .dispatch(openPopup('eventSearch', {
      findEvents: this.mobileSearch,
    }))


  render() {
    const {
      isFetchingEvents,
      itemsEvents,
      isFetchingMore,
      dispatch,
      isAuthenticated,
    } = this.props;
    const { city, popular } = this.state;

    const loader = <Loading loading={isFetchingMore} />;

    const wrapperClass = this.state.openMobileSearch
      ? 'container-fluid events-page modal-open-new'
      : 'container-fluid events-page';

    return (
      <div className={wrapperClass}>
        <CardsWrap legacy>
          <CardsSort>

            <div className="cards-sort__page">
              <div className="cards-sort__icon">
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 36">
                  <path d="M29,36H3c-1.657,0-3-1.344-3-3V7c0-1.656,1.343-3,3-3h1V0h4v4h16V0h4 v4h1c1.657,0,3,1.343,3,3v26C32,34.656,30.657,36,29,36z M29,14H3v19h26V14z M26,30h-8v-8h8V30z"/>
                </svg>
              </div>
              {__t('events')}
            </div>
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
            <button
              className="search-submit-button"
              type="button"
              onClick={this.openMobileModal}
            >
              {__t('Find.the.event')}
            </button>
            <div className="search-event-wrap">
              <form className="search-event">
                <div className="selectize-address">
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg"	 viewBox="0 0 12.6 18">
                    <path d="M6.3,0C2.817,0,0,2.816,0,6.3C0,11.025,6.3,18,6.3,18s6.3-6.975,6.3-11.7C12.6,2.816,9.785,0,6.3,0z M6.3,8.55 c-1.242,0-2.25-1.008-2.25-2.25S5.058,4.05,6.3,4.05c1.241,0,2.25,1.008,2.25,2.25S7.542,8.55,6.3,8.55z"/>
                  </svg>
                  <div
                    className={`selectize-control single`}
                  >
                    <SelectInput
                      apiPath={`${API_URL}geo/cities/`}
                      inputWrapperClass="selectize-input items not-full"
                      wrapperActiveClass="selectize-input--active"
                      inputClass=""
                      resultsFieldWrapperClass="selectize-input__results"
                      placeholder={__t('city')}
                      onSelectValue={this.changeCity}
                      currentValue={city}
                    />
                  </div>
                </div>
                <div
                  className="input-wrap input-date"
                  onMouseDown={(e) => this.handleContainerMouseDown(e, 'from')}
                >
                  <input
                    id="start-event"
                    ref={(el) => { this.input = el; }}
                    value={this.state.start || undefined}
                    onChange={(e) => this.handleInputChange(e, 'from')}
                    onFocus={(e) => this.handleInputFocus(e, 'from')}
                    onBlur={(e) => this.handleInputBlur(e, 'from')}
                    className="input events__search-input"
                    type="text"
                    placeholder={__t('Date.from')}
                  />
                  {
                    this.state.showDayFromOverlay
                      &&
                    <div style={{ position: 'relative' }}>
                      <div style={overlayStyle}>
                        <DayPicker
                          ref={(el) => { this.daypickerFrom = el; }}
                          initialMonth={this.state.selectedDayFrom || undefined}
                          onDayClick={(e, day) => this.handleDayClick(e, day, 'from')}
                          selectedDays={day => DateUtils.isSameDay(this.state.selectedDayFrom, day)}
                        />
                      </div>
                    </div>
                  }
                </div>
                <div
                  className="input-wrap input-date"
                  onMouseDown={(e) => this.handleContainerMouseDown(e, 'to')}
                >
                  <input id="end-event"
                    ref={(el) => { this.input = el; }}
                    value={this.state.end || undefined}
                    onChange={(e) => this.handleInputChange(e, 'to')}
                    onFocus={(e) => this.handleInputFocus(e, 'to')}
                    onBlur={(e) => this.handleInputBlur(e, 'to')}
                    className="input input events__search-input"
                    type="text"
                    placeholder={__t('Date.to')}
                  />
                  {
                    this.state.showDayToOverlay
                    &&
                    <div style={{ position: 'relative' }}>
                      <div style={overlayStyle}>
                        <DayPicker
                          ref={(el) => { this.daypickerTo = el; }}
                          initialMonth={this.state.selectedDayTo || undefined}
                          onDayClick={(e, day) => this.handleDayClick(e, day, 'to')}
                          selectedDays={day => DateUtils.isSameDay(this.state.selectedDayTo, day)}
                        />
                      </div>
                    </div>
                  }
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
            <div className="popup-wrap" id="event-search-popup" style={{ display: 'none' }}>
              <div className="popup">
                <svg className="popup-close icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14.031">
<path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618
	L8.409,7.016L14,1.414z"/>
</svg>

                <div className="popup-title">{__t('Search.in.the.section')}</div>
                <form className="popup-form">
                  <div className="selectize-address">
                    <svg className="icon" xmlns="http://www.w3.org/2000/svg"	 viewBox="0 0 12.6 18">
<path d="M6.3,0C2.817,0,0,2.816,0,6.3C0,11.025,6.3,18,6.3,18s6.3-6.975,6.3-11.7C12.6,2.816,9.785,0,6.3,0z M6.3,8.55
	c-1.242,0-2.25-1.008-2.25-2.25S5.058,4.05,6.3,4.05c1.241,0,2.25,1.008,2.25,2.25S7.542,8.55,6.3,8.55z"/>
</svg>
                    <select id="eventSearch" placeholder={__t('city')}></select></div>
                  <div className="input-wrap input-date">
                    <input
                      id="start-event"
                      className="input"
                      type="text"
                      placeholder={__t('Date.from')}
                    />
                  </div>
                  <div className="input-wrap input-date">
                    <input
                      id="end-event"
                      className="input"
                      type="text"
                      placeholder={__t('Date.to')}
                    />
                  </div>
                  <button
                    className="search-submit-button"
                    type="submit"
                  >
                    {__t('Find.the.event')}
                  </button>
                </form>
              </div>
            </div>

          </CardsSort>
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
                      key={'event'+item.id}
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
};

function mapStateToProps(state) {
  const events = (state.Events) || { isFetching: true, items: [], next: null };
  const auth = state.Auth || {
    isAuthenticated: false,
  };

  return {
    itemsEvents: events.items,
    isFetchingEvents: events.isFetching,
    next: events.next,
    isFetchingMore: events.isFetchingMore,
    isAuthenticated: auth.isAuthenticated,
    page: events.page,
  };
}

export default connect(mapStateToProps)(EventsPage);

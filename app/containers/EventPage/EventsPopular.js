import React, { Component, PropTypes } from 'react';
import {
    CardsWrap,
    EventCard,
    Loading
} from 'components'
import Helmet from 'react-helmet';
import { connect } from 'preact-redux';
import { fetchData as fetchDataEvents, setData as setDataEvents } from 'ducks/EventsPopular'
import { Link } from 'react-router';
import { __t } from './../../i18n/translator';

class EventsPopular extends React.Component {


    componentDidMount () {
        const { dispatch } = this.props;
        dispatch(fetchDataEvents());
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.routes !== this.props.routes) {
            const { dispatch } = this.props;
            dispatch(setDataEvents());
        }
    }


    render(){

        const {
            isFetchingEvents,
            itemsEvents
        } = this.props;

        return (
            <CardsWrap>
                <div className="cards-wrap__title">{ __t('The.selection.of.participants') }</div>
                {(!isFetchingEvents && itemsEvents.length > 0) && itemsEvents.slice(0,6).map( (item)=>(
                    <EventCard data={item}></EventCard>
                ) )}
            </CardsWrap>
        );
    }
}

EventsPopular.propTypes = {
    isFetchingEvents: PropTypes.bool.isRequired,
    itemsEvents: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const events = (state.EventsPopular) || { isFetching: true,  items: [] };

    return {
        itemsEvents: events.items,
        isFetchingEvents: events.isFetching,
    }
}

export default connect(mapStateToProps)(EventsPopular)
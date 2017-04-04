import React, { Component, propTypes, PropTypes } from 'react';
import {
    CardsWrap,
    EventCard,
    Loading
} from 'components'
import Helmet from 'react-helmet';
import { connect } from 'preact-redux';
import { fetchData as fetchDataBlogs, setData as setDataBlogs } from 'ducks/BlogsPopular'
import { Link } from 'react-router';
import { __t } from './../../i18n/translator';

class BlogsPopular extends React.Component {


    componentDidMount () {
        const { dispatch } = this.props;
        dispatch(fetchDataBlogs());
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.routes !== this.props.routes) {
            const { dispatch } = this.props;
            dispatch(setDataBlogs());
        }
    }


    render(){

        const {
            isFetchingBlogs,
            itemsBlogs
        } = this.props;

        return (
            <CardsWrap>
                <div className="cards-wrap__title">{ __t('The.selection.of.participants') }</div>
                {(!isFetchingBlogs && itemsBlogs.length > 0) && itemsBlogs.slice(0,6).map( (item)=>(
                    <EventCard key={`${item.slug}--popular`} data={item}></EventCard>
                ) )}
            </CardsWrap>
        );
    }
}

BlogsPopular.propTypes = {
    isFetchingBlogs: PropTypes.bool.isRequired,
    itemsBlogs: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const Blogs = (state.BlogsPopular) || { isFetching: true,  items: [] };

    return {
        itemsBlogs: Blogs.items,
        isFetchingBlogs: Blogs.isFetching,
    }
}

export default connect(mapStateToProps)(BlogsPopular)
import React, { Component, PropTypes } from 'react';
import { connect } from 'preact-redux';

import {
  TileWrap,
  Banner,
  Loading,
  HR,
  BlogCard,
  EventCard,
  CardUni,
  BannerBlue,
  HomeSlider,
  Link,
} from 'components'

import { fetchData as fetchDataBlogs } from 'ducks/Blogs';
import { fetchData as fetchDataEvents } from 'ducks/Events';
import { fetchData as fetchDataProducts } from 'ducks/Products';
import { __t } from './../../i18n/translator';

import './Home.styl';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLoaded: false,
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(fetchDataBlogs());
    dispatch(fetchDataEvents());
    dispatch(fetchDataProducts());
  }

  componentDidMount() {
    this.setState({
      pageLoaded: true,
    });
  }

  render() {
    const {
      isFetchingSections,
      isFetchingBlogs,
      isFetchingEvents,
      itemsSections,
      itemsBlogs,
      itemsEvents,
      isFetchingProducts,
      itemsProducts,
    } = this.props;

    return (
      <div className="container-fluid main-page">
        <Banner />
        {
          (!isFetchingSections && itemsSections.length > 0)
            &&
          <HomeSlider itemsSections={itemsSections} />
        }
        <Loading loading={isFetchingSections} />

        <BannerBlue />

        <HR color={'blue'} />

        <TileWrap>
          <h3>
            { __t('Display.for.sale.their.works') }
          </h3>

          {
            (!isFetchingProducts && itemsProducts.length > 0)
              &&
            itemsProducts
              .slice(0, 8)
              .map(item => <CardUni
                item={item}
                key={`${item.slug}--top`}
              />)
          }
        </TileWrap>
        <Loading loading={isFetchingProducts} />

        <Link to="/new-products/" className="show-more">
          { __t('read more') }
        </Link>

        <HR color={'green'} />
        <TileWrap>
          <h3>
            { __t('Share.with.the.world.the.thoughts.and.ideas.of.his.work') }
          </h3>
          {
            (!isFetchingBlogs && itemsBlogs.length > 0)
              &&
            itemsBlogs
              .slice(0, 8)
              .map(item => <BlogCard
                data={item}
                key={`${item.slug}--blogs`}
              />)
          }
        </TileWrap>
        <Loading loading={isFetchingBlogs} />

        <Link to="/blogs" className="show-more">
          { __t('read more') }
        </Link>

        <HR color={'purple'} />

        <TileWrap>
          <h3>
            { __t('Share.information.about.your.master.class.creative.event.exhibition') }
          </h3>
          {
            (!isFetchingEvents && itemsEvents.length > 0)
              &&
            itemsEvents
              .slice(0, 8)
              .map(item => <EventCard
                data={item}
                key={`${item.slug}--events`}
              />)
          }
        </TileWrap>
        <Loading loading={isFetchingEvents} />

        <Link to="/events" className="show-more">
          { __t('read more') }
        </Link>

        <HR color={'orange'} />

        <div className="map">
          <img className="map-img" src="/media/map.jpg" />
        </div>

        <div className="pre-footer">
          <div className="w-inner">

            <h3>{__t('abbigli.about.header')}</h3>
            <p>
              {__t('abbigli.about.p1')}
            </p>
            <p>
              {__t('abbigli.about.p2')}
            </p>
            <p>
              {__t('abbigli.about.p3')}
            </p>
            <p>
              {__t('abbigli.about.p4')}
            </p>
            <p>
              {__t('abbigli.about.p5')}
            </p>
          </div>
          <div className="show-more">
            { __t('Continue') }
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  itemsSections: PropTypes.array.isRequired,
  isFetchingSections: PropTypes.bool.isRequired,
  itemsBlogs: PropTypes.array.isRequired,
  isFetchingBlogs: PropTypes.bool.isRequired,
  itemsEvents: PropTypes.array.isRequired,
  isFetchingEvents: PropTypes.bool.isRequired,
  itemsProducts: PropTypes.array.isRequired,
  isFetchingProducts: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const sections = state.Sections;
  const blogs = state.Blogs;
  const events = state.Events;
  const products = state.Products;

  return {
    itemsSections: sections.items,
    isFetchingSections: sections.isFetching,

    itemsBlogs: blogs.items,
    isFetchingBlogs: blogs.isFetching,

    itemsEvents: events.items,
    isFetchingEvents: events.isFetching,

    itemsProducts: products.items,
    isFetchingProducts: products.isFetching,
  }
}

export default connect(mapStateToProps)(Home)
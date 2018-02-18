import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  TileWrap,
  Banner,
  Loading,
  HR,
  BannerBlue,
  Link,
} from '../../components';

import { Uni, Goods } from '../../components/Cards';

import { fetchData as fetchDataBlogs } from '../../ducks/Blogs';
import { fetchData as fetchDataEvents } from '../../ducks/Events';
import { fetchData as fetchDataProducts } from '../../ducks/Products';
import { stagedPopup } from '../../ducks/Auth/authActions';
import { __t } from './../../i18n/translator';

import './Home.styl';


class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchDataBlogs({ type: 4 }));
    dispatch(fetchDataEvents({ type: 3 }));
    dispatch(fetchDataProducts());
  }

  showRegister = () => {
    const { dispatch } = this.props;

    dispatch(stagedPopup('register'));
  }

  handleOpenCreating = () => {
    if (this.props.isAuthenticated) {
      this.props.router.push('/post/new');
    } else {
      this.showRegister();
    }
  }

  render() {
    const {
      isFetchingBlogs,
      isFetchingEvents,
      itemsBlogs,
      itemsEvents,
      isFetchingProducts,
      itemsProducts,
      isAuthenticated,
      priceTemplate,
    } = this.props;

    return (
      <div className="container-fluid main-page">
        <Banner
          handleOpenCreating={this.handleOpenCreating}
        />

        <BannerBlue
          hideJoin={isAuthenticated}
          join={this.showRegister}
        />

        <HR color={'blue'} />

        <div className="home__title-wrapper">
          <h3 className="home__section-text">
            {__t('Display.for.sale.their.works')}
          </h3>
        </div>
        <TileWrap>
          {
            (!isFetchingProducts && itemsProducts.length > 0)
            &&
            itemsProducts
              .slice(0, 8)
              .map(item => <Goods
                item={item}
                key={`${item.slug}--top`}
                priceTemplate={priceTemplate}
                isAuth={isAuthenticated}
              />)
          }
        </TileWrap>
        <Loading loading={isFetchingProducts} />

        <Link to="/new-products/" className="show-more">
          {__t('Explore')}
        </Link>

        <HR color={'green'} />
        <TileWrap>
          <div className="home__title-wrapper">
            <h3 className="home__section-text">
              {__t('Share.with.the.world.the.thoughts.and.ideas.of.his.work')}
            </h3>
          </div>
          {
            (!isFetchingBlogs && itemsBlogs.length > 0)
            &&
            itemsBlogs
              .slice(0, 8)
              .map(item => <Uni
                item={item}
                key={`${item.slug}--blogs`}
                isAuth={isAuthenticated}
              />)
          }
        </TileWrap>
        <Loading loading={isFetchingBlogs} />

        <Link to="/blogs" className="show-more">
          {__t('read more')}
        </Link>

        <HR color={'purple'} />

        <TileWrap>
          <div className="home__title-wrapper">
            <h3 className="home__section-text">
              {__t('Share.information.about.your.master.class.creative.event.exhibition')}
            </h3>
          </div>
          {
            (!isFetchingEvents && itemsEvents.length > 0)
            &&
            itemsEvents
              .slice(0, 8)
              .map(item => <Uni
                item={item}
                key={`${item.slug}--events`}
                isAuth={isAuthenticated}
              />)
          }
        </TileWrap>
        <Loading loading={isFetchingEvents} />

        <Link to="/events" className="show-more">
          {__t('Continue')}
        </Link>

        <HR color={'orange'} />

        <div className="map">
          <img alt="" className="map-img" src="/images/map.jpg" />
        </div>

        <div className="pre-footer">
          <div className="w-inner">
            <h1>{__t('abbigli.about.header')}</h1>
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
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  itemsBlogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetchingBlogs: PropTypes.bool.isRequired,
  itemsEvents: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetchingEvents: PropTypes.bool.isRequired,
  itemsProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetchingProducts: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  priceTemplate: PropTypes.string,
};

function mapStateToProps(state) {
  const sections = state.Sections;
  const blogs = state.Blogs;
  const events = state.Events;
  const products = state.Products;
  const auth = state.Auth || {};
  const settings = state.Settings || {};

  return {
    itemsSections: sections.items,
    isFetchingSections: sections.isFetching,

    itemsBlogs: blogs.items,
    isFetchingBlogs: blogs.isFetching,

    itemsEvents: events.items,
    isFetchingEvents: events.isFetching,

    itemsProducts: products.items,
    isFetchingProducts: products.isFetching,
    isAuthenticated: auth.isAuthenticated,

    priceTemplate: settings.data.CURRENCY,
  };
}

export default connect(mapStateToProps)(Home);

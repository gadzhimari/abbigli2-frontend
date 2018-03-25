import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import {
  Banner,
  HR,
  BannerBlue,
  HomeSlider
} from '../../components';
import { Uni, Goods } from '../../components/Cards';
import PostsList from './PostsList';

import { fetchBlogs } from '../../ducks/Blogs/actions';
import { fetchEvents } from '../../ducks/Events/actions';
import { fetchData as fetchDataProducts } from '../../ducks/Products';
import { stagedPopup } from '../../ducks/Auth/authActions';

import { __t } from './../../i18n/translator';

import './Home.styl';

class Home extends PureComponent {
  componentDidMount() {
    this.props.fetchData();
  }

  handleOpenCreating = () => {
    const { isAuthenticated,
            router,
            showRegister } = this.props;

    if (isAuthenticated) {
      router.push('/post/new');
    } else {
      showRegister();
    }
  }

  render() {
    const { isFetchingBlogs,
            isFetchingEvents,
            itemsBlogs,
            itemsEvents,
            isFetchingProducts,
            itemsProducts,
            isAuthenticated,
            priceTemplate,
            itemsSections } = this.props;

    return (
      <div className="container-fluid main-page">
        <Banner
          handleOpenCreating={this.handleOpenCreating}
        />

        <HomeSlider items={itemsSections} />

        <BannerBlue
          hideJoin={isAuthenticated}
          join={this.showRegister}
        />

        <PostsList
          Component={Goods}
          isFetching={isFetchingProducts}
          posts={itemsProducts}

          title={__t('Display.for.sale.their.works')}
          hrColor="blue"

          moreLinkText={__t('Explore')}
          moreLinkUrl="/new-products"

          priceTemplate={priceTemplate}
          isAuth={isAuthenticated}
        />

        <PostsList
          Component={Uni}
          isFetching={isFetchingBlogs}
          posts={itemsBlogs}

          title={__t('Share.with.the.world.the.thoughts.and.ideas.of.his.work')}
          hrColor="green"

          moreLinkText={__t('read more')}
          moreLinkUrl="/blogs"

          isAuth={isAuthenticated}
        />

        <PostsList
          Component={Uni}
          isFetching={isFetchingEvents}
          posts={itemsEvents}

          title={__t('Share.information.about.your.master.class.creative.event.exhibition')}
          hrColor="purple"

          moreLinkText={__t('Continue')}
          moreLinkUrl="/events"

          isAuth={isAuthenticated}
        />

        <HR color={'orange'} />

        <div className="map">
          <img
            className="map-img"
            src="/images/map.jpg"
            alt=""
          />
        </div>

        <div className="pre-footer">
          <div className="w-inner">
            <h1>{__t('abbigli.about.header')}</h1>
            <p>{__t('abbigli.about.p1')}</p>
            <p>{__t('abbigli.about.p2')}</p>
            <p>{__t('abbigli.about.p3')}</p>
            <p>{__t('abbigli.about.p4')}</p>
            <p>{__t('abbigli.about.p5')}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  itemsSections: state.Sections.items,

  itemsBlogs: state.Blogs.page.items,
  isFetchingBlogs: state.Blogs.blogsFetchingState,

  itemsEvents: state.Events.page.items,
  isFetchingEvents: state.Events.eventsFetchingState,

  itemsProducts: state.Products.items,
  isFetchingProducts: state.Products.isFetching,

  isAuthenticated: state.Auth.isAuthenticated,
  priceTemplate: state.Settings.data.CURRENCY,
});

const mapDispatch = dispatch => ({
  showRegister: () => dispatch(stagedPopup('register')),
  fetchData: () => {
    dispatch(fetchBlogs({ type: 4 }));
    dispatch(fetchEvents({ type: 3 }));
    dispatch(fetchDataProducts());
  }
});

export default connect(mapState, mapDispatch)(Home);

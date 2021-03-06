import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import {
  Banner,
  HR,
  BannerBlue,
  HomeSlider
} from '../../components';
import { Blog, Goods, Event } from '../../components-lib/Cards';
import PostsList from './PostsList';

import { fetchBlogs } from '../../ducks/Blogs/actions';
import { fetchEvents } from '../../ducks/Events/actions';
import { fetchData as fetchDataProducts } from '../../ducks/Products';
import { stagedPopup } from '../../ducks/Auth/authActions';

import { __t } from './../../i18n/translator';

import './Home.less';

class Home extends PureComponent {
  componentDidMount() {
    this.props.fetchData();
  }

  handleOpenCreating = () => {
    const {
      isAuthenticated,
      router,
      showRegister
    } = this.props;

    if (isAuthenticated) {
      router.push('/post/new');
    } else {
      showRegister();
    }
  }

  handleJoin = () => {
    this.props.showRegister();
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
      itemsSections
    } = this.props;

    return (
      <div className="container-fluid main-page">
        <Banner
          handleOpenCreating={this.handleOpenCreating}
        />

        <HomeSlider items={itemsSections} />

        <BannerBlue
          hideJoin={isAuthenticated}
          join={this.handleJoin}
        />

        <PostsList
          Component={Goods}
          isFetching={isFetchingProducts}
          posts={itemsProducts}

          title={__t('Display.for.sale.their.works')}
          hrColor="blue"

          moreLinkText={__t('See more')}
          moreLinkUrl="/new-products"
        />

        <PostsList
          Component={Blog}
          isFetching={isFetchingBlogs}
          posts={itemsBlogs}
          view={2}

          title={__t('Share.with.the.world.the.thoughts.and.ideas.of.his.work')}
          hrColor="green"

          moreLinkText={__t('See more')}
          moreLinkUrl="/blogs"
        />

        <PostsList
          Component={Event}
          isFetching={isFetchingEvents}
          posts={itemsEvents}
          view={2}

          title={__t('Share.information.about.your.master.class.creative.event.exhibition')}
          hrColor="purple"

          moreLinkText={__t('See more')}
          moreLinkUrl="/events"
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

const mapStateToProps = state => ({
  itemsSections: state.Sections.items,

  itemsBlogs: state.Blogs.page.items,
  isFetchingBlogs: state.Blogs.blogsFetchingState,

  itemsEvents: state.Events.page.items,
  isFetchingEvents: state.Events.eventsFetchingState,

  itemsProducts: state.Products.items,
  isFetchingProducts: state.Products.isFetching,

  isAuthenticated: state.Auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  showRegister: () => dispatch(stagedPopup('signUp')),
  fetchData: () => {
    dispatch(fetchBlogs());
    dispatch(fetchEvents());
    dispatch(fetchDataProducts());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

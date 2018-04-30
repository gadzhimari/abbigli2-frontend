import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import {
  BreadCrumbs,
  ListWithNew,
  SliderBar,
} from '../../components';
import { Product } from '../../components-lib/Cards';
import { ProductsIcons } from '../../components/Icons';

import BlogSection from '../../components/SliderBar/components/BlogSection';

import { fetchData } from '../../ducks/PostsSpecific';

import paginateHOC from '../../HOC/paginate';
import mapFiltersToProps from '../../HOC/mapFiltersToProps';
import preloader from './preloader';

import { __t } from '../../i18n/translator';

const giftsCategoriesSlugs = new Set(['podarki', 'gifts']);

class SpecificPostsPage extends PureComponent {

  componentDidMount() {
    document.body.classList.add('blogs-page');
  }

  componentWillUnmount() {
    document.body.classList.remove('blogs-page');
  }

  render() {
    const { page, priceTemplate, items, sections, route, renderPaginator } = this.props;
    const crumbs = [page];

    const gifts = sections.filter(item => giftsCategoriesSlugs.has(item.slug))[0];
    const Icon = ProductsIcons[route.filter] || null;

    return (
      <main className="main">
        <BreadCrumbs
          crumbs={crumbs}
        />

        <div className="gifts__title">
          {__t('Buy a gifts')}
        </div>

        <SliderBar
          sliderName="slider-category"
          items={gifts && gifts.children}
          ItemComponent={BlogSection}
          itemWidth={164}
        />

        <h1 className="section-title">
          {Icon && <Icon />}
          {page.title}
        </h1>

        <ListWithNew
          ItemComponent={Product}
          items={items}
          count={8}
          itemProps={{ priceTemplate }}
        />

        {renderPaginator()}

      </main>
    );
  }
}

const mapStateToProps = ({ PostsSpecific, Settings, Auth, Sections }) => ({
  next: PostsSpecific.next,
  items: PostsSpecific.items,
  isFetching: PostsSpecific.isFetching,
  isAuthenticated: Auth.isAuthenticated,
  priceTemplate: Settings.data.CURRENCY,
  pagesCount: PostsSpecific.pages,
  sections: Sections.items,
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: (specific, options) => dispatch(fetchData(specific, options))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  paginateHOC,
  mapFiltersToProps,
  preloader
);

export default enhance(SpecificPostsPage);

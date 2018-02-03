import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import {
  BreadCrumbs,
  ListWithNew,
  PageSwitcher,
  SliderBar,
} from 'components';

import Filters from './Filters';
import { Product } from 'components/Cards';
import { fetchData } from 'ducks/PostsSpecific';
import { ProductsIcons } from 'components/Icons';

import { openPopup } from 'ducks/Popup/actions';

import BlogSection from 'components/SliderBar/components/BlogSection';

import paginateHOC from '../../HOC/paginate';
import mapFiltersToProps from '../../HOC/mapFiltersToProps';
import preloader from './preloader';

import { __t } from '../../i18n/translator';

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

class SpecificPostsPage extends PureComponent {

  componentDidMount() {
    document.body.classList.add('blogs-page');
  }

  componentWillUnmount() {
    document.body.classList.remove('blogs-page');
  }

  openMobileFilters = () => this.props
    .dispatch(openPopup('filtersPopup', {
      filters: this.props.filters,
      updateFilter: this.props.updateFilter,
      applyFilters: this.props.applyFilters,
      type: 1,
    }));

  render() {
    const { page, priceTemplate, items, pages, paginate, routing, sections, route } = this.props;
    const crumbs = [page];
    const gifts = sections
      .filter(section => section.slug === 'podarki' || section.slug === 'gifts')[0];
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
        {/*
          <a
            className="filter-open"
            onClick={this.openMobileFilters}
          >
            {__t('Filters')}
          </a>
          <Filters
            sections={this.props.sections}
            updateFilter={this.props.updateFilter}
            applyFilters={this.props.applyFilters}
            activeFilters={this.props.filters}
            reversePriceRange={this.props.reversePriceRange}
          />
        */}
        <ListWithNew
          ItemComponent={Product}
          items={items}
          newItems={newData}
          count={8}
          itemProps={{ priceTemplate }}
        />
        <PageSwitcher
          count={pages}
          active={(routing && Number(routing.query.page || 1)) || 1}
          paginate={paginate}
        />
      </main>
    );
  }
}

const mapStateToProps = ({ PostsSpecific, Settings, Auth, routing, Sections }) => ({
  next: PostsSpecific.next,
  items: PostsSpecific.items,
  isFetching: PostsSpecific.isFetching,
  isAuthenticated: Auth.isAuthenticated,
  priceTemplate: Settings.data.CURRENCY,
  routing: routing.locationBeforeTransitions,
  pages: PostsSpecific.pages,
  sections: Sections.items,
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: (specific, options) => dispatch(fetchData(specific, options)),
  dispatch,
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  paginateHOC,
  mapFiltersToProps,
  preloader
);

export default enhance(SpecificPostsPage);

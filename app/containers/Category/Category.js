import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'recompose';

import {
  BreadCrumbs,
  ListWithNew,
  PageSwitcher,
} from 'components';
import { Product, SubCategoryList } from 'components/Cards';

import preloader from './preloader';
import paginateHOC from '../../HOC/paginate';

import { fetchSectionPosts } from 'ducks/SubSections';

import './Category.less';


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

const Category = ({ sections, params, priceTemplate, posts }) => {
  const category = sections.filter(section => section.slug === params.section)[0] || {};
  const crumbs = [{
    title: category.title,
    url: `/c/${category.slug}`,
  }];

  return (
    <main className="main">
      <BreadCrumbs
        crumbs={crumbs}
      />
      <div className="content">
        <h1 className="section-title">
          {category.title}
        </h1>
        <SubCategoryList
          items={category.children}
          category={category.slug}
        />
        <ListWithNew
          ItemComponent={Product}
          items={posts}
          newItems={newData}
          itemProps={{ priceTemplate }}
          count={4}
        />
      </div>
    </main>
  );
};

const mapStateToProps = ({ SubSections, Sections, Settings, routing }) => ({
  isFetching: SubSections.isFetchingPosts,
  pagesCount: SubSections.pagesCount,
  sections: Sections.items,
  posts: SubSections.posts,
  priceTemplate: Settings.data.CURRENCY,
  routing: routing.locationBeforeTransitions,
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: (category, page) => dispatch(fetchSectionPosts({ category, page })),
});

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), paginateHOC, preloader);

export default enhance(Category);

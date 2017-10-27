/* eslint react/sort-comp: 0 react/require-default-props: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Link } from 'react-router';

import {
  BreadCrumbs,
  PageSwitcher,
  ListWithNew,
} from 'components';
import paginateHOC from '../../HOC/paginate';

import ShowMiddleCards from './ShowMiddleCards';

import { Product, SubCategoryList } from 'components/Cards';
import preloader from './preloader';

import { fetchData, fetchSectionPosts } from 'ducks/SubSections';
import { openPopup } from 'ducks/Popup/actions';
import { __t } from '../../i18n/translator';

import './Sections.less';

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

class Sections extends Component {
  render() {
    const { items, params, sections, priceTemplate, posts, tree, promoCategories } = this.props;
    const { pages, paginate, activePage } = this.props;
    const currentSection = tree[tree.length - 1];
    const startIndex = 5;

    return (
      <main className="main">
        <div className="content">
          <BreadCrumbs
            crumbs={tree}
          />
          <h1 className="section-title">
            {currentSection.title}
          </h1>
          <ShowMiddleCards
            items={currentSection.children.slice(0, startIndex)}
            url={currentSection.url}
          />
          <SubCategoryList
            items={currentSection.children.slice(startIndex)}
            url={currentSection.url}
          />
          <SubCategoryList
            items={promoCategories.slice(0, 10)}
            url={currentSection.url}
          />
          <h1 className="section-title">
            {__t('Tags')}
          </h1>
          <div className="cards-wrap cards-wrap_tag">
            {
              items
                .slice(0, 25)
                .map(tag => <Link
                  className="tag"
                  key={tag.id}
                  to={`/find?tags=${tag.title}&type=1`}
                  rel="nofollow"
                >
                  #{tag.title}
                </Link>)
            }
          </div>
          <ListWithNew
            ItemComponent={Product}
            items={posts}
            newItems={newData}
            itemProps={{ priceTemplate }}
            count={4}
          />
          <SubCategoryList
            items={promoCategories.slice(10, 15)}
            url={currentSection.url}
          />
          <PageSwitcher
            count={pages}
            paginate={paginate}
            active={activePage}
          />
        </div>
      </main>
    );
  }
}

Sections.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  fetchSectionTags: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    preview: PropTypes.string,
    id: PropTypes.number,
  })).isRequired,
  pagesCount: PropTypes.number,
  params: PropTypes.shape({
    section: PropTypes.string,
  }).isRequired,
  tree: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = ({ SubSections, Sections, Settings, routing }) => ({
  items: SubSections.items,
  isFetching: SubSections.isFetching,
  pages: SubSections.pagesCount,
  sections: Sections.items,
  normalizedSections: Sections.normalizedCategories,
  promo: Sections.promo,
  posts: SubSections.posts,
  priceTemplate: Settings.data.CURRENCY,
  routing: routing.locationBeforeTransitions,
});

const mapDispatchToProps = dispatch => ({
  fetchSectionTags: (category, page) => dispatch(fetchData({ category, page })),
  openMobileFilters: () => dispatch(openPopup('filtersPopup')),
  fetchPosts: (category, page) => dispatch(fetchSectionPosts({ category, page })),
});

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), preloader, paginateHOC);

export default enhance(Sections);

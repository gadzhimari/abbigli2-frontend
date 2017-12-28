/* eslint react/sort-comp: 0 react/require-default-props: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Link } from 'react-router';

import { BreadCrumbs, PageSwitcher, ListWithNew } from '../../components';
import paginateHOC from '../../HOC/paginate';

import ShowMiddleCards from './ShowMiddleCards';
import TagsBlock from './TagsBlock';

import { Product, SubCategoryList } from '../../components/Cards';
import preloader from './preloader';

import { fetchPosts, fetchTags } from '../../ducks/CatalogPage/actions';
import { openPopup } from '../../ducks/Popup/actions';
import { __t } from '../../i18n/translator';

import './Sections.less';

class Sections extends Component {
  render() {
    const { items, params, sections, priceTemplate, posts, tree, promoCategories, routing } = this.props;
    const { pages, paginate, activePage } = this.props;
    const currentSection = tree[tree.length - 1];
    const startIndex = 5;
    const currentTag = routing.query.tag;
    const crumbs = [...tree];
    const isPromo = currentSection.is_promo || currentSection.children[0].is_promo;

    if (currentTag) {
      crumbs.push({
        title: `#${currentTag}`,
        url: `${location.pathname}?tag=${currentTag}`,
      });
    }

    currentSection.children = currentSection.children
      .filter(item => item.posts_num !== 0);

    return (
      <main className="main">
        <div className="content">
          <BreadCrumbs
            crumbs={crumbs}
          />

          <h1 className="section-title">
            {currentSection.title}
            {currentTag && ` #${currentTag}`}
          </h1>

          {!isPromo &&
            <ShowMiddleCards
              items={currentSection.children.slice(0, startIndex)}
              url={currentSection.url}
            />
          }

          {!isPromo &&
            <SubCategoryList
              items={currentSection.children.slice(startIndex)}
              url={currentSection.url}
            />
          }

          {!isPromo &&
            <h1 className="section-title">
              {__t('Tags')}
            </h1>
          }

          <TagsBlock
            items={items}
            category={currentSection.slug}
            currentUrl={currentSection.view_on_site_url}
          />

          <div className="category-buttons">
            {promoCategories.slice(0, 10)
              .map(item => <Link
                to={item.view_on_site_url}
                className="category-buttons__link"
              >
                {item.title}
              </Link>)
            }
          </div>

          <ListWithNew
            ItemComponent={Product}
            items={posts}
            itemProps={{ priceTemplate }}
            count={4}
          />

          <div className="category-buttons">
            {promoCategories.slice(10, isPromo ? promoCategories.length : 15)
              .map(item => <Link
                to={item.view_on_site_url}
                className="category-buttons__link"
              >
                {item.title}
              </Link>)
            }
          </div>

          <PageSwitcher
            count={pages}
            paginate={paginate}
            active={activePage}
          />

          {currentSection.description &&
            <p className="seo__description">
              {currentSection.description}
            </p>
          }
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

const mapStateToProps = ({ CatalogPage, Sections, Settings, routing }) => ({
  items: CatalogPage.tags,
  isFetching: CatalogPage.isFetching,
  pages: CatalogPage.postPagesCount,
  sections: Sections.items,
  normalizedSections: Sections.normalizedCategories,
  promo: Sections.promo,
  posts: CatalogPage.posts,
  priceTemplate: Settings.data.CURRENCY,
  routing: routing.locationBeforeTransitions,
});

const mapDispatchToProps = dispatch => ({
  fetchSectionTags: (category, page) => dispatch(fetchTags({ category, page })),
  openMobileFilters: () => dispatch(openPopup('filtersPopup')),
  fetchPosts: (category, page, tags) => dispatch(fetchPosts({ category, page, tags })),
});

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), preloader, paginateHOC);

export default enhance(Sections);

/* eslint react/sort-comp: 0 react/require-default-props: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'recompose';

import { BreadCrumbs } from '../../components';
import { Spin, Adsense } from '../../components-lib';
import Content from './SectionContent';
import paginateHOC from '../../HOC/paginate';

import preloader from './preloader';

import { fetchPosts, fetchTags, fetchCrumbs } from '../../ducks/CatalogPage/actions';
import { openPopup } from '../../ducks/Popup/actions';

import './Sections.less';

class Sections extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    tree: PropTypes.arrayOf(PropTypes.object),
  };

  render() {
    const { tree, routing, currentSection, isFetching } = this.props;
    const currentTag = routing && routing.query.tag;
    const crumbs = [...tree];

    if (currentTag) {
      crumbs.push({
        title: `#${currentTag}`,
        url: `${location.pathname}?tag=${currentTag}`,
      });
    }

    return (
      <main className="main">
        <Adsense slot="1884873061" />

        <div className="content">
          <BreadCrumbs
            crumbs={crumbs}
          />

          <h1 className="section-title">
            {currentSection.seo_h1 || currentSection.title}
            {currentTag && ` #${currentTag}`}
          </h1>

          {isFetching &&
            <div className="spin-wrapper">
              <Spin visible />
            </div>
          }

          {!isFetching &&
            <Content
              section={currentSection}
              {...this.props}
            />
          }

          {currentSection.description &&
            <p className="seo__description">
              {currentSection.description}
            </p>
          }
        </div>

        <Adsense slot="6554228898" />
      </main>
    );
  }
}

const mapStateToProps = ({ CatalogPage, Sections, Settings, routing, NetworkErrors }) => ({
  tags: CatalogPage.tags,
  tree: CatalogPage.tree,
  promo: CatalogPage.promo,
  pages: CatalogPage.postPagesCount,
  sections: Sections.items,
  normalizedSections: Sections.normalizedCategories,
  posts: CatalogPage.posts,
  priceTemplate: Settings.data.CURRENCY,
  routing: routing.locationBeforeTransitions,
  errors: NetworkErrors,
  currentSection: CatalogPage.currentCategory,
});

const mapDispatchToProps = dispatch => ({
  fetchSectionTags: (category, page) => dispatch(fetchTags({ category, page })),
  openMobileFilters: () => dispatch(openPopup('filtersPopup')),
  fetchPosts: (category, page, tags) => dispatch(fetchPosts({ category, page, tags })),
  fetchCrumbs: data => dispatch(fetchCrumbs(data))
});

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), preloader, paginateHOC);

export default enhance(Sections);

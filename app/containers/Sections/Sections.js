/* eslint react/sort-comp: 0 react/require-default-props: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'recompose';

import { BreadCrumbs } from '../../components';
import { Spin } from '../../components-lib';
import Content from './SectionContent';
import paginateHOC from '../../HOC/paginate';

import preloader from './preloader';

import { fetchPosts, fetchTags } from '../../ducks/CatalogPage/actions';
import { openPopup } from '../../ducks/Popup/actions';

import './Sections.less';

class Sections extends Component {
  render() {
    const { tree, routing, isFetching } = this.props;

    const currentSection = tree[tree.length - 1];
    const currentTag = routing && routing.query.tag;
    const crumbs = [...tree];

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
            {currentSection.seo_h1 || currentSection.title}
            {currentTag && ` #${currentTag}`}
          </h1>

          {isFetching &&
            <div className="spin-wrapper">
              <Spin visible={isFetching} />
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
      </main>
    );
  }
}

Sections.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  tree: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = ({ CatalogPage, Sections, Settings, routing, NetworkErrors }) => ({
  tags: CatalogPage.tags,
  pages: CatalogPage.postPagesCount,
  sections: Sections.items,
  normalizedSections: Sections.normalizedCategories,
  promo: Sections.promo,
  posts: CatalogPage.posts,
  priceTemplate: Settings.data.CURRENCY,
  routing: routing.locationBeforeTransitions,
  errors: NetworkErrors,
});

const mapDispatchToProps = dispatch => ({
  fetchSectionTags: (category, page) => dispatch(fetchTags({ category, page })),
  openMobileFilters: () => dispatch(openPopup('filtersPopup')),
  fetchPosts: (category, page, tags) => dispatch(fetchPosts({ category, page, tags })),
});

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), preloader, paginateHOC);

export default enhance(Sections);

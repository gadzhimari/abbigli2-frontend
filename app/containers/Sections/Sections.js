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

import ShowAllSection from './ShowAllSection';
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
    const { items, params, sections, priceTemplate, posts, tree } = this.props;
    const currentSection = tree[tree.length - 1];
    const isShowAll = currentSection.showAll;
    const startIndex = isShowAll ? 4 : 0;

    return (
      <main className="main">
        <div className="content">
          <BreadCrumbs
            crumbs={tree}
          />
          <h1 className="section-title">
            {currentSection.title}
          </h1>
          {
            isShowAll
            &&
            <ShowAllSection
              items={currentSection.children.slice(0, startIndex)}
              url={currentSection.url}
            />
          }
          <ShowMiddleCards
            items={currentSection.children.slice(startIndex, startIndex + 5)}
            url={currentSection.url}
          />
          <SubCategoryList
            items={currentSection.children.slice(startIndex + 5)}
            url={currentSection.url}
          />
          <h1 className="section-title">
            {__t('Tags')}
          </h1>
          <div className="cards-wrap cards-wrap_tag">
            {
              items
                .map(tag => <Link
                  className="tag"
                  key={tag.id}
                  to={`/find?tags=${tag.title}&type=1`}
                >
                  #{tag.title}
                </Link>)
            }
            <button
              className="default-button"
              type="button"
            >
              {__t('More')}
            </button>
          </div>
          <ListWithNew
            ItemComponent={Product}
            items={posts}
            newItems={newData}
            itemProps={{ priceTemplate }}
            count={4}
          />
          {/* {
            !isFetching
            &&
            <PageSwitcher />
          }  */}
        </div>
      </main>
    );
  }
}

Sections.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  fetchSectionTags: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    preview: PropTypes.string,
    id: PropTypes.number,
  })).isRequired,
  pagesCount: PropTypes.number.isRequired,
  params: PropTypes.shape({
    section: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = ({ SubSections, Sections, Settings }) => ({
  items: SubSections.items,
  isFetching: SubSections.isFetching,
  pagesCount: SubSections.pagesCount,
  sections: Sections.items,
  posts: SubSections.posts,
  priceTemplate: Settings.data.CURRENCY,
});

const mapDispatchToProps = dispatch => ({
  fetchSectionTags: (category, page) => dispatch(fetchData({ category, page })),
  openMobileFilters: () => dispatch(openPopup('filtersPopup')),
  fetchPosts: (category, page) => dispatch(fetchSectionPosts({ category, page })),
});

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), preloader);

export default enhance(Sections);

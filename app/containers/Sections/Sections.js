import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import {
  BreadCrumbs,
  PageSwitcher,
  ListWithNew,
} from 'components';

import { PromoTags, Product } from 'components/Cards';
import preloader from './preloader';

import { fetchData, fetchSectionPosts } from 'ducks/SubSections';
import { openPopup } from 'ducks/Popup/actions';
import { __t } from '../../i18n/translator';

import './Sections.less';

class Sections extends Component {
  render() {
    const { items, params, sections, priceTemplate, posts } = this.props;
    const activeSections = sections
      .filter(section => section.slug === params.section)[0] || {};

    const crumbs = [{
      title: activeSections.title,
      url: `/sections/${params.section}`,
    }];

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

    return (
      <main className="main">
        <div className="content">
          <BreadCrumbs
            crumbs={crumbs}
          />
          <h1 className="section-title">{activeSections.title}</h1>
          <div className="cards-wrap cards-wrap_tag">
            <PromoTags tags={items.slice(0, 5)} />
            <PromoTags tags={items.slice(5, 10)} />
            <PromoTags tags={items.slice(10, 15)} />
            <PromoTags tags={items.slice(15, 20)} />
            <PromoTags tags={items.slice(20, 25)} />
          </div>
          <div className="cards-wrap cards-wrap_tag">
            {
              items
                .slice(25)
                .map(tag => <a className="tag" key={tag.id}>#{tag.title}</a>)
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
  fetchSectionTags: (slug, page) => dispatch(fetchData(slug, page)),
  openMobileFilters: () => dispatch(openPopup('filtersPopup')),
  fetchPosts: (slug, page) => dispatch(fetchSectionPosts({ slug, page })),
});

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), preloader);

export default enhance(Sections);

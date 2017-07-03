import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  BreadCrumbs,
  Filters,
  CardTag,
  Loading,
  PageSwitcher,
  NewPost,
} from 'components';

import { fetchData } from 'ducks/SubSections';
import { openPopup } from 'ducks/Popup/actions';
import { __t } from '../../i18n/translator';

class Sections extends Component {
  componentDidMount() {
    const { params, fetchSectionTags } = this.props;

    fetchSectionTags(params.section);
  }

  render() {
    const { items, params, isFetching, sections, openMobileFilters } = this.props;
    const activeSections = sections
      .filter(section => section.slug === params.section)[0] || {};

    const crumbs = [{
      title: activeSections.title,
      url: `/sections/${params.section}`,
    }];

    return (
      <div className="content">
        <BreadCrumbs
          crumbs={crumbs}
        />
        <h1 className="section-title">{activeSections.title}</h1>
        <a
          className="filter-open"
          onClick={openMobileFilters}
        >
          {__t('Filters')}
        </a>
        <Filters />
        {
          isFetching
            ? <div className="cards-wrap"><Loading loading={isFetching} /></div>
            : <div className="cards-wrap">
              {
                items.slice(0, 10).map(item => <CardTag
                  key={item.id}
                  title={item.title}
                  preview={item.preview}
                  slug={params.section}
                />)
              }
              <NewPost
                data={{
                  type: 4,
                  title: 'Blog title',
                  author: {
                    name: 'Mike',
                  },
                }}
              />
              <NewPost
                data={{
                  type: 3,
                  title: 'Event title',
                  date: '22.07.2017',
                  author: {
                    name: 'Mike',
                  },
                }}
              />
              {
                items.slice(10).map(item => <CardTag
                  key={item.id}
                  title={item.title}
                  preview={item.preview}
                  slug={params.section}
                />)
              }
            </div>
        }
        {
          !isFetching
          &&
          <PageSwitcher />
        }
      </div >
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

const mapStateToProps = ({ SubSections, Sections }) => ({
  items: SubSections.items,
  isFetching: SubSections.isFetching,
  pagesCount: SubSections.pagesCount,
  sections: Sections.items,
});

const mapDispatchToProps = dispatch => ({
  fetchSectionTags: (slug, page) => dispatch(fetchData(slug, page)),
  openMobileFilters: () => dispatch(openPopup('filtersPopup')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sections);

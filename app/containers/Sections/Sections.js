import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  BreadCrumbs,
  CardTag,
  Loading,
  PageSwitcher,
  ListWithNew,
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
          {
            isFetching
              ? <div className="cards-wrap"><Loading loading={isFetching} /></div>
              : <ListWithNew
                ItemComponent={CardTag}
                items={items}
                newItems={newData}
                itemProps={{ slug: params.section }}
                count={10}
              />
          }
          {
            !isFetching
            &&
            <PageSwitcher />
          }
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

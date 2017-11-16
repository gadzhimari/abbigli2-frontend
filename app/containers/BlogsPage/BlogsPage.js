import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'recompose';

import {
  BreadCrumbs,
  Loading,
  ListWithNew,
  PageSwitcher,
  SliderBar,
  ChoiseFilter,
} from 'components';

import { Blog } from 'components/Cards';

import paginateHOC from '../../HOC/paginate';
import BlogSection from 'components/SliderBar/components/BlogSection';

import * as actions from 'ducks/Blogs';
import { __t } from '../../i18n/translator';

import './BlogsPage.less';

class BlogsPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: (props.routing && props.routing.query.search) || '',
    };
  }

  componentDidMount() {
    this.fetchData();

    document.body.classList.add('blogs-page');
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    if (prevProps.location.query !== location.query) {
      this.fetchData();
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('blogs-page');
  }

  fetchData = () => {
    const { routing, fetchBlogs } = this.props;

    const options = {
      popular: routing.query.popular === 'true',
      section: routing.query.section,
      type: 4,
      search: routing.query.search,
    };

    if (routing.query.page && routing.query.page !== '1') {
      options.page = routing.query.page;
    }

    fetchBlogs(options);
  }

  changeFilter = ({ target }) => {
    const { router, routing } = this.props;
    const query = Object.assign({}, routing.query, {
      popular: target.dataset.popular === 'true',
      page: 1,
    });

    router.push({
      pathname: '/blogs',
      query,
    });
  }

  changeSearch = ({ target }) => this.setState({
    searchValue: target.value,
  })

  doSearch = () => {
    const { router, routing } = this.props;
    const { searchValue } = this.state;

    if (searchValue.trim().length === 0) return;

    const query = Object.assign({}, routing.query, {
      search: searchValue.trim(),
    });

    router.push({
      pathname: '/blogs',
      query,
    });
  }

  handleSearchKeyDown = ({ keyCode, target }) => {
    if (target.value.trim().length === 0) return;

    if (keyCode === 13) {
      this.doSearch();
    }
  }

  render() {
    const { isFetching, items, sections, params, routing, router, pages, paginate, activePage } = this.props;

    const section = sections.filter(item => routing && item.slug === routing.query.section)[0];

    const crumbs = [{
      title: __t('Blogs'),
      url: '/blogs',
    }];

    if (section) {
      crumbs.push({
        title: section.title,
        url: `/blogs?section=${section.slug}`,
      });
    }

    const isActivePopular = routing && routing.query.popular === 'true';

    return (
      <main className="main blog">
        <BreadCrumbs
          crumbs={crumbs}
        />
        <div className="content">
          <h1 className="section-title">
            <svg className="icon icon-blog" viewBox="0 0 51 52.7">
              <path d="M51,9.4L41.5,0L31,10.4H4.1c-2.3,0-4.1,1.8-4.1,4.1v27.8c0,2.3,1.8,4.1,4.1,4.1h1.4l0.7,6.3 l8.3-6.3H38c2.3,0,4.1-1.8,4.1-4.1V18.1L51,9.4z M16.2,34.4l1-6.3l5.3,5.4L16.2,34.4z M47.2,9.4L24,32.2l-5.6-5.6l23-22.8L47.2,9.4z" />
            </svg>
            {__t('Blogs')}
            {section && ` - ${section.title}`}
          </h1>
          {
            sections.length > 0
            &&
            <SliderBar
              sliderName="slider-category"
              items={sections}
              ItemComponent={BlogSection}
              itemWidth={120}
              itemProps={{
                baseUrl: '/blogs',
                isBlog: true,
              }}
            />
          }
          <div className="filter filter-search">
            <ChoiseFilter
              choiseList={[
                { title: __t('New'), active: !isActivePopular, popular: false },
                { title: __t('Popular'), active: isActivePopular, popular: true },
              ]}
              onChange={this.changeFilter}
            />
            <input
              className="input"
              type="text"
              placeholder={__t('Blog search')}
              onChange={this.changeSearch}
              onKeyDown={this.handleSearchKeyDown}
              value={this.state.searchValue}
            />
            <button
              className="default-button"
              type="button"
              onClick={this.doSearch}
            >
              {__t('Search')}
              <svg className="icon icon-search" viewBox="0 0 57.9 58">
                <g id="XMLID_2_">
                  <path id="XMLID_9_" className="st0" d="M43.5,21.7C43.5,9.7,33.7,0,21.7,0C9.7,0,0,9.7,0,21.7s9.7,21.7,21.7,21.7 C33.7,43.5,43.5,33.7,43.5,21.7z M21.7,38.5C12.5,38.5,5,31,5,21.7S12.5,5,21.7,5s16.7,7.5,16.7,16.7S31,38.5,21.7,38.5z" />
                  <path id="XMLID_10_" className="st0" d="M56.3,48.8L43.1,35.5c-2,3-4.6,5.6-7.7,7.5l13.3,13.4c2.1,2.1,5.5,2.1,7.6,0l0,0 C58.4,54.3,58.4,50.9,56.3,48.8z" />
                </g>
              </svg>
            </button>
          </div>
          {
            isFetching
              ? <div className="cards-wrap"><Loading loading={isFetching} /></div>
              : <ListWithNew
                items={items}
                itemsType={4}
                itemProps={{ legacy: true }}
                count={8}
                ItemComponent={Blog}
              />
          }
          {
            !isFetching
            &&
            <PageSwitcher
              active={activePage}
              count={pages}
              paginate={paginate}
            />
          }
        </div>
      </main >
    );
  }
}

BlogsPage.propTypes = {
  changeSearchValue: PropTypes.func.isRequired,
  fetchBlogs: PropTypes.func.isRequired,
  pages: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

const mapStateToProps = ({ Blogs, Sections, routing }) => ({
  isFetching: Blogs.isFetching,
  items: Blogs.items,
  searchValue: Blogs.searchValue,
  sections: Sections.subsections,
  routing: routing.locationBeforeTransitions,
  pages: Blogs.pages,
});

const mapDispatchToProps = dispatch => ({
  fetchBlogs: (page, searchValue, popular) => dispatch(actions.fetchData(page, searchValue, popular)),
  changeSearchValue: value => dispatch(actions.changeSearchValue(value)),
});

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), paginateHOC);

export default enhance(BlogsPage);

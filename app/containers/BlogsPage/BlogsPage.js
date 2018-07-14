import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'recompose';

import { ListWithNew, SliderBar, ChoiseFilter, SliderBarCard } from '../../components';

import { Spin, BreadCrumbs, Adsense } from '../../components-lib';
import { Blog } from '../../components-lib/Cards';

import paginateHOC from '../../HOC/paginate';

import { fetchBlogs, changeBlogsSearchValue } from '../../ducks/Blogs/actions';

import { BLOG_TYPE } from '../../lib/constants/posts-types';
import { __t } from '../../i18n/translator';

import './BlogsPage.less';

const popularFilterOptions = [
  { title: __t('New'), value: undefined },
  { title: __t('Popular'), value: 'month' }
];

class BlogsPage extends PureComponent {
  static propTypes = {
    changeSearchValue: PropTypes.func,
    fetchBlogs: PropTypes.func
  };

  state = {
    searchValue: this.props.query.search || ''
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    const { query } = this.props;

    if (prevProps.query !== query) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const { query, fetchBlogs, params } = this.props;

    const options = {
      category: params.category,
      search: query.search,
      popular: query.popular
    };

    if (query.page && query.page !== '1') {
      options.page = query.page;
    }

    fetchBlogs(options);
  }

  changeFilter = (e, { value }) => {
    const { router, query, location } = this.props;

    router.push({
      pathname: location.pathname,
      query: {
        ...query,
        popular: value
      }
    });
  }

  changeSearch = ({ target }) => this.setState({
    searchValue: target.value,
  })

  doSearch = () => {
    const { router, query, location } = this.props;
    const { searchValue } = this.state;
    const search = searchValue.trim();

    if (search.length === 0) return;

    router.push({
      pathname: location.pathname,
      query: { ...query, search }
    });
  }

  handleSearchKeyDown = ({ keyCode, target }) => {
    if (target.value.trim().length === 0) return;

    if (keyCode === 13) {
      this.doSearch();
    }
  }

  render() {
    const { searchValue } = this.state;
    const {
      isFetching,
      items,
      categories,
      renderPaginator,
      params,
      query
    } = this.props;

    const currentCategory = categories && categories
      .find(item => item.slug === params.category);

    return (
      <main className="main blog">
        <Adsense slot="1884873061" />
        <BreadCrumbs page="blogs" category={currentCategory} />

        <div className="content">
          <h1 className="section-title">
            <svg className="icon icon-blog" viewBox="0 0 51 52.7">
              <path d="M51,9.4L41.5,0L31,10.4H4.1c-2.3,0-4.1,1.8-4.1,4.1v27.8c0,2.3,1.8,4.1,4.1,4.1h1.4l0.7,6.3 l8.3-6.3H38c2.3,0,4.1-1.8,4.1-4.1V18.1L51,9.4z M16.2,34.4l1-6.3l5.3,5.4L16.2,34.4z M47.2,9.4L24,32.2l-5.6-5.6l23-22.8L47.2,9.4z" />
            </svg>

            {__t('Blogs')}

            {currentCategory && ` - ${currentCategory.title}`}
          </h1>

          <SliderBar
            items={categories}
            ItemComponent={SliderBarCard}
          />

          <div className="filter filter-search">
            <ChoiseFilter
              options={popularFilterOptions}
              onChange={this.changeFilter}
              name="popular"
              active={query.popular}
            />

            <input
              className="input"
              type="text"
              placeholder={__t('Blog search')}
              onChange={this.changeSearch}
              onKeyDown={this.handleSearchKeyDown}
              value={searchValue}
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
              ? <div className="cards-wrap">
                <div className="spin-wrapper">
                  <Spin visible={isFetching} />
                </div>
              </div>
              : <ListWithNew
                items={items}
                itemsType={BLOG_TYPE}
                itemProps={{ legacy: true }}
                count={8}
                ItemComponent={Blog}
                query={searchValue}
              />
          }

          {!isFetching && renderPaginator()}
        </div>

        <Adsense slot="6554228898" />
      </main >
    );
  }
}

const mapStateToProps = ({ Blogs, Sections, Location }) => ({
  isFetching: Blogs.blogsFetchingState,
  items: Blogs.page.items,
  searchValue: Blogs.searchValue,
  categories: Sections.blogsCategories,
  pagesCount: Blogs.page.count,

  query: Location.query
});

const mapDispatchToProps = dispatch => ({
  fetchBlogs: opts => dispatch(fetchBlogs(opts)),
  changeSearchValue: value => dispatch(changeBlogsSearchValue(value)),
});

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), paginateHOC);

export default enhance(BlogsPage);

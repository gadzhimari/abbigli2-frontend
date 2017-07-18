import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
  BreadCrumbs,
  BlogCard,
  Loading,
  ListWithNew,
  PageSwitcher,
  SliderBar,
  ChoiseFilter,
} from 'components';
import BlogSection from 'components/SliderBar/components/BlogSection';

import * as actions from 'ducks/blogs';
import { __t } from '../../i18n/translator';

import './BlogsPage.less';

class BlogsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: (props.routing && props.routing.query.search) || '',
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    if (prevProps.location.query !== location.query) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const { routing, fetchBlogs } = this.props;

    const options = {
      popular: routing.query.popular === 'true',
      section: routing.query.section,
      type: 4,
      search: routing.query.search,
    };

    fetchBlogs(options);
  }

  changeFilter = ({ target }) => {
    const { router, routing } = this.props;
    const query = Object.assign({}, routing.query, {
      popular: target.dataset.popular === 'true',
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
    const { isFetching, items, sections, params, routing } = this.props;

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
          </h1>
          {
            sections.length > 0
            &&
            <SliderBar
              sliderName="slider-category"
              items={sections}
              ItemComponent={BlogSection}
              itemWidth={120}
            />
          }
          <div className="filter">
            <ChoiseFilter
              choiseList={[
                { title: __t('New'), active: !isActivePopular, popular: false },
                { title: __t('Popular'), active: isActivePopular, popular: true },
              ]}
              onChange={this.changeFilter}
            />
            <div className="filter__search">
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
              </button>
            </div>
          </div>
          {
            isFetching
              ? <div className="cards-wrap"><Loading loading={isFetching} /></div>
              : <ListWithNew
                ItemComponent={BlogCard}
                items={items}
                newItems={newData}
                itemProps={{ legacy: true }}
                count={8}
              />
          }
          {
            !isFetching
            &&
            <PageSwitcher />
          }
        </div>
      </main >
    );
  }
}

BlogsPage.propTypes = {
  changeSearchValue: PropTypes.func.isRequired,
  fetchBlogs: PropTypes.func.isRequired,
};

const mapStateToProps = ({ Blogs, Sections, routing }) => ({
  isFetching: Blogs.isFetching,
  items: Blogs.items,
  searchValue: Blogs.searchValue,
  sections: Sections.items,
  routing: routing.locationBeforeTransitions,
});

const mapDispatchToProps = dispatch => ({
  fetchBlogs: (page, searchValue, popular) => dispatch(actions.fetchData(page, searchValue, popular)),
  changeSearchValue: value => dispatch(actions.changeSearchValue(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogsPage);

import React, { Component, PropTypes } from 'react';
import {
  BreadCrumbs,
  SliderBar,
  Filters,
  Loading,
  ListWithNew,
  PageSwitcher,
} from 'components';
import { Product } from 'components/Cards';
import Tag from 'components/SliderBar/components/Tag';

import { connect } from 'react-redux';
import { fetchData } from 'ducks/Posts';
import { API_URL } from 'config';


import './index.styl';

const getSectionUrl = (slug, section, tag) => {
  if (tag) {
    return `/sections/${section}/${tag}/${slug}`;
  }

  return `/${slug}-products/${section}`;
};

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

class SectionTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
    };
  }

  componentWillMount() {
    const {
      items,
      location,
      route,
      routeParams,
    } = this.props;

    this.fetchSectionTags();

    if (location.action === 'POP' && items.length === 0) {
      this.fetchPosts(route, routeParams);
    }

    if (location.action === 'PUSH') {
      this.fetchPosts(route, routeParams);
    }
  }

  componentWillUpdate(nextProps) {
    const { routeParams } = this.props;

    if (nextProps.routeParams !== routeParams) {
      this.fetchPosts(nextProps.route, nextProps.routeParams);
    }
  }

  fetchPosts = (route, params, config = {}) => {
    const { dispatch } = this.props;
    const options = Object.assign({}, config, {
      section: params.section,
    });

    if (route.filter) {
      options[route.filter] = true;
    }

    if (params.tags) {
      options.tags = params.tags;
    }

    dispatch(fetchData(options));
  }

  fetchSectionTags() {
    const { routeParams } = this.props;

    fetch(`${API_URL}tags/?section=${routeParams.section}&title=${routeParams.tag}`)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }

        return response.json();
      })
      .then((tags) => {
        this.setState({
          tags: tags.results,
        });
      });
  }

  loadMore = () => {
    const { isFetchingMore, next, page } = this.props;

    if (isFetchingMore || next === null) return;

    const options = {
      page,
    };

    this.fetchPosts(this.props.route, this.props.routeParams, options);
  }

  render() {
    const {
      items,
      isFetching,
      routeParams,
      sections,
      route,
      priceTemplate,
    } = this.props;

    const seoTextsObj = sections
      .filter(section => section.slug === routeParams.section)[0] || {};

    const crumbs = [{
      title: seoTextsObj.title,
      url: `/sections/${routeParams.section}`,
    }];

    return (
      <div>
        {/* {
          this.state.tags.length > 0
          &&
          <SliderBar
            sliderName="slider-tags"
            items={this.state.tags}
            ItemComponent={Tag}
            itemWidth={175}
            itemProps={{ link: `/sections/${seoTextsObj.slug}/` }}
          />
        } */}
        <main className="main">
          <BreadCrumbs
            crumbs={crumbs}
          />
          <div className="content">
            <h1 className="section-title">
              {seoTextsObj.title}
              {' '}
              {`#${routeParams.tags}`}
              <div className="section-title__subscribe">
                <button className="default-button" type="button">
                  + Подписаться
                </button>
                <a className="filter-open">
                  Фильтры
                </a>
              </div>
            </h1>
            {/* <Filters /> */}
            {
              isFetching
                ? <div className="cards-wrap"><Loading loading={isFetching} /></div>
                : <ListWithNew
                  ItemComponent={Product}
                  items={items}
                  newItems={newData}
                  count={8}
                  itemProps={{ priceTemplate }}
                />
            }
            {
              !isFetching
              &&
              <PageSwitcher />
            }
          </div>
        </main>
      </div>
    );
  }
}

SectionTag.defaultProps = {
  currentTag: '',
  currentSection: '',
};

SectionTag.propTypes = {
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isFetchingMore: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  routeParams: PropTypes.object.isRequired,
  next: PropTypes.any,
  routes: PropTypes.array.isRequired,
  currentTag: PropTypes.string,
  currentSection: PropTypes.string,
};

function mapStateToProps(state) {
  const {
    isFetching,
    items,
    page,
  } = state.Posts;
  const auth = state.Auth || {
    isAuthenticated: false,
  };

  const tag_title = state.Posts.data ? state.Posts.data.tag_title : '';
  const section_title = state.Posts.data ? state.Posts.data.section_title : '';
  const seo_title = state.Posts.data ? state.Posts.data.seo_title : '';
  const seo_description = state.Posts.data ? state.Posts.data.seo_description : '';


  return {
    next: state.Posts.next,
    items,
    isFetching,
    section_title,
    tag_title,
    seo_title,
    seo_description,
    isFetchingMore: state.Posts.isFetchingMore,
    isAuthenticated: auth.isAuthenticated,
    sections: state.Sections.items,
    page,
    priceTemplate: state.Settings.data.CURRENCY,
    currentTag: state.Posts.currentTag,
    currentSection: state.Posts.currentSection,
  };
}

export default connect(mapStateToProps)(SectionTag);

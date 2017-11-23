import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  BreadCrumbs,
  SliderBar,
  Filters,
  ListWithNew,
  PageSwitcher,
} from 'components';
import { Product } from 'components/Cards';
import Tag from 'components/SliderBar/components/Tag';


import './index.styl';

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
  clickOnTag = (tag) => {
    const { router } = this.props;

    router.push({
      pathname: location.pathname,
      query: Object.assign({}, {
        tag,
      }),
    });
  }

  render() {
    const {
      posts,
      items,
      isFetching,
      routeParams,
      sections,
      route,
      priceTemplate,
      tree,
      routing,
    } = this.props;
    const currentSection = tree[tree.length - 1];
    const currentTag = routing.query.tag;
    const crumbs = [...tree];

    if (currentTag) {
      crumbs.push({
        title: `#${currentTag}`,
        url: `${location.pathname}?tag=${currentTag}`,
      });
    }

    return (
      <div>
        {
          items.length > 0
          &&
          <SliderBar
            sliderName="slider-tags"
            items={items}
            ItemComponent={Tag}
            itemWidth={175}
            itemProps={{
              onClick: this.clickOnTag,
            }}
          />
        }
        <main className="main">
          <BreadCrumbs
            crumbs={crumbs}
          />
          <div className="content">
            <h1 className="section-title">
              {currentSection.title}
              {currentTag && ` #${currentTag}`}
            </h1>
            <ListWithNew
              ItemComponent={Product}
              items={posts}
              newItems={newData}
              count={8}
              itemProps={{ priceTemplate }}
            />

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

export default SectionTag;

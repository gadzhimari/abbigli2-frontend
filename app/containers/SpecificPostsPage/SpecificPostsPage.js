import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import {
  BreadCrumbs,
  Filters,
  ListWithNew,
  PageSwitcher,
  SliderBar,
} from 'components';
import { Product } from 'components/Cards';
import { fetchData } from 'ducks/PostsSpecific';

import BlogSection from 'components/SliderBar/components/BlogSection';

import paginateHOC from '../../HOC/paginate';
import preloader from './preloader';

import { __t } from '../../i18n/translator';

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

class SpecificPostsPage extends PureComponent {

  componentDidMount() {
    document.body.classList.add('blogs-page');
  }

  componentWillUnmount() {
    document.body.classList.remove('blogs-page');
  }

  render() {
    const { page, priceTemplate, items, pages, paginate, routing, sections } = this.props;
    const crumbs = [page];
    const gifts = sections
      .filter(section => section.slug === 'podarki' || section.slug === 'gifts')[0];

    return (
      <main className="main">
        <BreadCrumbs
          crumbs={crumbs}
        />
        <div className="gifts__title">
          {__t('Buy a gifts')}
        </div>
        <SliderBar
          sliderName="slider-category"
          items={gifts && gifts.children}
          ItemComponent={BlogSection}
          itemWidth={164}
        />
        <h1 className="section-title">
          {page.title}
        </h1>
        <ListWithNew
          ItemComponent={Product}
          items={items}
          newItems={newData}
          count={8}
          itemProps={{ priceTemplate }}
        />
        <PageSwitcher
          count={pages}
          active={(routing && Number(routing.query.page || 1)) || 1}
          paginate={paginate}
        />
      </main>
    );
  }
}

const mapStateToProps = ({ PostsSpecific, Settings, Auth, routing, Sections }) => ({
  next: PostsSpecific.next,
  items: PostsSpecific.items,
  isFetching: PostsSpecific.isFetching,
  isAuthenticated: Auth.isAuthenticated,
  priceTemplate: Settings.data.CURRENCY,
  routing: routing.locationBeforeTransitions,
  pages: PostsSpecific.pages,
  sections: Sections.items,
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: (specific, options) => dispatch(fetchData(specific, options)),
});

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), paginateHOC, preloader);

export default enhance(SpecificPostsPage);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import {
  BreadCrumbs,
  SliderBar,
  Filters,
  Loading,
  ListWithNew,
  PageSwitcher,
} from 'components';
import Tag from 'components/SliderBar/components/Tag';
import { fetchPosts, fetchTags } from 'ducks/TagSearch/actions';

import mapFiltersToProps from '../../HOC/mapFiltersToProps';


import { __t } from './../../i18n/translator';

import './Tag.styl';

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

class TagSearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price_from: props.filters.price_from,
      price_to: props.filters.price_from,
      color: props.filters.color,
      distance: props.filters.distance,
      section: props.filters.section,
    };
  }

  componentDidMount() {
    const { location, items } = this.props;

    if (location.action === 'POP' && items.length === 0) {
      this.loadItems();
      this.loadRelativeTags();
    }

    if (location.action === 'PUSH') {
      this.loadItems();
      this.loadRelativeTags();
    }
  }

  componentDidUpdate(prevProps) {
    const { routeParams } = this.props;

    if (prevProps.routeParams !== routeParams) {
      this.loadItems();
      this.loadRelativeTags();
    }
  }

  loadRelativeTags = () => {
    const { routing, dispatch } = this.props;

    dispatch(fetchTags(routing.query.tags));
  }

  loadItems = () => {
    const { routing, dispatch } = this.props;
    const options = routing.query;

    dispatch(fetchPosts(options));
  }

  clickOnTag = (tag) => {
    const { router, routing } = this.props;
    const newTags = routing.query.tags.split(',');
    newTags.push(tag);

    router.push({
      pathname: '/find',
      query: Object.assign({}, routing.query, {
        tags: newTags.join(','),
      }),
    });
  }

  updateFilter = ({ target }) => {
    this.setState({
      [target.dataset.field]: target.value || target.dataset.value,
    });
  }

  render() {
    const {
      routeParams,
      dispatch,
      isAuthenticated,
      tags,
      pageCount,
      items,
      isFetching,
      priceTemplate,
      routing,
      sections,
    } = this.props;

    return (
      <div>
        {
          tags.length > 0
          &&
          <SliderBar
            sliderName="slider-tags"
            items={tags}
            ItemComponent={Tag}
            itemWidth={175}
            itemProps={{ onClick: this.clickOnTag }}
          />
        }
        <main className="main">
          <BreadCrumbs />
          <div className="content">
            <h1 className="section-title">
              <span>{__t('Search results')}</span>
              {' '}
              {
                routing
                &&
                `"${routing.query.tags.split(',').join(' ')}"`
              }
              <div className="section-title__subscribe">
                <button className="default-button" type="button">
                  + {__t('Subscribe')}
                </button>
                <a className="filter-open">
                  {__t('Filters')}
                </a>
              </div>
            </h1>
            <Filters
              section={this.state.section}
              sections={sections}
              priceFrom={this.state.price_from}
              priceTo={this.state.price_to}
              color={this.state.color}
              radius={this.state.distance}
              updateFilter={this.updateFilter}
            />
            {
              isFetching
                ? <div className="cards-wrap"><Loading loading={isFetching} /></div>
                : <ListWithNew
                  items={items}
                  newItems={newData}
                  count={4}
                  itemProps={{ priceTemplate, legacy: true }}
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

TagSearchResults.propTypes = {
  routeParams: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  filters: PropTypes.shape({
    price_from: PropTypes.string,
    price_to: PropTypes.string,
    section: PropTypes.string,
    color: PropTypes.string,
    distance: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = ({
  Auth,
  Settings,
  TagSearch,
  routing,
  Sections }) => ({
    isAuthenticated: Auth.isAuthenticated,
    priceTemplate: Settings.data.CURRENCY,
    items: TagSearch.items,
    tags: TagSearch.tags,
    isFetching: TagSearch.isFetching,
    pageCount: TagSearch.pageCount,
    routing: routing.locationBeforeTransitions,
    sections: Sections.items,
  });

export default connect(mapStateToProps)(mapFiltersToProps(TagSearchResults));

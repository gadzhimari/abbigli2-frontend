import React, { Component, PropTypes } from 'react';
import { connect } from 'preact-redux';
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
import { omit } from 'utils/functions';

import { __t } from './../../i18n/translator';

import './Tag.styl';

class TagSearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price_from: (props.routing && props.routing.query.price_from) || '0',
      price_to: (props.routing && props.routing.query.price_to) || '1000',
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

  updateSelect = (field, value) => {
    const { routing, router } = this.props;

    router.push({
      pathname: '/find',
      query: Object.assign({}, routing.query, {
        [field]: value,
      }),
    });
  }

  updateAnyPrice = ({ target }) => {
    const { routing, router } = this.props;
    let query;

    if (target.checked) {
      query = omit(routing.query, ['price_from', 'price_to']);
    } else {
      query = Object.assign({}, routing.query, {
        price_from: this.state.price_from,
        price_to: this.state.price_to,
      });
    }

    router.push({
      pathname: '/find',
      query: Object.assign({}, query),
    });
  }

  upadatePriceRange = ({ target }) => {
    const { routing, router } = this.props;

    this.setState({
      [target.dataset.field]: target.value,
    });

    if (target.value.trim().length === 0) return;

    router.push({
      pathname: '/find',
      query: Object.assign({}, routing.query, {
        [target.dataset.field]: target.value,
      }),
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

    const route = routing || { query: {} };

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
                  + Подписаться
                </button>
                <a className="filter-open">
                  {__t('Filters')}
                </a>
              </div>
            </h1>
            <Filters
              section={route.query.section}
              sections={sections}
              anyPrice={!route.query.price_from && !route.query.price_to}
              updateInput={this.upadatePriceRange}
              priceFrom={this.state.price_from}
              priceTo={this.state.price_to}
              color={route.query.color}
              radius={route.query.distance}
              updateCheckbox={this.updateAnyPrice}
              updateSelect={this.updateSelect}
              updateColor={(e) => console.log(e)}
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
  routeParams: PropTypes.object,
  dispatch: PropTypes.func,
  isAuthenticated: PropTypes.bool,
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

export default connect(mapStateToProps)(TagSearchResults);

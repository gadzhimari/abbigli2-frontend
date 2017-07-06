import React, { Component, PropTypes } from 'react';
import { connect } from 'preact-redux';
import Helmet from 'react-helmet';

import {
  BreadCrumbs,
  TagsBar,
  Filters,
  Loading,
  ListWithNew,
  PageSwitcher,
} from 'components';

import { Product } from 'components/Cards';

import { fetchPosts, fetchTags } from 'ducks/TagSearch/actions';

import { __t } from './../../i18n/translator';

import './Tag.styl';

class Tag extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
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
    const { routeParams, dispatch } = this.props;

    dispatch(fetchTags(routeParams.tags));
  }

  loadItems = () => {
    const { routeParams, dispatch } = this.props;
    const page = routeParams.page || 1;
    const options = {
      tags: routeParams.tags,
      [routeParams.filter]: true,
    };

    if (page !== 1) {
      options.page = page;
    }

    dispatch(fetchPosts(options));
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

    return (
      <div>
        {
          tags.length > 0
          &&
          <TagsBar
            tags={tags}
            previousTags={routeParams.tags}
          />
        }
        <main className="main">
          <BreadCrumbs />
          <div className="content">
            <h1 className="section-title">
              <span>Результаты поиска</span>
              {' '}
              {`"${routeParams.tags.split(',').join(' ')}"`}
              <div className="section-title__subscribe">
                <button className="default-button" type="button">
                  + Подписаться
                </button>
                <a className="filter-open">
                  Фильтры
                </a>
              </div>
            </h1>
            <Filters />
            {
              isFetching
                ? <div className="cards-wrap"><Loading loading={isFetching} /></div>
                : <ListWithNew
                  ItemComponent={Product}
                  items={items}
                  newItems={newData}
                  count={4}
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

Tag.propTypes = {
  routeParams: PropTypes.object,
  dispatch: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = ({
  Auth,
  Settings,
  TagSearch }) => ({
    isAuthenticated: Auth.isAuthenticated,
    priceTemplate: Settings.data.CURRENCY,
    items: TagSearch.items,
    tags: TagSearch.tags,
    isFetching: TagSearch.isFetching,
    pageCount: TagSearch.pageCount,
  });

export default connect(mapStateToProps)(Tag);

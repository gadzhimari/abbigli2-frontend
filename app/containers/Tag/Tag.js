import React, { Component, PropTypes } from 'react';
import { connect } from 'preact-redux';
import Helmet from 'react-helmet';

import {
  CardsWrap,
  CardsSort,
  CardsSortItem,
  TagsBar,
  EventButtons,
  Loading,
  Link,
  CardProduct,
} from 'components';

import { fetchPosts, fetchTags } from 'ducks/TagSearch/actions';

import { __t } from './../../i18n/translator';

import './Tag.styl';

const propTypes = {
  routeParams: PropTypes.object,
  dispatch: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

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

    return (
      <div>
        {
          tags.length > 0
          &&
          <TagsBar
            tags={tags}
          />
        }
      </div>
    );
  }
}

Tag.propTypes = propTypes;

const mapStateToProps = ({
  Auth,
  Settings,
  TagSearch,
}) => ({
    isAuthenticated: Auth.isAuthenticated,
    priceTemplate: Settings.data.CURRENCY,
    items: TagSearch.items,
    tags: TagSearch.tags,
    isFetching: TagSearch.isFetching,
    pageCount: TagSearch.pageCount,
  });

export default connect(mapStateToProps)(Tag);

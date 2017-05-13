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

import { __t } from './../../i18n/translator';

import { getJsonFromStorage } from 'utils/functions';

import './Tag.styl';
import { API_URL } from 'config';


const propTypes = {
  routeParams: PropTypes.object,
  dispatch: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

class Tag extends Component {
  constructor() {
    super();
    this.state = {
      isFetching: true,
      result: [],
      tags: {
        results: [],
      },
      pageCount: 0,
      hasMoreItems: true,
      nextHref: null,
    };
  }

  componentDidMount() {
    this.loadItems();
    this.loadRelativeTags();
  }

  componentDidUpdate(prevProps) {
    const { routeParams } = this.props;

    if (prevProps.routeParams !== routeParams) {
      this.setState({
        result: [],
        tags: {
          results: [],
        },
        isFetching: true,
        hasMoreItems: true,
      });

      this.loadItems();
      this.loadRelativeTags();
    }
  }

  loadRelativeTags = () => {
    const { routeParams } = this.props;

    fetch(`${API_URL}tags/?related_with=${routeParams.tags}`)
      .then(response => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }

        return response.json();
      })
      .then(tags => {
        this.setState({ tags });
      });
  }

  loadItems = () => {
    const { routeParams } = this.props;
    const { result } = this.state;
    const page = routeParams.page || 1;
    const token = getJsonFromStorage('id_token') || null;
    const config = { headers: {} };

    this.setState({
      pageCount: 0,
    });

    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }

    fetch(`${API_URL}posts/?page=${page}&tags=${routeParams.tags}`, config)
      .then(response => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }

        return response.json();
      })
      .then(results => {
        let array;
        const pageCount = Math.ceil(results.count / 30);

        if (page !== 1) {
          array = result.concat(results.results);
        } else {
          array = results.results;
        }

        this.setState({
          result: array,
          isFetching: false,
          pageCount,
        });
      });
  }

  render() {
    const { tags, pageCount } = this.state;
    const {
      routeParams,
      dispatch,
      isAuthenticated,
    } = this.props;

    const pageButtons = () => {
      const buttons = [];

      for (let i = 1; i <= pageCount; i++) {
        const activeLink = routeParams.page || '1';
        const template = (
          <Link
            to={`/tags/${routeParams.tags}/${i}`}
            key={`${i}-pagelink`}
            className={`page__link ${activeLink === i.toString() ? 'page__link--active' : ''}`}
          >
            {i}
          </Link>
        );
        buttons.push(template);
      }

      return buttons;
    };
    const tagsList = routeParams.tags
      .split(',');

    const tagsSharp = tagsList
      .map(tag => `#${tag}`)
      .join(' ');

    return (
      <div className="container-fluid tag-page">
        <Helmet
          title={`${tagsList.join(', ')}`}
        />
        <EventButtons />
        {
          tags.results.length > 0
            &&
          <TagsBar
            tags={tags.results}
            previousTags={routeParams.tags}
          />
        }
        <CardsWrap legacy>
          <CardsSort>
            {tagsSharp}
            <CardsSortItem to="/new-products">{__t('New')}</CardsSortItem>
            <CardsSortItem to="/popular-products">{__t('Popular')}</CardsSortItem>
            <CardsSortItem to="/nearest-products">{__t('Beside')}</CardsSortItem>
          </CardsSort>
        </CardsWrap>
          {
            this.state.result.map(item => <CardProduct
              key={`${item.slug}--tag`}
              data={item}
              isAuthenticated={isAuthenticated}
              legacy
              dispatch={dispatch}
              priceTemplate={this.props.priceTemplate}
            />)
          }
        <Loading loading={this.state.isFetching} />
        <div className="page__links">
          {
            pageCount
              ? pageButtons()
              : null
          }
        </div>
      </div>
    );
  }
}

Tag.propTypes = propTypes;

function mapStateToProps(state) {
  const auth = state.Auth || {
    isAuthenticated: false,
  };

  return {
    isAuthenticated: auth.isAuthenticated,
    priceTemplate: state.Settings.data.CURRENCY,
  };
}

export default connect(mapStateToProps)(Tag);

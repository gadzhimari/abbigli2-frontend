import React, { Component, PropTypes } from 'react';

import Helmet from 'react-helmet';
import { connect } from 'preact-redux';
import InfiniteScroll from 'react-infinite-scroller';

import {
  CardsWrap,
  CardsSort,
  BlogCard,
  Loading,
} from 'components';

import { fetchData as fetchDataBlogs } from 'ducks/Blogs';
import { __t } from './../../i18n/translator';

import './BlogsPage.styl';

class BlogsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      popular: false,
    };
  }

  componentWillMount() {
    const { dispatch, page, itemsBlogs } = this.props;

    if (itemsBlogs.length === 0) {
      dispatch(fetchDataBlogs(page));
    }
  }

  componentDidMount() {
    document.body.scrollTop = 0;
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchValue } = this.state;
    const { dispatch } = this.props;

    if ((prevState.searchValue !== searchValue) && searchValue.length) {
      dispatch(fetchDataBlogs(1, searchValue));
    }
  }

  setFilter = (filter) => {
    const { dispatch } = this.props;

    this.setState({
      popular: filter,
      searchValue: '',
    });

    dispatch(fetchDataBlogs(1, '', filter));
  }

  handleChange = ({ target }) => {
    this.setState({
      searchValue: target.value,
    });
  }

  search = () => {
    const request = this.searchInput.value;

    if (request.length > 0) {
      this.setState({
        searchValue: request,
        popular: false,
      });
    }
  }

  loadMore = () => {
    const { searchValue, popular } = this.state;
    const { dispatch, isFetchingMore, next, page } = this.props;

    if (isFetchingMore || next === null) return;

    dispatch(fetchDataBlogs(page, searchValue, popular));
  }

  keyDown = (e) => {
    const keyCode = e.keyCode;

    if (keyCode === 13) {
      this.search();
      this.searchInput.blur();
    }
  }

  render() {
    const {
      isFetchingBlogs,
      isFetchingMore,
      itemsBlogs,
      dispatch,
      isAuthenticated,
    } = this.props;
    const { searchValue, popular } = this.state;

    const loader = <Loading loading={isFetchingMore} />;

    return (
      <div className="container-fluid blogs-page">
        <CardsWrap legacy>
          <CardsSort>
            <div className="cards-sort__icon">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.258 36">
                <path d="M23,6H5v3h18V6z M23,11H5v3h18V11z M5,19h18v-3H5V19z M25,33H3V3h22v16.83l3-3.001V3c0-1.657-1.344-3-3-3H3 C1.343,0,0,1.343,0,3v30c0,1.656,1.343,3,3,3h22c1.656,0,3-1.344,3-3v-7.831l-3,2.997V33z M31.515,14.659l-1.634,1.636l2.739,2.74 l1.638-1.634L31.515,14.659z M20.168,26.079L19,30l3.92-1.169l8.8-8.793l-2.756-2.759L20.168,26.079z" />
              </svg>
            </div>
            {__t('Blogs')}
            <a
              className={`cards-sort__item ${popular ? '' : 'cards-sort__item--active'}`}
              onClick={() => this.setFilter(false)}
            >
              {__t('New')}
            </a>
            <a
              className={`cards-sort__item ${popular ? 'cards-sort__item--active' : ''}`}
              onClick={() => this.setFilter(true)}
            >
              {__t('Popular')}
            </a>
          </CardsSort>
          <div
            className="search-input-wrap"
            style={{
              maxWidth: '300px',
              margin: '0 auto 20px',
              padding: '0'
            }}
          >
            <input
              className="search-input"
              type="text"
              value={searchValue}
              placeholder={__t('Blogs search')}
              ref={input => (this.searchInput = input)}
              onKeyDown={this.keyDown}
              onChange={this.handleChange}
              style={{
                padding: '4px 10px',
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12px"
              height="12.001px"
              viewBox="0 0 12 12.001"
              className="search-icon"
              onClick={this.search}
            >
              <path d="M4.817,2.142c-1.478,0-2.677,1.199-2.677,2.676c0,1.477,1.199,2.676,2.677,2.676c1.477,0,2.675-1.2,2.675-2.676 C7.492,3.34,6.294,2.142,4.817,2.142z M10.479,12.001L7.364,8.886C6.625,9.356,5.748,9.635,4.807,9.635C2.151,9.635,0,7.483,0,4.817 S2.151,0,4.817,0c2.665,0,4.817,2.151,4.817,4.817c0,0.942-0.279,1.809-0.75,2.56L12,10.48L10.479,12.001z" />
            </svg>
          </div>

          {
            isFetchingBlogs
              ? <Loading loading={isFetchingBlogs} />
              : <InfiniteScroll
                loadMore={this.loadMore}
                loader={loader}
                hasMore={!!this.props.next}
              >
                {
                  itemsBlogs.length > 0
                    ? itemsBlogs.map(item => <BlogCard
                      key={'blog' + item.id}
                      data={item}
                      legacy
                      dispatch={dispatch}
                      isAuthenticated={isAuthenticated}
                    />)
                    : <div className="pages__error-text">{__t('Not results for your request')}</div>
                }
              </InfiniteScroll>
          }

        </CardsWrap>
      </div>
    );
  }
}

BlogsPage.propTypes = {
  itemsBlogs: PropTypes.array.isRequired,
  isFetchingBlogs: PropTypes.bool.isRequired,
  isFetchingMore: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  next: PropTypes.any,
};

function mapStateToProps(state) {
  const blogs = (state.Blogs) || { isFetching: true, items: [], isFetchingMore: false };
  const auth = state.Auth || {
    isAuthenticated: false,
  };

  return {
    itemsBlogs: blogs.items,
    isFetchingBlogs: blogs.isFetching,
    isFetchingMore: blogs.isFetchingMore,
    next: blogs.next,
    isAuthenticated: auth.isAuthenticated,
    page: blogs.page,
  };
}

export default connect(mapStateToProps)(BlogsPage);

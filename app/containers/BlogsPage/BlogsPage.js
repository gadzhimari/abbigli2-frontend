import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
  BreadCrumbs,
  BlogCard,
  Loading,
  ListWithNew,
  PageSwitcher,
} from 'components';

import { fetchData } from 'ducks/blogs';
import { __t } from '../../i18n/translator';

import './BlogsPage.less';

class BlogsPage extends Component {
  componentDidMount() {
    this.props.fetchBlogs();
  }

  render() {
    const { isFetching, items } = this.props;

    const crumbs = [{
      title: __t('Blogs'),
      url: '/blogs',
    }];

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
          <div className="filter">
            <div className="select-wrap">
              <div className="select">
                <input className="input" type="text" />
                <div className="select__dropdown">
                  <div className="select__item">Любое</div>
                </div>
              </div>
            </div>
            <div className="filter__search">
              <input className="input" type="text" />
              <button className="default-button" type="button">Найти</button>
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

const mapStateToProps = ({ Blogs }) => ({
  isFetching: Blogs.isFetching,
  items: Blogs.items,
  searchValue: Blogs.searchValue,
});

const mapDispatchToProps = dispatch => ({
  fetchBlogs: (page, searchValue, popular) => dispatch(fetchData(page, searchValue, popular)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogsPage);

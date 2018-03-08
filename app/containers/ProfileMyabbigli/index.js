import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CardProduct, Link } from '../../components';
import { Spin } from '../../components-lib';
import { fetchData as fetchDataPosts, removePost } from '../../ducks/ProfilePosts';

import { gaSendClickEvent } from '../../lib/analitics';
import { __t } from './../../i18n/translator';

import './index.styl';

class ProfileMyabbigli extends Component {
  static prerenderData = ({ store }, nextState, replace, callback) => {
    Promise.all([
      store.dispatch(fetchDataPosts({
        isMe: false,
        profileId: nextState.params.profile,
        type: 'posts',
        page: 1,
        isAuth: false,
      })),
    ]).then(() => callback());
  }

  componentDidMount() {
    this.fetchPosts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params !== this.props.params) {
      this.fetchPosts();
    }
  }

  onCreateLinkClick = () => {
    gaSendClickEvent('profile', 'add');
  }

  fetchPosts = (page) => {
    const { isMe, dispatch, params, isAuth } = this.props;
    const options = {
      isMe,
      profileId: params.profile,
      type: 'posts',
      page,
      isAuth,
    };

    dispatch(fetchDataPosts(options));
  }

  render() {
    const { isFetchingPosts, itemsPosts, dispatch, isAuth, isMe } = this.props;

    return (
      <div className="profile_content">

        {isMe &&
          <h5 className="my-abbigli__text">
            {__t('My.abbigly.propfile')}
          </h5>
        }

        {(!isMe && !itemsPosts.length && !isFetchingPosts) &&
          <h5 className="my-abbigli__text">
            {__t('Nothing here yet')}
          </h5>
        }

        <div className="cards-wrap my-showcase legacy">

          {isMe &&
            <Link
              className="card-add-wrap"
              onClick={this.onCreateLinkClick}
              to={'/post/new'}
            >
              <img
                className="card-img"
                src="/images/card-bg.png"
                style={{ opacity: 0 }}
                alt=""
              />

              <div className="card-add">
                <div className="card-add__text">
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M16,7H9V0H7v7H0v2h7v7h2V9h7V7z" />
                  </svg>
                  {__t('add.on.abbigli')}
                </div>
              </div>
            </Link>
          }


          {
            (!isFetchingPosts && itemsPosts.length > 0)
              &&
            itemsPosts.map(item => (
              <CardProduct
                data={item}
                legacy
                key={`${item.slug}--myabbigli`}
                editable={this.props.isMe}
                me={this.props.me}
                dispatch={dispatch}
                priceTemplate={this.props.priceTemplate}
                isAuthenticated={isAuth}
                delete={() => {
                  dispatch(removePost(item.slug));
                }}
                full
              />
            ))
          }

          <div className="spin-wrapper">
            <Spin visible={isFetchingPosts} />
          </div>
        </div>
      </div>
    );
  }
}


ProfileMyabbigli.propTypes = {
  itemsPosts: PropTypes.array.isRequired,
  isFetchingPosts: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  isMe: PropTypes.bool,
  isAuth: PropTypes.bool,
  me: PropTypes.object,
};

function mapStateToProps(state) {
  const posts = (state.ProfilePosts) || { isFetching: true, items: [] };

  return {
    itemsPosts: posts.items,
    isFetchingPosts: posts.isFetching,
    isAuth: state.Auth.isAuthenticated,
    priceTemplate: state.Settings.data.CURRENCY,
  };
}

export default connect(mapStateToProps)(ProfileMyabbigli);

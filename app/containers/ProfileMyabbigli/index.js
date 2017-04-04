import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  CardProduct,
  Loading,
  Link,
} from 'components';
import { fetchData as fetchDataPosts, removePost } from 'ducks/ProfilePosts';
import { __t } from './../../i18n/translator';

import './index.styl';


class ProfileMyabbigli extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.fetchPosts();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.routes !== this.props.routes) {
      this.fetchPosts();
    }
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
      <div id="profile_content">

        {
          isMe
          &&
          <h5
            style={{
              margin: '35px 0px',
              width: '100%',
              textAlign: 'center',
              color: '#8A9093',
            }}
          >
            {__t('My.abbigly.propfile')}
          </h5>
        }
        {
          (!isMe && !itemsPosts.length && !isFetchingPosts)
          &&
          <h5
            style={{
              margin: '35px 0px',
              width: '100%',
              textAlign: 'center',
              color: '#8A9093',
            }}
          >
            {__t('Nothing here yet')}
          </h5>
        }
        <div className="cards-wrap my-showcase legacy">

          {
            isMe
              &&
            <Link
              className="card-add-wrap"
              to={'/post/new'}
            >
              <img className="card-img" src="/static/new_theme/images/card-bg.png" style={{ opacity: 0 }} />
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
                isAuthenticated={isAuth}
                delete={() => {
                  dispatch(removePost(item.slug));
                }}
              />
            ))
          }

          <Loading loading={isFetchingPosts} />
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
  };
}

export default connect(mapStateToProps)(ProfileMyabbigli);

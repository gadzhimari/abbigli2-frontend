import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Spin, Link } from '../../components-lib';
import { Card } from '../../components-lib/Cards';
import IconPlus from '../../icons/plus';

import * as actions from '../../ducks/ProfilePosts/actions';
import setLike from '../../ducks/Like/actions';

import { gaSendClickEvent } from '../../lib/analitics';
import { __t } from './../../i18n/translator';

import './index.less';

class ProfileMyabbigli extends Component {
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
    const { isMe, params, loadPosts } = this.props;

    loadPosts({
      isMe,
      profileId: params.profile,
      type: 'posts',
      page,
    });
  }

  render() {
    const {
      isFetchingPosts,
      itemsPosts,
      isAuth,
      isMe,
      deletePost,
      setLike
    } = this.props;

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

        <div className="cards-row">
          {isMe &&
            <div className="Card Card_type_attach">
              <Link
                className="Card__button Card__button_attach"
                onClick={this.onCreateLinkClick}
                to="/post/new"
                text={__t('add.on.abbigli')}
                size="l"
                color="black"
                icon={<IconPlus
                  size={'s'}
                  color="white"
                />}
              />
            </div>
          }

          {
            (!isFetchingPosts && itemsPosts.length > 0)
              &&
            itemsPosts.map(item => (
              <Card
                data={item}
                key={item.slug}
                me={this.props.me}
                setLike={setLike}
                priceTemplate={this.props.priceTemplate}
                isAuthenticated={isAuth}
                delete={deletePost}
                isMe={isMe}
                canEdit={isMe}
                view={2}
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

function mapStateToProps(state) {
  const posts = state.ProfilePosts;

  return {
    itemsPosts: posts.items,
    isFetchingPosts: posts.isFetching,
    isAuth: state.Auth.isAuthenticated,
    priceTemplate: state.Settings.data.CURRENCY,
  };
}

export default connect(mapStateToProps, { ...actions, setLike })(ProfileMyabbigli);

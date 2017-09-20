import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  Gallery,
  AuthorInfo,
  OtherArticles,
  BreadCrumbs,
  Sidebar,
  FavoriteAdd,
  NewPost,
  RelativePosts,
} from 'components';
import { CommentsField, CommentsList } from 'components/Comments';
import { Event } from 'components/Cards';

import postLoader from 'App/HOC/postLoader';

import { connect } from 'react-redux';
import { sendComment } from 'ducks/Comments';

import { fetchPost, fetchNew, resetPost, fetchPopular, fetchRelative, toggleFavorite, fetchUsersPosts } from 'ducks/PostPage/actions';

import { fetchData as fetchDataComments } from 'ducks/Comments';

import { __t } from '../../i18n/translator';

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

class EventPage extends Component {
  static fetchData = (dispatch, params, token) => dispatch(fetchPost(params.slug, 3, token))

  static fetchSubData = (dispatch, data, params) => Promise.all([
    dispatch(fetchNew({
      type: 3,
    })),
    dispatch(fetchDataComments(params.slug)),
    dispatch(fetchUsersPosts(3, data.user.id)),
    dispatch(fetchPopular(3)),
    dispatch(fetchRelative(params.slug)),
  ])

  static onUnmount = (dispatch) => {
    dispatch(resetPost());
  }

  componentDidMount() {
    this.globalWrapper = document.querySelector('.global-wrapper');
    this.globalWrapper.classList.add('event', 'article');
  }

  componentWillUnmount() {
    this.globalWrapper.classList.remove('event', 'article');
  }

  handleFavorite = () => this.props.dispatch(toggleFavorite(this.props.data.slug))

  sendComment = (comment) => {
    const { dispatch } = this.props;

    dispatch(sendComment(comment));
  }

  renderSlider = () => {
    const {
      images,
      tags,
      title,
    } = this.props.data;

    const defaultImages = images
      &&
      images
        .filter(item => item.type !== 'redactor')
        .map(image => ({
          original: image.file,
          thumbnail: image.file,
          originalAlt: tags.join(' '),
          originalTitle: title,
        }));

    return defaultImages && <Gallery images={defaultImages} />;
  }

  render() {
    const commentsList = this.props.itemsComments;

    const {
      isFetchingEvents,
      itemsEvents,
      dispatch,
      data,
      author,
      popularPosts,
      relativePosts,
      usersPosts,
    } = this.props;
    const crumbs = [{
      title: __t('Events'),
      url: '/events',
    },
    {
      title: data.user.profile_name || `User ID: ${data.user.id}`,
      url: `/profile/${data.user.id}`,
    },
    {
      title: data.title,
      url: `/event/${data.slug}`,
    }];

    return (
      <main>
        <div className="subscription-article">
          <div className="subscription-article__container">
            <AuthorInfo
              data={author}
              dispatch={dispatch}
            />
            <OtherArticles articles={usersPosts} />
          </div>
        </div>
        <main className="main">
          <BreadCrumbs crumbs={crumbs} />
          <div className="content">
            <h1 className="section-title">
              <svg className="icon icon-event" viewBox="0 0 27 26">
                <path d="M22.2,3v2.1c0,2-1.6,3.5-3.5,3.5S15.1,7,15.1,5.1V3h-2.9v2.1c0,2-1.6,3.5-3.5,3.5 S5.1,7,5.1,5.1V3H0V26h27V3H22.2z M8.8,22.8H4.2v-4h4.5V22.8z M8.8,15.7H4.2v-4h4.5V15.7z M15.8,22.8h-4.5v-4h4.5V22.8z M15.8,15.7 h-4.5v-4h4.5V15.7z M18.2,22.8v-4h4.5L18.2,22.8z M22.8,15.7h-4.5v-4h4.5V15.7z" />
                <path d="M8.6,6.9c1,0,1.8-0.8,1.8-1.8V1.8c0-1-0.8-1.8-1.8-1.8S6.8,0.8,6.8,1.8v3.3 C6.8,6.1,7.6,6.9,8.6,6.9z" />
                <path d="M18.6,6.9c1,0,1.8-0.8,1.8-1.8V1.8c0-1-0.8-1.8-1.8-1.8s-1.8,0.8-1.8,1.8v3.3 C16.8,6.1,17.6,6.9,18.6,6.9z" />
              </svg>
              {data.title}
            </h1>
            {this.renderSlider()}
            <div
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
            <FavoriteAdd
              toggleFavorite={this.handleFavorite}
              isFavorited={data.favorite}
            />
            <CommentsField
              onSend={this.sendComment}
            />
            <CommentsList
              comments={commentsList}
            />
          </div>
          <Sidebar
            data={data}
            newPosts={itemsEvents}
            popularPosts={popularPosts}
            toggleFavorite={this.handleFavorite}
            isFavorited={data.favorite}
          />
          {
            relativePosts.length > 0
            &&
            <RelativePosts
              items={relativePosts}
              Component={Event}
              slug={data.slug}
            />
          }
          <div className="section">
            <div className="cards-wrap">
              {
                newData.map(item => <NewPost
                  data={item}
                  key={item.id}
                />)
              }
            </div>
          </div>
        </main>
      </main>
    );
  }
}

EventPage.propTypes = {
  data: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const comments = state.Comments;
  const auth = state.Auth || {
    isAuthenticated: false,
  };

  return {
    data: state.PostPage.post,
    author: state.PostPage.author,
    isFetching: state.PostPage.isFetchingPost,
    isDefined: state.PostPage.isDefined,
    itemsEvents: state.PostPage.newPosts,
    isFetchingEvents: state.PostPage.isFetchingNew,
    itemsComments: comments.items,
    isFetchingComments: comments.isFetching,
    isAuthenticated: auth.isAuthenticated,
    popularPosts: state.PostPage.popularPosts,
    relativePosts: state.PostPage.relativePosts,
    usersPosts: state.PostPage.usersPosts,
  };
}

export default connect(mapStateToProps)(postLoader(EventPage));

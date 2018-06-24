import { connect } from 'react-redux';
import { React, Component } from '../../components-lib/__base';

import {
  Gallery,
  AuthorInfo,
  OtherArticles,
  BreadCrumbs,
  Sidebar,
  FavoriteAdd,
  RelativePosts,
  ListWithNew,
} from '../../components';
import { Comments } from '../../components/Comments';
import { Event } from '../../components-lib/Cards';
import DateRange from '../../components/DateRange';
import City from '../../components-lib/City';
import { Icon } from '../../components-lib';

import Link from '../../components/Link/Link';
import createPostEditLink from '../../lib/links/edit-post-link';
import postLoader from '../../HOC/postLoader';

import {
  fetchPost,
  fetchNew,
  resetPost,
  fetchPopular,
  fetchRelative,
  fetchUsersPosts,
  setFollow,
  addBookmark,
  deleteBookmark,
  toggleFavorite
} from '../../ducks/PostPage/actions';
import { sendComment, fetchComments } from '../../ducks/Comments/actions';
import { openPopup } from '../../ducks/Popup/actions';

import { EVENT_TYPE } from '../../lib/constants/posts-types';

import { __t } from '../../i18n/translator';
import './EventPage.less';

class EventPage extends Component {
  componentDidMount() {
    this.globalWrapper = document.querySelector('.global-wrapper');
    this.globalWrapper.classList.add('event');
  }

  componentWillUnmount() {
    this.globalWrapper.classList.remove('event');
  }

  sendComment = (comment) => {
    const { sendComment, data: { slug } } = this.props;
    sendComment({ text: comment, slug });
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
      itemsEvents,
      data,
      author,
      popularPosts,
      relativePosts,
      usersPosts,
      me,
      isAuthenticated,
      followUser,
      openPopup,
      toggleFavorite
    } = this.props;

    const crumbs = [{
      title: __t('Events'),
      url: '/events',
    },
    {
      title: author.profile_name || `User ID: ${author.id}`,
      url: `/profile/${author.id}`,
    },
    {
      title: data.title,
      url: `/event/${data.slug}`,
    }];

    const userIsOwner = author.id === me.id;
    const { city } = data;

    const favoriteAddProps = {
      toggleFavorite,
      isFavorite: data.is_favorite,
      slug: data.slug
    };

    const editingLink = createPostEditLink(data, EVENT_TYPE);
    const eventIcon = <Icon glyph="event" color="pink" />;

    return (
      <main>
        <div className="subscription-article">
          <div className="subscription-article__container">
            <AuthorInfo
              data={author}
              canSubscribe={!userIsOwner}
              followUser={followUser}
            />

            <OtherArticles
              articles={usersPosts}
              data={author}
              type={EVENT_TYPE}
            />
          </div>
        </div>
        <div className="main article">
          <BreadCrumbs crumbs={crumbs} />

          <div className="content">
            <div className="article__wrapper">
              <h1 className="section-title">
                {userIsOwner ?
                  <Link to={editingLink}>
                    {eventIcon}
                  </Link> :
                  eventIcon
                }

                {data.title}
              </h1>

              <div className="article__date">
                <DateRange
                  start={data.start}
                  end={data.end}
                />
              </div>

              <City
                className="article__city"
                city={city}
              />

              {this.renderSlider()}

              <div>{data.description}</div>

              {userIsOwner &&
                <Link to={editingLink} className="edit-btn">
                  <svg className="icon icon-edit" viewBox="0 0 18 18">
                    <path d="M0,14.249V18h3.75L14.807,6.941l-3.75-3.749L0,14.249z M17.707,4.042c0.391-0.391,0.391-1.02,0-1.409l-2.34-2.34c-0.391-0.391-1.019-0.391-1.408,0l-1.83,1.829l3.749,3.749L17.707,4.042z" />
                  </svg>

                  {__t('Edit')}
                </Link>
              }
            </div>

            <FavoriteAdd {...favoriteAddProps} />

            <Comments
              onSend={this.sendComment}
              canComment={isAuthenticated}
              openPopup={openPopup}
              comments={commentsList}
            />
          </div>

          <Sidebar
            data={data}
            newPosts={itemsEvents}
            popularPosts={popularPosts}

            seeAllUrl="/events"
            newSectionTitle={__t('New in events')}
            popularSectionTitle={__t('Popular in events')}

            type={EVENT_TYPE}

            {...favoriteAddProps}
          />

          {relativePosts.length > 0 &&
            <RelativePosts
              items={relativePosts}
              Component={Event}
              slug={data.slug}
              type={EVENT_TYPE}
            />
          }

          <div className="section">
            <ListWithNew
              showOnlyNew
              itemsType={EVENT_TYPE}
            />
          </div>
        </div>
      </main>
    );
  }
}

function mapStateToProps(state) {
  const auth = state.Auth;

  return {
    data: state.PostPage.post,
    author: state.PostPage.author,
    isFetching: state.PostPage.isFetchingPost,
    isDefined: state.PostPage.isDefined,
    itemsEvents: state.PostPage.newPosts,
    isFetchingEvents: state.PostPage.isFetchingNew,
    itemsComments: state.Comments.comments,
    isFetchingComments: state.Comments.commentFetchingState,
    isAuthenticated: auth.isAuthenticated,
    popularPosts: state.PostPage.popularPosts,
    relativePosts: state.PostPage.relativePosts,
    usersPosts: state.PostPage.usersPosts,
    me: state.Auth.me,
    isFetchingBookmarks: state.PostPage.isFetchingBookmarks,
  };
}

// TODO: тип поста (event) можно сохранить в при первом запросе посте (fetchPost)
// и при последующих запросах брать оттуда не пробрасывая в каждый экшен
const mapDispatch = dispatch => ({
  fetchPost: (...args) => dispatch(fetchPost(EVENT_TYPE, ...args)),
  fetchSubData: (data, params) => {
    dispatch(fetchNew(EVENT_TYPE));
    dispatch(fetchComments(EVENT_TYPE, params.slug));
    dispatch(fetchUsersPosts(EVENT_TYPE, data.author.id, data.id));
    dispatch(fetchPopular(EVENT_TYPE));
    dispatch(fetchRelative(EVENT_TYPE, params.slug));
  },

  followUser: id => dispatch(setFollow(id)),
  sendComment: data => dispatch(sendComment(EVENT_TYPE, data)),
  openPopup: (...args) => dispatch(openPopup(...args)),

  addBookmark: id => dispatch(addBookmark(EVENT_TYPE, id)),
  deleteBookmark: bookmarkId => dispatch(deleteBookmark(bookmarkId)),

  onUnmount: () => dispatch(resetPost()),
  toggleFavorite: slug => dispatch(toggleFavorite(EVENT_TYPE, slug))
});

export default connect(mapStateToProps, mapDispatch)(postLoader(EventPage));

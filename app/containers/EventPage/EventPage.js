import { connect } from 'react-redux';
import { React, Component, Type } from '../../components-lib/__base';

import {
  Gallery,
  AuthorInfo,
  OtherArticles,
  BreadCrumbs,
  Sidebar,
  FavoriteAdd,
  RelativePosts,
} from '../../components';
import { Comments } from '../../components/Comments';
import { Event } from '../../components-lib/Cards';
import DateRange from '../../components/DateRange';
import City from '../../components-lib/City';

import Link from '../../components/Link/Link';
import { processBlogContent } from '../../lib/process-html';
import createPostEditLink from '../../lib/links/edit-post-link';
import postLoader from '../../HOC/postLoader';

import {
  fetchPost,
  fetchNew,
  resetPost,
  fetchPopular,
  fetchRelative,
  toggleFavorite,
  fetchUsersPosts,
  setFollow
} from '../../ducks/PostPage/actions';
import { sendComment, fetchComments } from '../../ducks/Comments/actions';
import { openPopup } from '../../ducks/Popup/actions';


import { EVENT_TYPE } from '../../lib/constants/posts-types';

import { __t } from '../../i18n/translator';
import './EventPage.less';

class EventPage extends Component {
  static propTypes = {
    data: Type.shape().isRequired
  };

  componentDidMount() {
    this.globalWrapper = document.querySelector('.global-wrapper');
    this.globalWrapper.classList.add('event');
  }

  componentWillUnmount() {
    this.globalWrapper.classList.remove('event');
  }

  sendComment = (comment) => {
    const { sendComment, data: { slug } } = this.props;
    sendComment({ comment, slug });
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
      handleFavorite,
      followUser,
      openPopup
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

    const userIsOwner = author.id === me.id;
    const { city } = data;

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
            />
          </div>
        </div>
        <div className="main article">
          <BreadCrumbs crumbs={crumbs} />

          <div className="content">
            <div className="article__wrapper">
              <h1 className="section-title">
                {userIsOwner &&
                  <Link to={createPostEditLink({ id: data.user.id, slug: data.slug })}>
                    <svg className="icon icon-event" viewBox="0 0 27 26">
                      <path d="M22.2,3v2.1c0,2-1.6,3.5-3.5,3.5S15.1,7,15.1,5.1V3h-2.9v2.1c0,2-1.6,3.5-3.5,3.5 S5.1,7,5.1,5.1V3H0V26h27V3H22.2z M8.8,22.8H4.2v-4h4.5V22.8z M8.8,15.7H4.2v-4h4.5V15.7z M15.8,22.8h-4.5v-4h4.5V22.8z M15.8,15.7 h-4.5v-4h4.5V15.7z M18.2,22.8v-4h4.5L18.2,22.8z M22.8,15.7h-4.5v-4h4.5V15.7z" />
                      <path d="M8.6,6.9c1,0,1.8-0.8,1.8-1.8V1.8c0-1-0.8-1.8-1.8-1.8S6.8,0.8,6.8,1.8v3.3 C6.8,6.1,7.6,6.9,8.6,6.9z" />
                      <path d="M18.6,6.9c1,0,1.8-0.8,1.8-1.8V1.8c0-1-0.8-1.8-1.8-1.8s-1.8,0.8-1.8,1.8v3.3 C16.8,6.1,17.6,6.9,18.6,6.9z" />
                    </svg>
                  </Link>
                }

                {data.title}
              </h1>

              <div className="article__date">
                <DateRange
                  start={data.date_start}
                  end={data.date_end}
                />
              </div>

              <City
                className="article__city"
                city={city}
              />

              {this.renderSlider()}

              <div>{processBlogContent(data.content)}</div>

              {userIsOwner &&
                <Link to={createPostEditLink({ id: data.user.id, slug: data.slug })} className="edit-btn">
                  <svg className="icon icon-edit" viewBox="0 0 18 18">
                    <path d="M0,14.249V18h3.75L14.807,6.941l-3.75-3.749L0,14.249z M17.707,4.042c0.391-0.391,0.391-1.02,0-1.409l-2.34-2.34c-0.391-0.391-1.019-0.391-1.408,0l-1.83,1.829l3.749,3.749L17.707,4.042z" />
                  </svg>

                  {__t('Edit')}
                </Link>
              }
            </div>

            <FavoriteAdd
              toggleFavorite={handleFavorite}
              slug={data.slug}
              isFavorited={data.favorite}
            />

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
            toggleFavorite={handleFavorite}
            isFavorited={data.favorite}
            seeAllUrl="/events"
            newSectionTitle={__t('New in events')}
            popularSectionTitle={__t('Popular in events')}
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
          {/* <div className="section">
            <div className="cards-wrap">
              {
                newData.map(item => <NewPost
                  data={item}
                  key={item.id}
                />)
              }
            </div>
          </div> */}
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
  };
}

const mapDispatch = dispatch => ({
  fetchPost: (...args) => dispatch(fetchPost(...args)),
  fetchSubData: (data, params) => {
    dispatch(fetchNew({ type: EVENT_TYPE, }));
    dispatch(fetchComments(params.slug));
    dispatch(fetchUsersPosts(EVENT_TYPE, data.user.id));
    dispatch(fetchPopular(EVENT_TYPE));
    dispatch(fetchRelative(params.slug));
  },
  onUnmount: () => dispatch(resetPost()),
  handleFavorite: slug => dispatch(toggleFavorite(slug)),
  followUser: id => dispatch(setFollow(id)),
  sendComment: data => dispatch(sendComment(data)),
  openPopup: (...args) => dispatch(openPopup(...args))
});

export default connect(mapStateToProps, mapDispatch)(postLoader(EventPage));

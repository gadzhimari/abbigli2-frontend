import React, { Component, PropTypes } from 'react';

import {
  Gallery,
} from 'components';

import {
  NotFound,
} from 'containers';

import EventView from './Components/EventView';
import postLoader from 'App/HOC/postLoader';

import { connect } from 'react-redux';
import { sendComment } from 'ducks/Comments';
import EventsPopular from './EventsPopular';

import { fetchData as fetchEvents, resetData } from 'ducks/BlogPost';
import { fetchData as fetchDataEvents } from 'ducks/Events';
import { fetchData as fetchDataComments } from 'ducks/Comments';
import { fetchData as fetchDataAuthors } from 'ducks/ProfilePosts';

class EventPage extends Component {
  static fetchData = (dispatch, params, token) => dispatch(fetchEvents(params.slug, 3, token))

  static fetchSubData = (dispatch, data, params) => Promise.all([
    dispatch(fetchDataEvents(1)),
    dispatch(fetchDataComments(params.slug)),
    dispatch(fetchDataAuthors({
      type: 'posts',
      excludeId: data.id,
      profileId: data.user.id,
    })),
  ])

  static onUnmount = (dispatch) => {
    dispatch(resetData());
  }

  sendComment = (comment) => {
    const { dispatch } = this.props;

    dispatch(sendComment(comment));
  }

  renderSlider = () => {
    const {
      images,
    } = this.props.data;

    const defaultImages = images
      &&
      images
        .filter(item => item.type !== 'redactor')
        .map(image => ({
          original: image.file,
          thumbnail: image.file,
        }));

    return defaultImages && <Gallery images={defaultImages} />;
  }

  render() {
    const commentsList = this.props.itemsComments;

    const {
      isFetchingEvents,
      itemsEvents,
      dispatch,
      isDefined,
      data,
      isAuthenticated,
    } = this.props;

    return (
      <div className="container-fluid event-detail-page" id="page-container">
        {
          isDefined
            ? (<div>
              <EventView
                isFetchingEvents={isFetchingEvents}
                itemsEvents={itemsEvents}
                sendComment={this.sendComment}
                comments={data.comments_num}
                list={commentsList}
                data={data}
                renderSlider={this.renderSlider}
                isAuthenticated={isAuthenticated}
                dispatch={dispatch}
              />
              <EventsPopular />
            </div>)
            : <NotFound />
        }

      </div>
    );
  }
}

EventPage.propTypes = {
  data: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const {
    isFetching,
    data,
    isDefined,
  } = (state.BlogPost) || {
    isFetching: true,
    data: {},
    isDefined: true,
  };
  const events = (state.Events) || { isFetching: true, items: [] };
  const comments = (state.Comments) || { isFetching: true, items: [] };
  const auth = state.Auth || {
    isAuthenticated: false,
  };

  return {
    data,
    isFetching,
    isDefined,
    itemsEvents: events.items,
    isFetchingEvents: events.isFetching,
    itemsComments: comments.items,
    isFetchingComments: comments.isFetching,
    isAuthenticated: auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(postLoader(EventPage));

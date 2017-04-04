import React, { Component, PropTypes } from 'react';

import {
  Gallery,
} from 'components';

import {
  NotFound,
} from 'containers';

import EventView from './Components/EventView';
import loaderDecorator from './Components/loaderDecorator';

import Helmet from 'react-helmet';
import { connect } from 'preact-redux';
import { sendComment } from 'ducks/Comments';
import EventsPopular from './EventsPopular';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class EventPage extends Component {
  sendComment = comment => {
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
    const {
      title,
      images,
      seo_title,
      seo_description,
    } = this.props.data;

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

        <Helmet
          title={seo_title ? seo_title : title}
          meta={[
            { "name": "description", "content": seo_description },
            (images && images.length) ? { property: 'og:image', content: images[0].file } : {},
          ]}
        />

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

export default connect(mapStateToProps)(loaderDecorator(EventPage));

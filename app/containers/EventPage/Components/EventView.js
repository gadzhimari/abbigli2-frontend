import React, { PropTypes } from 'react';
import moment from 'moment';
import { Link } from 'react-router';

import {
  SidebarItem,
  CommentsBox,
  Loading,
  AuthorSubscribe,
  Share,
} from 'components';

import { location as lang } from 'config';

import { __t } from '../../../i18n/translator';

const EventView = props => {
  const {
    isFetchingEvents,
    itemsEvents,
    data,
    sendComment,
    renderSlider,
    isAuthenticated,
    dispatch,
    comments,
    list,
  } = props;

  const location = window.location || {};

  return (
    <div className="detail__page">
      <div className="detail__info">
        <div className="title-with-icon">
          <Link
            className="title-icon"
            to="/events/"
          >
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.258 36">
              <path d="M23,6H5v3h18V6z M23,11H5v3h18V11z M5,19h18v-3H5V19z M25,33H3V3h22v16.83l3-3.001V3c0-1.657-1.344-3-3-3H3
                C1.343,0,0,1.343,0,3v30c0,1.656,1.343,3,3,3h22c1.656,0,3-1.344,3-3v-7.831l-3,2.997V33z M31.515,14.659l-1.634,1.636l2.739,2.74
		            l1.638-1.634L31.515,14.659z M20.168,26.079L19,30l3.92-1.169l8.8-8.793l-2.756-2.759L20.168,26.079z"/>
              </svg>
          </Link>
          {data.title}
        </div>
        <div className="detail__date">
          {
            moment(data.created)
              .locale(lang)
              .format('D MMMM YYYY')
          }
        </div>
        <div className="detail__stat">
          <div className="detail__comments">
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
              <path d="M0,8V0.8C0,0.359,0.36,0,0.799,0h10.402C11.641,0,12,0.359,12,0.8V12L8.799,8.799h-8C0.36,8.799,0,8.44,0,8z" />
            </svg>
            {data.comments_num}
          </div>
        </div>
        {
          data.user
          &&
          <AuthorSubscribe
            user={data.user}
            slug={data.slug}
          />
        }
        <div className="social-buttons">
          <Share
            postLink={`${location.pathname}`}
            buttonClass="social-btn"
          />
        </div>
      </div>
      <div className="detail__wrap">
        <div className="detail__content">
          {
            renderSlider()
          }

          <div
            className="detail__text"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />

          <CommentsBox
            onSend={comment => sendComment(comment)}
            slug={data.slug}
            likes={data.likes_num}
            comments={list.length}
            list={list}
            isAuthenticated={isAuthenticated}
            dispatch={dispatch}
            data={data}
          />

        </div>
        <div className="detail__sidebar">
          <div className="sidebar__section">
            <div className="sidebar__title">
              {__t('tags')}
            </div>
            <br />
            {
              data.tags
              &&
              data.tags.map(tag => (<a className="tag-btn event-tag" href={`/tags/${tag}/`}>#{tag}</a>))
            }
          </div>
          <div className="sidebar__section">
            <div className="sidebar__title">
              {__t('new.in.blogs')}
            </div>

            {
              (!isFetchingEvents && itemsEvents.length > 0)
              &&
              itemsEvents
                .slice(0, 8)
                .map(item => (<SidebarItem data={item}></SidebarItem>))
            }

            <Loading loading={isFetchingEvents} />

          </div>
        </div>
      </div>
    </div>
  );
};

EventView.propTypes = {
  isFetchingEvents: PropTypes.bool,
  itemsEvents: PropTypes.array,
  isFetchingAuthors: PropTypes.bool,
  itemsAuthors: PropTypes.array,
  data: PropTypes.object,
  sendComment: PropTypes.func,
  renderSlider: PropTypes.func,
};

export default EventView;

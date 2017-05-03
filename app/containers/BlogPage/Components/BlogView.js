import React, { PropTypes } from 'react';
import moment from 'moment';
import { Link } from 'react-router';

import {
  SidebarItem,
  CommentsBox,
  Loading,
  AuthorSubscribe,
} from 'components';

import { __t } from '../../../i18n/translator';

const ProductView = (props) => {
  const {
    isFetchingBlogs,
    itemsBlogs,
    isFetchingAuthors,
    itemsAuthors,
    data,
    sendComment,
    commentsList,
    renderSlider,
    isAuthenticated,
    dispatch,
  } = props;

  const location = window.location || {};

  return (
    <div className="detail__page">
      <div className="detail__info">
        <div className="title-with-icon">
          <Link
            to="/blogs/"
            className="title-icon"
          >
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.258 36">
              <path d="M23,6H5v3h18V6z M23,11H5v3h18V11z M5,19h18v-3H5V19z M25,33H3V3h22v16.83l3-3.001V3c0-1.657-1.344-3-3-3H3
                C1.343,0,0,1.343,0,3v30c0,1.656,1.343,3,3,3h22c1.656,0,3-1.344,3-3v-7.831l-3,2.997V33z M31.515,14.659l-1.634,1.636l2.739,2.74
		            l1.638-1.634L31.515,14.659z M20.168,26.079L19,30l3.92-1.169l8.8-8.793l-2.756-2.759L20.168,26.079z"
              />
            </svg>
          </Link>
          {data.title}
        </div>
        <div className="detail__date">
          {
            moment(data.created)
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
          <a
            className="social-btn pinterest"
            href={`https://www.pinterest.com/pin/create/button/?url=${location.href}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.912 15.975">
              <path d="M2.34,9.239c0.802-1.365-0.258-1.664-0.425-2.654c-0.679-4.043,4.847-6.806,7.741-3.98
                c2.002,1.957,0.684,7.975-2.545,7.348C4.02,9.356,8.626,4.567,6.158,3.626c-2.006-0.765-3.071,2.337-2.12,3.878
	                c-0.559,2.651-1.76,5.147-1.273,8.471c1.577-1.102,2.109-3.211,2.545-5.41c0.793,0.465,1.217,0.946,2.228,1.021
	                c3.727,0.277,5.81-3.581,5.299-7.145c-0.452-3.157-3.722-4.764-7.21-4.388C2.869,0.352,0.12,2.498,0.006,5.565
	                C-0.063,7.438,0.488,8.844,2.34,9.239z"
                />
              </svg>
          </a>
          <a
            className="social-btn facebook"
            href={`https://www.facebook.com/sharer.php?u=${location.href}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.419 16.005">
              <path d="M7.419,5.279L4.93,5.284V3.609c0,0-0.053-0.919,0.956-0.919c0-0.01,1.522,0,1.522,0V0.001H4.72
                c0,0-3.081-0.178-3.081,3.498v1.792L0,5.295v2.662h1.639v8.048H4.93V7.957h2.206L7.419,5.279z"
                />
              </svg>
          </a>
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
            comments={commentsList.length}
            list={commentsList}
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
              data.tags.map((tag, indx) => (<a className="tag-btn blog-tag" key={`${indx}--${tag}`} href={`/tags/${tag}/`}>#{tag}</a>))
            }
          </div>
          <div className="sidebar__section">
            <div className="sidebar__title">
              {__t('new.in.blogs')}
            </div>

            {
              (!isFetchingBlogs && itemsBlogs.length > 0)
              &&
              itemsBlogs
                .slice(0, 8)
                .map(item => (<SidebarItem key={`${item.slug}--blogpost`} data={item} />))
            }

            <Loading loading={isFetchingBlogs} />

          </div>
          <div className="sidebar__section">
            <div className="sidebar__title">
              {__t('other.articles.of.the.author')}
            </div>

            {
              (!isFetchingAuthors && itemsAuthors.length > 0)
              &&
              itemsAuthors
                .filter(item => (item.type === 4))
                .slice(0, 8)
                .map((item) => (<SidebarItem
                  key={`${item.slug}--fromautor`}
                  data={item}
                />))
            }
            <Loading loading={isFetchingAuthors} />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  isFetchingBlogs: PropTypes.bool,
  itemsBlogs: PropTypes.array,
  isFetchingAuthors: PropTypes.bool,
  itemsAuthors: PropTypes.array,
  data: PropTypes.object,
  sendComment: PropTypes.func,
  renderSlider: PropTypes.func,
};

export default ProductView;

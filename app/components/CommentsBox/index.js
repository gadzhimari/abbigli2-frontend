import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

import { setLike } from 'actions/like';
import { stagedPopup } from 'ducks/Auth/authActions';
import { __t } from './../../i18n/translator';

import { location } from 'config';

import './index.styl';

class CommentsBox extends Component {
  constructor() {
    super();
    this.state = {
      comment: '',
      forced: {
        like: null,
        count: null,
      },
      showComments: true,
    };
  }

  onUpdate(e) {
    this.setState({
      comment: e.target.value,
    });
  }

  toggleShowComments = ({ target }) => {
    this.setState({
      showComments: target.checked,
    });
  }

  toggleLike = () => {
    const { dispatch, isAuthenticated } = this.props;
    const { liked, slug, likes_num } = this.props.data;

    if (!isAuthenticated) {
      dispatch(stagedPopup('register'));

      return;
    }

    const newLiked = this.state.forced.like === null
      ? !liked
      : !this.state.forced.like;
    let count = this.state.forced.count === null
      ? likes_num
      : this.state.forced.count;

    const newCount = newLiked
      ? ++count
      : --count;

    this.setState({
      forced: {
        like: newLiked,
        count: newCount,
      },
    });

    dispatch(setLike(slug));
  }

  showRegister = () => {
    const { dispatch } = this.props;

    dispatch(stagedPopup('register'));
  }

  render() {
    const {
      likes,
      comments,
      list,
      onSend,
      slug,
      isAuthenticated,
      data,
    } = this.props;

    const commentForm = () => (
      <div>
        <div className="textarea-comment-wrap">
          <div className="corner-wrap">
            <div className="corner"></div>
          </div>
          <textarea
            className="textarea-comment"
            value={this.state.comment}
            onChange={e => this.onUpdate(e)}
            placeholder={__t('Your comment')}
          >
            {this.state.comment}
          </textarea>
        </div>
        <button
          className="default-button"
          type="button"
          onClick={() => { onSend({slug, comment: this.state.comment}); this.setState({comment:''})}}
        >
          { __t('Do.comment') }
        </button>
      </div>
    );

    const likeStatus = this.state.forced.like === null
      ? data.liked
      : this.state.forced.like;
    const likeCount = this.state.forced.count === null
      ? data.likes_num
      : this.state.forced.count;


    return (
      <div className="comments-container">
        <div className="like-comment">
          <div
            className="like-comment__button likes "
            onClick={this.toggleLike}
          >
            <div className="icon-wrap">
              <svg
                className={`icon ${likeStatus ? 'liked' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 34 31.193"
              >
                <path d="M17,31.193l-2.467-2.242C5.778,21.011,0,15.774,0,9.35C0,4.113,4.113,0,9.351,0C12.308,0,15.147,1.377,17,3.552 C18.853,1.377,21.691,0,24.649,0C29.886,0,34,4.113,34,9.35c0,6.425-5.781,11.661-14.537,19.618L17,31.193z"/>
              </svg>
            </div>
            { likeCount }
          </div>
          <div className="like-comment__button message">
            <div className="icon-wrap">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
                <path d="M0,8V0.8C0,0.359,0.36,0,0.799,0h10.402C11.641,0,12,0.359,12,0.8V12L8.799,8.799h-8C0.36,8.799,0,8.44,0,8z"/>
              </svg>
            </div>
            { comments }
          </div>
        </div>
        {
          isAuthenticated
            ? commentForm()
            : (
              <div
                className="comment__signup"
                onClick={this.showRegister}
              >
                {__t('Sign Up to leave a comment')}
              </div>
            )
        }

        <div className="comment-wrap">
          <div className="comment-title">
            { __t('Comments') }
          </div>
          <input
            type="checkbox"
            ref={toggle => (this.toggle = toggle)}
            name="toggle"
            id="toggle"
            value="on"
            checked={this.state.showComments}
            onChange={this.toggleShowComments}
          />
          <label
            htmlFor="toggle"
            className="comment-show"
            id="toggle-comment"
          >
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 7.001">
              <path d="M12.804,0L7,4.958L1.196,0L0,1.021l7,5.979l7-5.979L12.804,0z"/>
            </svg>
              { __t('Collapse.comments') }
          </label>
          <div className="comment-items">
            { list.length > 0 && list.map((item, i) => (
              <div
                className="comment-item"
                key={i}
              >
                <Link to={`/profile/${item.user.id}/`} className="comment-avatar">
                  {
                    item.user.avatar ?
                      <img src={item.user.avatar} alt="user-photo" className="pull-left"/>
                      :
                      <img src="http://abbigli.ru/static/new_theme/images/svg/avatar.svg" alt="user-photo"
                           className="pull-left"/>
                  }

                </Link>
                <Link className="comment-author" to={`/profile/${item.user.id}/`}>{item.user.profile_name}</Link>
                <div className="comment-date">
                  {
                    moment(item.created)
                      .locale(location)
                      .format('LLL')
                  }
                </div>
                <div className="comment-text">{item.comment}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default CommentsBox;

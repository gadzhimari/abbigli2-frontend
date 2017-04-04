import React, { PropTypes, Component } from 'react';

import { Link } from 'react-router';
import { setLike } from 'actions/like';
import { registerPopup } from 'ducks/Popup';

import './CardProduct.styl';

const typesUrl = {
  1: 'post',
  3: 'event',
  4: 'blog',
};

const typesClass = {
  1: 'product',
  3: 'event',
  4: 'blog',
};

class CardProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forced: {
        like: null,
        count: null,
      },
      imageLoaded: false,
    };
  }

  imageLoaded = () => {
    this.setState({
      imageLoaded: true,
    });
  }

  toggleLike = () => {
    const { dispatch, isAuthenticated } = this.props;
    const { liked, slug, likes_num } = this.props.data;

    if (!isAuthenticated) {
      dispatch(registerPopup());

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

  render() {
    const {
      title,
      slug,
      liked,
      price,
      images,
      type,
      comments_num,
      likes_num,
    } = this.props.data;

    const { deleteFromFavorites, editable, delete: deleteItem, me } = this.props;

    const user = editable == true ? me : this.props.data.user;

    const likeStatus = this.state.forced.like === null
      ? liked
      : this.state.forced.like;
    const likeCount = this.state.forced.count === null
      ? likes_num
      : this.state.forced.count;

    const location = window.location || {};

    return (
      <div className={`tag-card tag-card--${typesClass[type]} legacy`}>
        <div className="tag-card__img">
          <Link to={`/${typesUrl[type]}/${slug}`}>
            {
              images
              &&
              <img
                className="card-img card-image__loaded"
                alt={title}
                src={`https://abbigli.com/thumbs/unsafe/350x${editable ? 350 : 290}/` + (images[0] && images[0].file)}
              />
            }
            <div className="tag-card__overlay"></div>
          </Link>
          <div className="share">
            <div className="share-button">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.987 20">
                <path d="M16.313,12.711c-1.168,0-2.197,0.553-2.869,1.396l-6.239-3.164C7.287,10.641,7.346,10.33,7.346,10 c0-0.357-0.07-0.694-0.168-1.023l6.211-3.15c0.668,0.883,1.725,1.46,2.924,1.46c2.031,0,3.674-1.631,3.674-3.644S18.344,0,16.313,0 c-2.027,0-3.672,1.631-3.672,3.644c0,0.329,0.059,0.642,0.141,0.945L6.547,7.754C5.873,6.909,4.842,6.356,3.674,6.356 C1.643,6.356,0,7.988,0,10c0,2.012,1.643,3.644,3.674,3.644c1.199,0,2.254-0.579,2.926-1.463l6.209,3.149 c-0.098,0.328-0.168,0.667-0.168,1.026c0,2.013,1.645,3.644,3.672,3.644c2.031,0,3.674-1.631,3.674-3.644 C19.987,14.342,18.344,12.711,16.313,12.711z"/>
              </svg>
            </div>
            <object>
              <a
                target="_blank"
                href={`https://www.facebook.com/sharer.php?u=${location.origin}/${typesUrl[type]}/${slug}`}
                className="share-button facebook"
              >
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.419 16.005">
                  <path d="M7.419,5.279L4.93,5.284V3.609c0,0-0.053-0.919,0.956-0.919c0-0.01,1.522,0,1.522,0V0.001H4.72
                    c0,0-3.081-0.178-3.081,3.498v1.792L0,5.295v2.662h1.639v8.048H4.93V7.957h2.206L7.419,5.279z"/>
                </svg>
              </a>
            </object>
            <object>
              <a
                target="_blank"
                data-pin-do="buttonPin"
                href={`https://www.pinterest.com/pin/create/button/?url=${location.origin}/${typesUrl[type]}/${slug}`}
                data-pin-custom="true"
                className="share-button pinterest"
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
            </object>
          </div>
          {
            editable
            &&
            <Link
              className="card-action-button card-edit"
              to={`/profile/${user.id}/post/edit/${slug}`}
            >
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                <path d="M0,14.249V18h3.75L14.807,6.941l-3.75-3.749L0,14.249z M17.707,4.042c0.391-0.391,0.391-1.02,0-1.409
                  l-2.34-2.34c-0.391-0.391-1.019-0.391-1.408,0l-1.83,1.829l3.749,3.749L17.707,4.042z"/>
</svg>
            </Link>
          }
          {
            editable
            &&
            <div
              className="card-action-button card-delete"
              onClick={deleteItem}
            >
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                <path d="M18,1.813L16.188,0L9,7.186L1.813,0L0,1.813L7.188,9L0,16.188L1.813,18L9,10.813L16.188,18L18,16.188L10.813,9
                  L18,1.813z"/>
</svg>
            </div>
          }
          {
            deleteFromFavorites
            &&
            <div
              className="card-action-button card-delete"
              onClick={deleteFromFavorites}
            >
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                <path d="M18,1.813L16.188,0L9,7.186L1.813,0L0,1.813L7.188,9L0,16.188L1.813,18L9,10.813L16.188,18L18,16.188L10.813,9
                  L18,1.813z"/>
</svg>
            </div>
          }
          <Link
            className="tag-card__name-wrap"
            to={`/${typesUrl[type]}/${slug}`}
          >
            <div className="tag-card__name">
              <div className="icon-wrap">
                {
                  type === 1
                   &&
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 37.96">
                    <path d="M32.42,13.96L23.66,0.84C23.281,0.28,22.639,0,22,0c-0.64,0-1.28,0.28-1.661,0.86l-8.76,13.1H2
	c-1.1,0-2,0.9-2,2c0,0.18,0.02,0.36,0.08,0.54L5.16,35.04c0.46,1.68,2,2.92,3.84,2.92h26c1.84,0,3.379-1.24,3.859-2.92l5.082-18.54
	L44,15.96c0-1.1-0.9-2-2-2H32.42z M16,13.96l6-8.8l6,8.8H16z M22,29.96c-2.2,0-4-1.801-4-4s1.8-4,4-4c2.199,0,4,1.801,4,4
	S24.199,29.96,22,29.96z"/>
                  </svg>
                }
                {
                  type === 3
                   &&
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 36">
                    <path d="M29,36H3c-1.657,0-3-1.344-3-3V7c0-1.656,1.343-3,3-3h1V0h4v4h16V0h4
	v4h1c1.657,0,3,1.343,3,3v26C32,34.656,30.657,36,29,36z M29,14H3v19h26V14z M26,30h-8v-8h8V30z"/>
                  </svg>
                }
                {
                  type === 4
                    &&
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.258 36">
	                <path d="M23,6H5v3h18V6z M23,11H5v3h18V11z M5,19h18v-3H5V19z M25,33H3V3h22v16.83l3-3.001V3c0-1.657-1.344-3-3-3H3
		C1.343,0,0,1.343,0,3v30c0,1.656,1.343,3,3,3h22c1.656,0,3-1.344,3-3v-7.831l-3,2.997V33z M31.515,14.659l-1.634,1.636l2.739,2.74
		l1.638-1.634L31.515,14.659z M20.168,26.079L19,30l3.92-1.169l8.8-8.793l-2.756-2.759L20.168,26.079z"/>
                  </svg>
                }
              </div>
              {title}
            </div>
            {
              price
              &&
              <div className="tag-card__price">
                {price}
              </div>}
          </Link>
        </div>
        <div className="tag-card__info">
          {
            user
            &&
            (<Link className="tag-card__author" to={"/profile/" + user.id}>
              <div className="tag-card__avatar">
                {
                  user.avatar
                    ? <img
                      src={`https://abbigli.com/thumbs/unsafe/30x30/${user.avatar}`}
                      alt={user.profile_name ? user.profile_name : 'ID' + user.id}
                    />
                    : <img
                      src={'/images/svg/avatar.svg'}
                      alt={user.profile_name ? user.profile_name : 'ID' + user.id}
                    />

                }
              </div>
              <span>
                {
                  user.profile_name
                    ? user.profile_name
                    : `ID${user.id}`
                }
              </span>
            </Link>)
          }

          <div className="like-comment">
            <div
              className="like-comment__button likes"
              onClick={this.toggleLike}
            >
              <div className="icon-wrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 31.193"
                  className={`icon ${likeStatus ? 'liked' : ''}`}
                >
                  <path d="M17,31.193l-2.467-2.242C5.778,21.011,0,15.774,0,9.35C0,4.113,4.113,0,9.351,0C12.308,0,15.147,1.377,17,3.552
                    C18.853,1.377,21.691,0,24.649,0C29.886,0,34,4.113,34,9.35c0,6.425-5.781,11.661-14.537,19.618L17,31.193z"/>
              </svg>
              </div>
              {likeCount}
            </div>
            <div className="like-comment__button message">
              <a className="icon-wrap" href="/post/olenenok-rudolf-amigurumi#comments">
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
                  <path d="M0,8V0.8C0,0.359,0.36,0,0.799,0h10.402C11.641,0,12,0.359,12,0.8V12L8.799,8.799h-8C0.36,8.799,0,8.44,0,8z" />
                </svg>

              </a>
              {comments_num}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CardProduct.propTypes = {
  editable: PropTypes.bool,
  legacy: PropTypes.bool,
  isAuthenticated: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  delete: PropTypes.func,
  deleteFromFavorites: PropTypes.func,
  dispatch: PropTypes.func,
};

export default CardProduct;

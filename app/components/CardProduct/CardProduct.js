import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Link } from 'react-router';

import { Share } from 'components';
import { Like } from '../../components-lib';
import { ProductsIcons } from 'components/Icons';
import Avatar from '../Avatar';
import Image from '../Image';

import { setLike } from 'actions/like';
import { stagedPopup } from 'ducks/Auth/authActions';

import createPostLink from '../../lib/links/post-link';
import createPostEditLink from '../../lib/links/edit-post-link';
import createProfileLink from '../../lib/links/profile-link';

import './CardProduct.styl';

const typesClass = {
  1: 'product',
  3: 'event',
  4: 'blog',
};

class CardProduct extends Component {
  static propTypes = {
    editable: PropTypes.bool,
    legacy: PropTypes.bool,
    isAuthenticated: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    delete: PropTypes.func,
    deleteFromFavorites: PropTypes.func,
    dispatch: PropTypes.func,
  };

  state = {
    forced: {
      like: null,
      count: null,
    },
    imageLoaded: false,
  };

  imageLoaded = () => {
    this.setState({
      imageLoaded: true,
    });
  }

  toggleLike = () => {
    const {
      dispatch,
      data: {
        slug
      }
    } = this.props;

    dispatch(setLike(slug));
  }

  render() {
    const {
      priceTemplate,
      deleteFromFavorites,
      editable,
      delete: deleteItem,
      me,
      full,
    } = this.props;

    const {
      title,
      slug,
      liked,
      price,
      images,
      type,
      comments_num: commentsCount,
      likes_num: likesCount,
    } = this.props.data;

    const user = editable === true ? me : this.props.data.user;
    const formatedPrice = Number(price).toFixed(2);
    const imageUrl = images && images[0] && images[0].file;
    const thumbSize = `350x${full ? 350 : 290}`;

    return (
      <div className={`tag-card tag-card--${typesClass[type]} legacy`}>
        <div className="tag-card__img">
          <Link
            to={createPostLink(this.props.data)}
            className="card-producr__img-link"
          >
            <Image
              className="blog-card__img"
              alt={title}
              thumbSize={thumbSize}
              src={imageUrl}
            />
            <div className="tag-card__overlay" />
          </Link>
          <div className="share">
            <div className="share-button">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.987 20">
                <path d="M16.313,12.711c-1.168,0-2.197,0.553-2.869,1.396l-6.239-3.164C7.287,10.641,7.346,10.33,7.346,10 c0-0.357-0.07-0.694-0.168-1.023l6.211-3.15c0.668,0.883,1.725,1.46,2.924,1.46c2.031,0,3.674-1.631,3.674-3.644S18.344,0,16.313,0 c-2.027,0-3.672,1.631-3.672,3.644c0,0.329,0.059,0.642,0.141,0.945L6.547,7.754C5.873,6.909,4.842,6.356,3.674,6.356 C1.643,6.356,0,7.988,0,10c0,2.012,1.643,3.644,3.674,3.644c1.199,0,2.254-0.579,2.926-1.463l6.209,3.149 c-0.098,0.328-0.168,0.667-0.168,1.026c0,2.013,1.645,3.644,3.672,3.644c2.031,0,3.674-1.631,3.674-3.644 C19.987,14.342,18.344,12.711,16.313,12.711z" />
              </svg>
            </div>

            <Share
              buttonClass="share-button"
              postLink={`/post/${slug}`}
              media={imageUrl}
              description={title}
            />
          </div>
          {
            editable
            &&
            <Link
              className="card-action-button card-edit"
              to={createPostEditLink({ id: user.id, slug })}
            >
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                <path d="M0,14.249V18h3.75L14.807,6.941l-3.75-3.749L0,14.249z M17.707,4.042c0.391-0.391,0.391-1.02,0-1.409
                  l-2.34-2.34c-0.391-0.391-1.019-0.391-1.408,0l-1.83,1.829l3.749,3.749L17.707,4.042z"
                />
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
                  L18,1.813z"
                />
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
                  L18,1.813z"
                />
              </svg>
            </div>
          }
          <Link
            className="tag-card__title-wrap"
            to={createPostLink(this.props.data)}
          >
            <div className="tag-card__title legacy">
              <div className="icon-wrap">
                {
                  type === 1 && <ProductsIcons.service />
                }
                {
                  type === 3 && <ProductsIcons.blog />
                }
                {
                  type === 4 && <ProductsIcons.event />
                }
              </div>
              {title}
            </div>
            {
              !!price
              &&
              <div className="tag-card__price">
                {priceTemplate && priceTemplate.replace('?', formatedPrice)}
              </div>
            }
          </Link>
        </div>
        <div className="tag-card__footer">
          {
            user
            &&
            (<Link className="tag-card__author" to={createProfileLink(user.id)}>
              <span className="tag-card__avatar">
                <Avatar
                  className="avatar"
                  imgClassName="avatar__img"
                  avatar={user.avatar}
                  thumbSize="30x30"
                  alt={user.profile_name}
                />
              </span>
              <span className="tag-card__name">
                {
                  user.profile_name
                    ? user.profile_name
                    : `ID${user.id}`
                }
              </span>
            </Link>)
          }

          <div className="tag-card__actions">
            <Like
              liked={liked}
              onClick={this.toggleLike}
              count={likesCount}
            />
            <div className="like-comment__button message">
              <Link
                className="icon-wrap"
                to={createPostLink(this.props.data)}
              >
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
                  <path d="M0,8V0.8C0,0.359,0.36,0,0.799,0h10.402C11.641,0,12,0.359,12,0.8V12L8.799,8.799h-8C0.36,8.799,0,8.44,0,8z" />
                </svg>
              </Link>
              { commentsCount }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardProduct;

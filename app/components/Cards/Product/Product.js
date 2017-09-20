import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { pure } from 'recompose';

import { Link } from 'react-router';

import { Share, Like } from 'components';
import { ProductsIcons } from 'components/Icons';
import { THUMBS_URL } from 'config';

import { setLike } from 'actions/like';
import { stagedPopup } from 'ducks/Auth/authActions';

import './Product.less';

const Product = ({ data, priceTemplate, isAuth, dispatch }) => {
  const name = data.user.profile_name ? data.user.profile_name : `ID: ${data.user.id}`;
  const like = () => {
    if (!isAuth) {
      dispatch(stagedPopup('register'));

      return false;
    }

    dispatch(setLike(data.slug));

    return true;
  };

  return (
    <div className="post-card">
      <div className="post-card__img-wrap">
        <Link
          to={`/post/${data.slug}`}
        >
          <img
            className="post-card__img"
            src={`${THUMBS_URL}unsafe/292x221/${data.images[0].file}`}
            alt={data.title}
          />
        </Link>
        <Like
          liked={data.liked}
          onClick={like}
        />
        <div className="share">
          <div className="share__icon" />
          <div className="dropdown-corner" />
          <div className="dropdown">
            <Share
              postLink={`/post/${data.slug}`}
              buttonClass="social-btn"
            />
          </div>
        </div >
      </div>
      <div className="post-card__info">
        <Link
          className="post-card__title"
          to={`/post/${data.slug}`}
        >
          <ProductsIcons.service className="icon icon-bag" />
          {data.title}
        </Link>
        <a className="user">
          <div className="avatar">
            {
              data.user.avatar
                ? <img
                  className="avatar__img"
                  src={`${THUMBS_URL}unsafe/30x30/${data.user.avatar}`}
                  alt={name}
                />
                : <img
                  className="avatar__img"
                  src={'/images/svg/avatar.svg'}
                  alt={name}
                />

            }
          </div>
          {name}
        </a>
        <div className="post-card__price">
          {
            priceTemplate.replace('?', data.price)
          }
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    price: PropTypes.number,
    user: PropTypes.object,
    images: PropTypes.array,
  }).isRequired,
  priceTemplate: PropTypes.string.isRequired,
  isAuth: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuth: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(pure(Product));

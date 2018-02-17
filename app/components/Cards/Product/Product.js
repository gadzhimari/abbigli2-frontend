import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { pure } from 'recompose';

import { Link } from 'react-router';

import { Share, Like } from '../../../components';
import Image from '../../../components/Image';
import Avatar from '../../Avatar';

import { ProductsIcons } from '../../../components/Icons';

import setLike from '../../../ducks/Like/actions';

import './Product.less';

const Product = ({ data, priceTemplate }) => {
  const name = data.user.profile_name ? data.user.profile_name : `ID: ${data.user.id}`;
  const like = () => setLike(data.slug);
  const imageUrl = data.images && data.images[0] && data.images[0].file;

  return (
    <div className="post-card">
      <div className="post-card__img-wrap">
        <Link to={`/post/${data.slug}`}>
          <Image
            thumbSize="292x221"
            src={imageUrl}
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
              media={imageUrl}
              description={data.title}
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
        <Link
          className="user"
          to={`/profile/${data.user.id}`}
        >
          <Avatar
            className="avatar"
            imgClassName="avatar__img"
            avatar={data.user.avatar}
            thumbSize="30x30"
            alt={name}
          />
          {name}
        </Link>
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

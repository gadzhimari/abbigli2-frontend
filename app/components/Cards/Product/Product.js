import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Link } from 'react-router';

import { Share } from '../../../components';
import { Like } from '../../../components-lib';
import Image from '../../../components/Image';
import Avatar from '../../Avatar';

import { ProductsIcons } from '../../../components/Icons';

import setLike from '../../../ducks/Like/actions';

import './Product.less';

class Product extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
      price: PropTypes.number,
      author: PropTypes.object,
      images: PropTypes.array,
    }).isRequired,
    priceTemplate: PropTypes.string.isRequired,
  };

  render() {
    const { data, priceTemplate, setLike } = this.props;
    const name = data.author.profile_name ? data.author.profile_name : `ID: ${data.author.id}`;

    return (
      <div className="post-card">
        <div className="post-card__img-wrap">
          <Link to={`/post/${data.slug}`}>
            <Image
              thumbSize="292x221"
              src={data.image}
              alt={data.title}
              className="post-card__img"
            />
          </Link>

          <Like
            liked={data.liked}
            onClick={setLike}
            slug={data.slug}
          />

          <div className="share">
            <div className="share__icon" />
            <div className="dropdown-corner" />
            <div className="dropdown">
              <Share
                postLink={`/post/${data.slug}`}
                buttonClass="social-btn"
                media={data.image}
                description={data.title}
              />
            </div>
          </div>
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
            to={`/profile/${data.author.id}`}
          >
            <Avatar
              className="avatar"
              imgClassName="avatar__img"
              avatar={data.author.avatar}
              thumbSize="30x30"
              alt={name}
            />

            {name}
          </Link>

          <div className="post-card__price">
            {priceTemplate.replace('?', data.price)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps, { setLike })(Product);

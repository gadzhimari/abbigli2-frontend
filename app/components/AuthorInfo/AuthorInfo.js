import React, { PureComponent } from 'react';
import Type from 'prop-types';

import Link from 'react-router/lib/Link';
import Avatar from '../Avatar';
import SubscribeButton from '../SubscribeButton';

import { setFollow } from '../../ducks/PostPage/actions';

import { gaSendClickEvent } from '../../lib/analitics';

import './AuthorInfo.less';

class AuthorInfo extends PureComponent {
  static propTypes = {
    data: Type.shape({ id: Type.number }),
    canSubscribe: Type.bool,
  }

  onSubscribe = () => {
    gaSendClickEvent('product', 'subscribe');
    setFollow(this.props.data.id);
  }

  render() {
    const { data, canSubscribe } = this.props;

    return (
      <div className="subscription-article__wrap">
        <Avatar
          className="subscription-article__avatar"
          Component={Link}
          avatar={data.avatar}
          thumbSize="113x113"
          componentProps={{
            to: `/profile/${data.id}`,
          }}
          alt={data.profile_name}
        />

        <Link
          className="subscription-article__author-name"
          to={`/profile/${data.id}`}
        >
          {data.profile_name ?
            data.profile_name : `User ID: ${data.id}`
          }
        </Link>

        <div className="subscription-article__author-city">
          <svg className="icon icon-pin" viewBox="40.3 168.9 14 20">
            <path d="M52.2,170.9c-1.3-1.3-3.1-2.1-5-2.1c-1.9,0-3.6,0.7-5,2.1c-2.4,2.4-2.8,7.1-0.7,9.8l5.6,8.1l5.6-8.1 C55,178,54.7,173.4,52.2,170.9z M47.3,178.4c-1.4,0-2.6-1.1-2.6-2.6s1.1-2.6,2.6-2.6c1.4,0,2.6,1.1,2.6,2.6S48.7,178.4,47.3,178.4z" />
          </svg>

          {data.city ?
            `${data.city.name}, ${data.city.country.name}` : 'Город не указан'
          }
        </div>

        {canSubscribe &&
          <SubscribeButton
            className="default-button"
            onClick={this.onSubscribe}
            subscribed={data.is_subscribed}
          />
        }
      </div>
    );
  }
}

export default AuthorInfo;

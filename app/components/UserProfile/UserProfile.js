import React, { PropTypes, Component } from 'react';

import { openPopup } from 'ducks/Popup/actions';
import { setFollow } from 'actions/follow';

import { __t } from './../../i18n/translator';
import { DOMAIN_URL } from 'config';

import './UserProfile.styl';

export default class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      showMoreText: false,
    };
  }

  render() {
    const {
      id,
      profile_name,
      avatar,
      info,
      phone_info,
      email_info,
      city,
      vk_account,
      fb_account,
      ok_account,
      banner_main,
      banner_left,
      likes_num,
      followers_count,
      pinterest_account,
      google_account,
      is_subscribed: isSubscribed,
    } = this.props.data;
    const {
      dispatch,
      isAuthenticated
    } = this.props;

    const sendMessage = () => {
      isAuthenticated
        ? dispatch(openPopup('messagePopup', {
          id,
          name: profile_name,
        }))
        : dispatch(openPopup('loginPopup'));
    };

    const avatarWrapperClass = avatar
      ? 'user-profile__avatar-wrap no-bg'
      : 'user-profile__avatar-wrap';

    return (
      <div className="user-profile__info ">
        <div className="user-profile__cover-small">
          <div className="user-profile__avatar-container">
            <div className={avatarWrapperClass}>
              {
                avatar
                && <img className="user-profile__avatar"
                  src={`${DOMAIN_URL}/thumbs/unsafe/140x140/${avatar}`} />
              }
            </div>
          </div>
          {
            banner_left
              ? <img className="user-profile__cover" src={`${banner_left}`} />
              : <img className="user-profile__cover" src="/images/def_left.jpg" />
          }
        </div>
        <div
          className="user-profile__cover-big"
          style={banner_main
            ? { backgroundImage: `url(${banner_main})`, backgroundSize: 'cover' }
            : null
          }
        >
          <div className="user-profile__form">
            <div className="user-profile__title-wrap">
              <input
                className="user-profile__title"
                type="text"
                disabled="disabled"
                value={profile_name}
              />
            </div>
            <div className={"user-profile__description-wrap userProfileDesc" + (this.state.showMoreText ? " showMoreText" : "")}>
              <div className="description-corner-wrap">
                <div className="description-corner"></div>
              </div>
              <textarea
                className="user-profile__description"
                placeholder={__t('fill.info.about')}
                disabled="disabled"
                defaultValue={info}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 28 6"
                onClick={() => this.setState({ showMoreText: !this.state.showMoreText })}
                className="user-profile__description-more moreText"
              >
	              <path d="M3,0C1.344,0,0,1.343,0,3c0,1.656,1.344,3,3,3s3-1.344,3-3C6,1.343,4.656,0,3,0z M14,0c-1.657,0-3,1.343-3,3
		c0,1.656,1.343,3,3,3c1.656,0,3-1.344,3-3C17,1.343,15.656,0,14,0z M25,0c-1.656,0-3,1.343-3,3c0,1.656,1.344,3,3,3s3-1.344,3-3
		C28,1.343,26.656,0,25,0z"/>
              </svg>
            </div>
            {
              phone_info
              &&
              <div className="input-profile-wrap input-phone">
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.399 14.399">
<path d="M2.896,6.232c1.152,2.264,3.008,4.112,5.272,5.272l1.761-1.761c0.215-0.215,0.535-0.287,0.815-0.191
	c0.896,0.297,1.864,0.456,2.856,0.456c0.439,0,0.799,0.36,0.799,0.8V13.6c0,0.44-0.359,0.8-0.799,0.8C6.088,14.399,0,8.313,0,0.8
	C0,0.36,0.36,0,0.8,0h2.8c0.44,0,0.8,0.36,0.8,0.8c0,1,0.16,1.959,0.456,2.855c0.088,0.28,0.024,0.592-0.2,0.816L2.896,6.232z"/>
</svg>
                <input
                  className="input-profile"
                  type="text"
                  placeholder={__t('fill.info.phone')}
                  disabled="disabled"
                  value={phone_info}
                />
              </div>
            }
            {
              email_info
              &&
              <div className="input-profile-wrap input-email">
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15.961">
<path d="M9.631,10.262H9.582c-0.465,1.392-1.378,2.088-2.737,2.088c-0.867,0-1.566-0.326-2.097-0.977
	S3.952,9.848,3.952,8.748c0-1.457,0.364-2.667,1.092-3.632C5.772,4.151,6.731,3.67,7.922,3.67c0.453,0,0.857,0.125,1.213,0.373
	c0.356,0.25,0.586,0.549,0.689,0.899h0.029C9.874,4.761,9.922,4.388,10,3.825h1.611c-0.304,3.417-0.456,5.159-0.456,5.224
	c0,1.281,0.333,1.922,1,1.922c0.608,0,1.113-0.357,1.515-1.072c0.401-0.716,0.602-1.643,0.602-2.782
	c0-1.683-0.541-3.057-1.626-4.121c-1.084-1.064-2.587-1.598-4.51-1.598c-1.845,0-3.372,0.645-4.583,1.933
	c-1.21,1.288-1.815,2.899-1.815,4.835c0,1.909,0.583,3.449,1.748,4.621s2.735,1.757,4.709,1.757c1.554,0,2.884-0.266,3.99-0.795
	v1.494c-1.133,0.479-2.547,0.719-4.243,0.719c-2.382,0-4.301-0.712-5.757-2.136C0.728,12.401,0,10.537,0,8.232
	C0,5.864,0.77,3.899,2.311,2.34C3.851,0.78,5.819,0,8.213,0c2.246,0,4.105,0.653,5.578,1.961S16,4.974,16,7.078
	c0,1.541-0.4,2.804-1.199,3.791c-0.799,0.987-1.775,1.481-2.927,1.481C10.385,12.35,9.638,11.653,9.631,10.262z M8.087,5.048
	c-0.712,0-1.287,0.35-1.723,1.048c-0.437,0.699-0.655,1.57-0.655,2.611c0,0.699,0.147,1.251,0.441,1.655
	c0.294,0.405,0.688,0.607,1.18,0.607c0.712,0,1.275-0.367,1.689-1.102c0.414-0.735,0.621-1.708,0.621-2.918
	C9.641,5.683,9.123,5.048,8.087,5.048z"/>
</svg>
                <input
                  className="input-profile"
                  type="text"
                  placeholder={__t('fill.info.email')}
                  disabled="disabled"
                  value={email_info}
                />
              </div>
            }
            {false &&
              <div className="input-profile-wrap input-site">
                <svg className="icon"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
<path d="M8,0C3.584,0,0,3.584,0,8s3.584,8,8,8s8-3.584,8-8S12.416,0,8,0z M7.2,14.344C4.04,13.951,1.6,11.264,1.6,8
	c0-0.496,0.064-0.968,0.168-1.432L5.6,10.399V11.2c0,0.879,0.72,1.6,1.6,1.6V14.344z M12.721,12.313
	C12.512,11.664,11.92,11.2,11.2,11.2h-0.8V8.8C10.4,8.36,10.04,8,9.6,8H4.8V6.4h1.6c0.44,0,0.8-0.36,0.8-0.8V4h1.6
	C9.68,4,10.4,3.28,10.4,2.4V2.072c2.344,0.953,4,3.248,4,5.928C14.4,9.664,13.76,11.176,12.721,12.313z"/>
</svg>

                <input
                  className="input-profile"
                  type="text"
                  placeholder={__t('fill.info.site')}
                  disabled="disabled"
                  value="55"
                />
              </div>
            }
            {city &&
              <div className="input-profile-wrap input-address">
                <svg className="icon" xmlns="http://www.w3.org/2000/svg"	 viewBox="0 0 12.6 18">
<path d="M6.3,0C2.817,0,0,2.816,0,6.3C0,11.025,6.3,18,6.3,18s6.3-6.975,6.3-11.7C12.6,2.816,9.785,0,6.3,0z M6.3,8.55
	c-1.242,0-2.25-1.008-2.25-2.25S5.058,4.05,6.3,4.05c1.241,0,2.25,1.008,2.25,2.25S7.542,8.55,6.3,8.55z"/>
</svg>

                <input
                  className="input-profile"
                  type="text"
                  placeholder={__t('fill.info.address')}
                  id="city"
                  disabled="disabled"
                  value={city.name + (city.country.name ? ', ' + city.country.name : '')}
                />
              </div>
            }
            <div className="user-profile__social-links">
              {(fb_account && fb_account.length > 1) &&
                <div className="input-profile-social">
                  <a className="social-network facebook" href={fb_account}>
                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.419 16.005">
<path d="M7.419,5.279L4.93,5.284V3.609c0,0-0.053-0.919,0.956-0.919c0-0.01,1.522,0,1.522,0V0.001H4.72
	c0,0-3.081-0.178-3.081,3.498v1.792L0,5.295v2.662h1.639v8.048H4.93V7.957h2.206L7.419,5.279z"/>
</svg>

                  </a>
                </div>
              }
              {
                ((pinterest_account && pinterest_account.length > 1))
                &&
                <div className="input-profile-social">
                  <a className="social-network pinterest" href={pinterest_account}>
                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.912 15.975">
<path d="M2.34,9.239c0.802-1.365-0.258-1.664-0.425-2.654c-0.679-4.043,4.847-6.806,7.741-3.98
	c2.002,1.957,0.684,7.975-2.545,7.348C4.02,9.356,8.626,4.567,6.158,3.626c-2.006-0.765-3.071,2.337-2.12,3.878
	c-0.559,2.651-1.76,5.147-1.273,8.471c1.577-1.102,2.109-3.211,2.545-5.41c0.793,0.465,1.217,0.946,2.228,1.021
	c3.727,0.277,5.81-3.581,5.299-7.145c-0.452-3.157-3.722-4.764-7.21-4.388C2.869,0.352,0.12,2.498,0.006,5.565
	C-0.063,7.438,0.488,8.844,2.34,9.239z"/>
</svg>


                  </a>
                </div>
              }
              {
                (this.state.edit || (google_account && google_account.length > 1))
                &&
                <div className="input-profile-social">
                  <a className="social-network google-plus" href={google_account}>
                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.146 14">
	<path d="M7.034,5.998c-0.002,0.795,0,1.591,0.003,2.386c1.343,0.042,2.685,0.022,4.026,0.042
		c-0.593,2.96-4.639,3.917-6.775,1.986c-2.2-1.693-2.096-5.411,0.19-6.984C6.08,2.157,8.351,2.471,9.952,3.572
		c0.626-0.579,1.215-1.197,1.78-1.839c-1.328-1.056-2.959-1.808-4.698-1.727C3.411-0.115,0.079,3.044,0.019,6.649
		c-0.231,2.947,1.718,5.839,4.469,6.882c2.741,1.049,6.253,0.335,8.001-2.116c1.157-1.547,1.406-3.539,1.27-5.411
		C11.516,5.988,9.277,5.991,7.034,5.998z M20.139,5.988c-0.004-0.666-0.007-1.333-0.014-1.999h-1.998
		c-0.005,0.665-0.014,1.329-0.016,1.999c-0.672,0.003-1.339,0.006-2.01,0.013v1.987c0.671,0.008,1.341,0.015,2.01,0.021
		c0.009,0.667,0.009,1.331,0.016,1.995h1.998c0.007-0.664,0.01-1.328,0.014-1.997C20.812,8,21.479,7.997,22.146,7.988V6.001
		C21.479,5.994,20.809,5.994,20.139,5.988z"/>
</svg>

                  </a>
                </div>
              }
              {/*{(ok_account && ok_account.length > 1 )  &&
              <div className="input-profile-social">
                <a className="social-network odnoklassniki" href={ok_account}>
                  <svg className="icon">
                    <use href="#odnoklassniki"></use>
                  </svg>
                </a>
              </div>
              }
              { (vk_account && vk_account.length > 1 )  &&
              <div className="input-profile-social">
                <a className="social-network vkontakte" href={vk_account}>
                  <svg className="icon">
                    <use href="#vkontakte"></use>
                  </svg>
                </a>
              </div>
              }*/}
            </div>
          </div>
          <div className="user-profile__characteristic-wrap">
            <div className="user-profile__characteristic">
              <div
                className="user-profile__characteristic-item followers"
                onClick={this.props.showFollowers}
              >
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.4 27.199">
<path d="M23.8,13.6c3.759,0,6.801-3.043,6.801-6.8S27.559,0,23.8,0C20.042,0,17,3.043,17,6.8S20.042,13.6,23.8,13.6z
	 M8.5,10.2V5.1H5.1V10.2H0V13.6h5.1v5.1h3.4v-5.1h5.1V10.2H8.5z M23.8,17c-4.538,0-13.6,2.277-13.6,6.8v3.399h27.2V23.8
	C37.4,19.277,28.339,17,23.8,17z"/>
</svg>
                {followers_count}
              </div>
              <div className="user-profile__characteristic-item likes">
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 31.193">
<path d="M17,31.193l-2.467-2.242C5.778,21.011,0,15.774,0,9.35C0,4.113,4.113,0,9.351,0C12.308,0,15.147,1.377,17,3.552
	C18.853,1.377,21.691,0,24.649,0C29.886,0,34,4.113,34,9.35c0,6.425-5.781,11.661-14.537,19.618L17,31.193z"/>
</svg>

                {likes_num}
              </div>
              <a
                className="tooltip-wrap"
                data-title={__t('send.message.to.user')}
                onClick={sendMessage}
              >
                <div className="user-profile__characteristic-item messages">
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8">
<path d="M9,0H1C0.45,0,0.005,0.449,0.005,1L0,7c0,0.55,0.45,1,1,1h8c0.55,0,1-0.45,1-1V1C10,0.449,9.55,0,9,0z M9,2
	L5,4.5L1,2V1l4,2.5L9,1V2z"/>
</svg>
                </div>
              </a></div>

            {
              isSubscribed
                ? (<button
                  className="default-button subscribe-button"
                  type="submit"
                  onClick={() => {
                    isAuthenticated
                      ? dispatch(setFollow(id))
                      : dispatch(openPopup('loginPopup'));
                  }}
                >
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 2">
    <path d="M10,0v2H0V0H10z"/>
</svg>
                  {__t('Unsubscribe')}
                </button>)
                : (<button
                  className="default-button subscribe-button"
                  type="submit"
                  onClick={() => {
                    isAuthenticated
                      ? dispatch(setFollow(id))
                      : dispatch(openPopup('loginPopup'));
                  }}
                >
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
    <path d="M10,6H6v4H4V6H0V4h4V0h2v4h4V6z"/>
</svg>
                  {__t('Subscribe')}
                </button>)
            }

          </div>
        </div>
      </div>
    );
  }
}

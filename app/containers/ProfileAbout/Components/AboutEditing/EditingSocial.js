/* eslint camelcase: 0 */

import React, { PureComponent } from 'react';
import Type from 'prop-types';

import ShareButton from '../../../../components/Share/Buttons/ShareButton';

import { __t } from '../../../../i18n/translator';

class EditingSocial extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pinterest_account: props.data.pinterest_account,
      vk_account: props.data.vk_account,
      google_account: props.data.google_account,
      ok_account: props.data.ok_account,
      fb_account: props.data.fb_account,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  get value() {
    return this.state;
  }

  render() {
    const { vk_account, ok_account, fb_account, google_account } = this.state;

    return (
      <div className="profile-about__contact">
        <h4 className="profile-about__contact-header">
          {__t('Contact')}
        </h4>
        <div className="edit-contact__wrapper">
          <ShareButton
            className="social-btn vkontakte"
            provider="vk"
            link={null}
          />
          <input
            className="input"
            value={vk_account}
            name="vk_account"
            onChange={this.handleChange}
          />
        </div>
        <div className="edit-contact__wrapper">
          <ShareButton
            className="social-btn"
            provider="odnoklassniki"
            link={null}
          />
          <input
            className="input"
            value={ok_account}
            name="ok_account"
            onChange={this.handleChange}
          />
        </div>
        <div className="edit-contact__wrapper">
          <ShareButton
            className="social-btn"
            provider="facebook"
            link={null}
          />
          <input
            className="input"
            value={fb_account}
            name="fb_account"
            onChange={this.handleChange}
          />
        </div>
        <div className="edit-contact__wrapper">
          <ShareButton
            className="social-btn google-plus"
            provider="google"
            link={null}
          />
          <input
            className="input"
            value={google_account}
            name="google_account"
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

EditingSocial.propTypes = {
  data: Type.shape({
    pinterest_account: Type.string,
    vk_account: Type.string,
    google_account: Type.string,
    ok_account: Type.string,
    fb_account: Type.string,
  }),
};

EditingSocial.defaultProps = {
  data: {},
};

export default EditingSocial;

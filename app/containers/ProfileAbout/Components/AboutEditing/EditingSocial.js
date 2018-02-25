/* eslint camelcase: 0 */

import React, { PureComponent } from 'react';
import Type from 'prop-types';

import ShareButton from '../../../../components/Share/Buttons/ShareButton';

import { ErrorInput } from 'components/Inputs';

import { __t } from '../../../../i18n/translator';

import { location } from 'config';

class EditingSocial extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
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

  renderSocialLinks() {
    const { errors } = this.props;
    const { vk_account, ok_account, fb_account, google_account } = this.state;

    const socials = [
      location === 'ru' && { name: 'vk', provider: 'vk', value: vk_account, cls: 'vkontakte' },
      location === 'ru' && { name: 'ok', provider: 'odnoklassniki', value: ok_account, cls: '' },
      { name: 'fb', provider: 'facebook', value: fb_account, cls: '' },
      { name: 'google', provider: 'google', value: google_account, cls: 'google-plus' },
    ].filter(Boolean);

    return (
      <div>
        {
          socials.map(social => (
            <ErrorInput
              key={social.name}
              className="input"
              value={social.value}
              name={`${social.name}_account`}
              onChange={this.handleChange}
              wrapperClass="edit-contact__wrapper"
              errors={errors[`${social.name}_account`]}
              Icon={<ShareButton
                className={`social-btn ${social.cls}`}
                provider={social.provider}
                link={null}
              />}
            />
          ))
        }
      </div>
    );
  }

  render() {
    return (
      <div className="profile-about__contact">
        <h4 className="profile-about__contact-header">
          {__t('Contact')}
        </h4>
        { this.renderSocialLinks() }
      </div>
    );
  }
}

EditingSocial.propTypes = {
  data: Type.shape({
    vk_account: Type.string,
    google_account: Type.string,
    ok_account: Type.string,
    fb_account: Type.string,
  }),
  errors: Type.shape({
    vk_account: Type.arrayOf(Type.string),
    google_account: Type.arrayOf(Type.string),
    ok_account: Type.arrayOf(Type.string),
    fb_account: Type.arrayOf(Type.string),
  }),
};

EditingSocial.defaultProps = {
  data: {},
  errors: {},
};

export default EditingSocial;

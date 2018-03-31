/* eslint camelcase: 0 */

import React, { PureComponent } from 'react';
import Type from 'prop-types';

import { Input, InputsGroup } from '../../../../components-lib';
import { SocialIcons } from '../../../../components/Icons';

import { __t } from '../../../../i18n/translator';
import { location } from '../../../../config';

class EditingSocial extends PureComponent {
  state = {
    vk_account: this.props.data.vk_account,
    google_account: this.props.data.google_account,
    ok_account: this.props.data.ok_account,
    fb_account: this.props.data.fb_account,
  }

  getIcon = ({ Icon, iconClass }) => (
    <div className={`social-btn ${iconClass}`}>
      <Icon />
    </div>
  );

  handleChange = (e, { name, value }) => {
    this.setState({
      [`${name}_account`]: value
    });
  }

  get value() {
    return this.state;
  }

  renderInputs() {
    const { errors } = this.props;
    const { vk_account, ok_account, fb_account, google_account } = this.state;

    const socials = [
      location === 'ru' &&
        { name: 'vk', Icon: SocialIcons.vk, value: vk_account, iconClass: 'vkontakte' },
      location === 'ru' &&
        { name: 'ok', Icon: SocialIcons.odnoklassniki, value: ok_account, iconClass: 'odnoklassniki' },

      { name: 'fb', Icon: SocialIcons.facebook, value: fb_account, iconClass: 'facebook' },
      { name: 'google', Icon: SocialIcons.google, value: google_account, iconClass: 'google-plus' },
    ].filter(Boolean).map(social => ({ ...social, Icon: this.getIcon(social) }));

    return socials.map(social => (
      <Input
        key={social.name}
        onChange={this.handleChange}
        errors={errors[`${social.name}_account`]}

        {...social}
      />
    ));
  }

  render() {
    return (
      <div className="profile-about__contact">
        <h4 className="profile-about__contact-header">
          {__t('Contact')}
        </h4>

        <InputsGroup gap="medium">
          {this.renderInputs()}
        </InputsGroup>
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

import React, { PureComponent } from 'react';
import Type from 'prop-types';

import { Input, InputsGroup } from '../../../../components-lib';


import { __t } from '../../../../i18n/translator';

class EditingContact extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      phone_info: props.data.phone_info,
      email_info: props.data.email_info,
      skype: props.data.skype,
    };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  get value() {
    return this.state;
  }

  render() {
    const { phone_info: phone, email_info: email, skype } = this.state;
    const { errors } = this.props;

    return (
      <div className="profile-about__contact">
        <h4 className="profile-about__contact-header">
          {__t('Contact')}
        </h4>

        <InputsGroup gap="medium">
          <Input
            value={phone}
            placeholder={__t('Your phone number')}
            type="tel"
            name="phone_info"
            onChange={this.handleChange}
            errors={errors.phone}
          />

          <Input
            value={email}
            placeholder={__t('Your email')}
            type="email"
            name="email_info"
            onChange={this.handleChange}
            errors={errors.email}
          />

          <Input
            value={skype}
            placeholder={__t('Your skype')}
            name="skype"
            onChange={this.handleChange}
            errors={errors.skype}
          />
        </InputsGroup>
      </div>
    );
  }
}

EditingContact.propTypes = {
  data: Type.shape({
    phone_info: Type.string,
    email_info: Type.string,
    skype: Type.string,
  }),
  errors: Type.shape({
    phone: Type.array,
    email: Type.array,
    skype: Type.array,
  }),
};

EditingContact.defaultProps = {
  data: {},
  errors: {},
};

export default EditingContact;

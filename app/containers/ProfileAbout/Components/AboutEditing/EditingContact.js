import React, { PureComponent } from 'react';
import Type from 'prop-types';

import { ErrorInput } from 'components/Inputs';

import { __t } from '../../../../i18n/translator';

class EditingContact extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      phone: props.data.phone,
      email: props.data.email,
      skype: props.data.skype,
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
    const { phone, email, skype } = this.state;
    const { errors } = this.props;

    return (
      <div className="profile-about__contact">
        <h4 className="profile-about__contact-header">
          {__t('Contact')}
        </h4>
        <div className="profile-about__contact-items">
          <ErrorInput
            className="input"
            value={phone}
            placeholder={__t('Your phone number')}
            type="tel"
            name="phone"
            onChange={this.handleChange}
            wrapperClass="edit-contact__wrapper"
            errors={errors.phone}
          />
          <ErrorInput
            className="input"
            value={email}
            placeholder={__t('Your email')}
            type="email"
            name="email"
            onChange={this.handleChange}
            wrapperClass="edit-contact__wrapper"
            errors={errors.email}
          />
          <ErrorInput
            className="input"
            value={skype}
            placeholder={__t('Your skype')}
            name="skype"
            onChange={this.handleChange}
            wrapperClass="edit-contact__wrapper"
            errors={errors.skype}
          />
        </div>
      </div>
    );
  }
}

EditingContact.propTypes = {
  data: Type.shape({
    phone: Type.string,
    email: Type.string,
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

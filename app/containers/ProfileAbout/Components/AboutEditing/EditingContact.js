import React, { PureComponent } from 'react';
import Type from 'prop-types';

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

    return (
      <div className="profile-about__contact">
        <h4 className="profile-about__contact-header">
          {__t('Contact')}
        </h4>
        <div className="profile-about__contact-items">
          <div className="edit-contact__wrapper">
            <input
              className="input"
              value={phone}
              placeholder={__t('Your phone number')}
              type="tel"
              name="phone"
              onChange={this.handleChange}
            />
          </div>
          <div className="edit-contact__wrapper">
            <input
              className="input"
              value={email}
              placeholder={__t('Your email')}
              type="email"
              name="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="edit-contact__wrapper">
            <input
              className="input"
              value={skype}
              placeholder={__t('Your skype')}
              name="skype"
              onChange={this.handleChange}
            />
          </div>
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
};

EditingContact.defaultProps = {
  data: {},
};

export default EditingContact;

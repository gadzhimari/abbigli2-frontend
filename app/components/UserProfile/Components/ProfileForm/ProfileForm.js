import React, { PureComponent } from 'react';

import { API_URL, DOMAIN_URL } from '../../../../config';

import { __t } from '../../../../i18n/translator';

import './ProfileForm.less';

class ProfileForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      city: props.data.city && {
        name: `${props.data.city.name}, ${props.data.city.country.name}`,
      },
      data: {
        profile_name: props.data.profile_name,
        info: props.data.info,
        city: props.data.city
          ? props.data.city.id
          : '',
      },
    };
  }

  save = (e) => {
    e.preventDefault();

    const { saveChanges } = this.props;

    saveChanges(this.state.data)
      .then(() => this.handleCancel());
  }

  handleCancel = () => {
    this.props.handleEditing(false);
  }

  handleChange = ({ target }) => {
    this.setState({
      data: {
        ...this.state.data,
        [target.name]: target.value,
      },
    });
  }

  handleChangeCity = (city) => {
    this.setState({
      city,
      data: {
        ...this.state.data,
        city: city.id,
      },
    });
  }

  openSelectPopup = () => {
    const { openPopup } = this.props;

    openPopup('selectPopup1', {
      onClickItem: this.handleChangeCity,
      title: 'city',
      async: true,
      apiUrl: `${DOMAIN_URL}/geo/cities/`,
    });
  };

  handleClearCity = (e) => {
    e.stopPropagation();

    this.setState({
      city: '',
      data: {
        ...this.state.data,
        city: '',
      },
    });
  }

  render() {
    const { data, city } = this.state;
    const cityValue = (city && city.name) || '';

    return (
      <form className="profile-form" onSubmit={this.save}>
        <input
          className="input"
          type="text"
          placeholder={__t('Profile name')}
          value={data.profile_name}
          name="profile_name"
          onChange={this.handleChange}
        />
        <textarea
          className="textarea"
          placeholder={__t('Profile description')}
          value={data.info}
          name="info"
          onChange={this.handleChange}
        />
        <div
          className="input-city"
          onClick={this.openSelectPopup}
        >
          <svg className="icon icon-pin" viewBox="40.3 168.9 14 20">
            <path d="M52.2,170.9c-1.3-1.3-3.1-2.1-5-2.1c-1.9,0-3.6,0.7-5,2.1c-2.4,2.4-2.8,7.1-0.7,9.8l5.6,8.1l5.6-8.1 C55,178,54.7,173.4,52.2,170.9z M47.3,178.4c-1.4,0-2.6-1.1-2.6-2.6s1.1-2.6,2.6-2.6c1.4,0,2.6,1.1,2.6,2.6S48.7,178.4,47.3,178.4z" />
          </svg>
          <input
            className="input"
            type="text"
            name="city"
            value={cityValue}
            placeholder={__t('Your city')}
          />
          <If condition={cityValue}>
            <svg viewBox="0 0 14 14.031" className="icon icon-clear" onClick={this.handleClearCity}>
              <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z" />
            </svg>
          </If>
        </div>
        <div className="profile-form__buttons">
          <button className="default-button" type="submit">
            {__t('Save changes')}
          </button>
          <button
            className="default-button"
            type="button"
            onClick={this.handleCancel}
          >
            {__t('Cancel')}
            <svg
              viewBox="0 0 14 14.031"
              className="icon-close icon"
            >
              <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z" />
            </svg>
          </button>
        </div>
      </form >
    );
  }
}

export default ProfileForm;

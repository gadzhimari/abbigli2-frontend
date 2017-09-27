import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { API_URL } from 'config';
import { getJsonFromStorage } from 'utils/functions';

import './ProfileForm.less';

class ProfileForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      city: props.data.city,
      data: {
        profile_name: props.data.profile_name,
        info: props.data.info,
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

  render() {
    const { data, city } = this.state;
    const cityValue = city && `${city.name}, ${city.country.name}`;

    return (
      <form className="profile-form" onSubmit={this.save}>
        <input
          className="input"
          type="text"
          placeholder="Введите название"
          value={data.profile_name}
          name="profile_name"
          onChange={this.handleChange}
        />
        <textarea
          className="textarea"
          placeholder="Чему посвящена ваша страница"
          value={data.info}
          name="info"
          onChange={this.handleChange}
        />
        <div className="input-city">
          <svg className="icon icon-pin" viewBox="40.3 168.9 14 20">
            <path d="M52.2,170.9c-1.3-1.3-3.1-2.1-5-2.1c-1.9,0-3.6,0.7-5,2.1c-2.4,2.4-2.8,7.1-0.7,9.8l5.6,8.1l5.6-8.1 C55,178,54.7,173.4,52.2,170.9z M47.3,178.4c-1.4,0-2.6-1.1-2.6-2.6s1.1-2.6,2.6-2.6c1.4,0,2.6,1.1,2.6,2.6S48.7,178.4,47.3,178.4z" />
          </svg>
          <input
            className="input"
            type="text"
            name="city"
            value={cityValue}
            placeholder="Ваш город"
          />
        </div>
        <div className="profile-form__buttons">
          <button className="default-button" type="submit">Сохранить изменения</button>
          <button
            className="default-button"
            type="button"
            onClick={this.handleCancel}
          >
            Отмена
        </button>
        </div>
      </form >
    );
  }
}

export default ProfileForm;

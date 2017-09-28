import React, { PureComponent } from 'react';
import Type from 'prop-types';

import { __t } from '../../../../i18n/translator';

class EditingInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.info,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      value: target.value,
    });
  }

  get value() {
    return this.state.value;
  }

  render() {
    return (
      <div className="profile-about__info">
        <h3 className="profile-about__header">
          {__t('Your contact information')}
        </h3>
        <p className="profile-about__text">
          Здесь какой-то текст, который еще, судя по всему, не придумали
        </p>
        <textarea
          className="profile-about__info-textarea"
          value={this.state.value}
          placeholder={__t('Information about your page')}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

EditingInfo.propTypes = {
  info: Type.string,
};

EditingInfo.defaultProps = {
  info: '',
};

export default EditingInfo;

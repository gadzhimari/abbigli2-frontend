import React, { PureComponent } from 'react';
import Type from 'prop-types';

import Redactor from '../../../../components/Inputs/Redactor';

import { __t } from '../../../../i18n/translator';

class EditingInfo extends PureComponent {
  static propTypes = {
    info: Type.string
  }

  static defaultProps = {
    info: ''
  }

  state = {
    value: this.props.info
  }

  handleChange = (e, { value }) => {
    this.setState({ value });
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

        <Redactor
          className="profile-about__info-textarea"
          value={this.state.value}
          placeholder={__t('Information about your page')}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default EditingInfo;

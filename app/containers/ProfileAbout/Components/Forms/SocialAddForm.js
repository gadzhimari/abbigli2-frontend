import { React, Component, Type, cn } from '../../../../components-lib/__base';
import { Button, Input } from '../../../../components-lib';
import Select from '../../../../components/Inputs/Select';

import { SOCIAL_PROVIDERS } from '../../../../lib/constants/social';

import { __t } from '../../../../i18n/translator';

const socialNetworks = Object.values(SOCIAL_PROVIDERS).map(({ label, value }) => ({
  label, value }));

@cn('ProfileAbout')
class SocialAddForm extends Component {
  static propTypes = {
    onSave: Type.func,
    onCancel: Type.func,
    errors: Type.shape({
      value: Type.arrayOf(Type.string),
    }),
  };

  state = {
    type: SOCIAL_PROVIDERS.fb.value,
    value: '',
  };

  clearFields = () => {
    this.setState({
      value: '',
    });
  }

  handleChange = (e, { value }) => {
    this.setState({
      value: value.trim(),
    });
  }

  handleSave = () => {
    this.props.onSave(this.state, 'creating');
  }

  handleCancel = () => {
    this.props.onCancel('creating');
    this.clearFields();
  }

  handleInputChange = (e, { value }) => {
    this.setState({
      value: value.trim(),
    });
  }

  handleSelectChange = (e, { value }) => {
    this.setState({
      type: value,
    });
  }

  render(cn) {
    const { errors } = this.props;
    const { type, value } = this.state;

    return (
      <form className={cn('contacts-form')}>
        <div className={cn('contacts-input-group')}>
          <Input
            value={value}
            name="social-network"
            className={cn('contacts-input')}
            onChange={this.handleInputChange}
            errors={errors.value}
          />
          <Select
            className={cn('contacts-select')}
            onChange={this.handleSelectChange}
            options={socialNetworks}
            searchable={false}
            value={type}
          />
        </div>
        <div className={cn('contacts-actions')}>
          <Button
            onClick={this.handleSave}
            className={cn('contacts-save')}
            name={__t('Save')}
            text={__t('Save')}
          />
          <Button
            onClick={this.handleCancel}
            color="secondary"
            className={cn('contacts-cancel')}
            name={__t('Cancel')}
            text={__t('Cancel')}
          />
        </div>
      </form>
    );
  }
}

export default SocialAddForm;

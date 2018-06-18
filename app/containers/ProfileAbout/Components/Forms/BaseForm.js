import { React, Component, Type, cn } from '../../../../components-lib/__base';
import { Button, Input } from '../../../../components-lib';
import IconClose from '../../../../icons/close';

import { __t } from '../../../../i18n/translator';

const translation = {
  phone: __t('Your phone'),
  email: __t('Your email'),
  skype: __t('Your skype'),
};

@cn('ProfileAbout')
class BaseForm extends Component {
  static propTypes = {
    name: Type.string,
    value: Type.string,
    type: Type.string,
    onAdd: Type.func,
    onSave: Type.func,
    onCancel: Type.func,
    errors: Type.shape({
      value: Type.arrayOf(Type.string),
    }),
  };

  static defaultProps = {
    type: 'text',
  };

  state = {
    name: this.props.name || '',
    value: this.props.value || '',
  };

  clearFields = () => {
    this.setState({
      value: '',
      name: '',
    });
  }

  handleChange = (e, { value }) => {
    this.setState({
      value: value.trim(),
    });
  }

  handleSave = () => {
    const { onSave, value } = this.props;

    if (value !== this.state.value) {
      onSave(this.state);
    } else {
      this.handleCancel();
    }
  }

  handleCancel = () => {
    this.props.onCancel();
    this.clearFields();
  }

  render(cn) {
    const { type, errors } = this.props;
    const { name, value } = this.state;

    return (
      <form className={cn('contacts-form')}>
        <div className={cn('contacts-input-group')}>
          <Input
            value={value}
            placeholder={translation[name]}
            name={name}
            onChange={this.handleChange}
            errors={errors.value}
            type={type}
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

export default BaseForm;

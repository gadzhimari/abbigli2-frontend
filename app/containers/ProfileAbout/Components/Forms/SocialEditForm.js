import { React, Component, Type, cn } from '../../../../components-lib/__base';
import { Button, Input } from '../../../../components-lib';

import { __t } from '../../../../i18n/translator';

@cn('ProfileAbout')
class SocialEditForm extends Component {
  static propTypes = {
    data: Type.shape({
      type: Type.string,
      value: Type.string,
    }),
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
    type: this.props.data.type || '',
    value: this.props.data.value || '',
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
    this.props.onSave(this.state);
  }

  handleCancel = () => {
    this.props.onCancel();
    this.clearFields();
  }

  render(cn) {
    const { errors } = this.props;
    const { type, value } = this.state;

    return (
      <form className={cn('contacts-form')}>
        <div className={cn('contacts-input-group')}>
          <Input
            value={value}
            name={type}
            onChange={this.handleChange}
            errors={errors.value}
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

export default SocialEditForm;

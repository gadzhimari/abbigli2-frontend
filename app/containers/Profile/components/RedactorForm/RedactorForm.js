import { React, PureComponent, Type, cn } from '../../../../components-lib/__base';
import { Button, Redactor } from '../../../../components-lib';

import { __t } from '../../../../i18n/translator';
import './RedactorForm.less';

@cn('RedactorForm')
class RedactorForm extends PureComponent {
  static propTypes = {
    id: Type.string.isRequired,
    value: Type.string.isRequired,
    placeholder: Type.string,
    isSaving: Type.bool.isRequired,
    onSubmit: Type.func.isRequired,
    onCancel: Type.func.isRequired,
  };

  static defaultProps = {
    value: '',
    isSaving: false,
  };

  state = {
    value: this.props.value
  };

  handleChange = (e, { value }) => {
    this.setState({ value });
  }

  handleSubmit = () => {
    const { id, onSubmit } = this.props;
    const data = { [id]: this.state.value };

    onSubmit(data);
  }

  handleCancel = () => {
    this.props.onCancel();
  }

  render(cn) {
    const { id, placeholder, isSaving } = this.props;

    return (
      <div className={cn()}>
        <Redactor
          id={id}
          value={this.state.value}
          placeholder={placeholder}
          onChange={this.handleChange}
        />
        <div className={cn('actions')}>
          <Button
            onClick={this.handleSubmit}
            isFetching={isSaving}
            text={__t('Save')}
          />
          <Button
            onClick={this.handleCancel}
            text={__t('Cancel')}
            color="secondary"
          />
        </div>
      </div>
    );
  }
}

export default RedactorForm;

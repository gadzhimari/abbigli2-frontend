import { React, PureComponent, Type } from '../../../../components-lib/__base';
import { Button } from '../../../../components-lib';

import { __t } from '../../../../i18n/translator';

class SaveButtons extends PureComponent {
  static propTypes = {
    handleCancel: Type.func,
    handleSave: Type.func,
    isSaving: Type.bool,
  };

  static defaultProps = {
    handleCancel: () => { },
    handleSave: () => { },
    isSaving: false,
  };

  render() {
    const { handleSave, handleCancel, isSaving } = this.props;

    return (
      <div className="profile-about__save-buttons">
        <Button
          onClick={handleSave}
          isFetching={isSaving}
          text={__t('Save')}
        />
        <Button
          onClick={handleCancel}
          text={__t('Cancel')}
          color="secondary"
        />
      </div>
    );
  }
}

export default SaveButtons;

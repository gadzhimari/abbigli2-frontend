import { React, Component, Type } from '../../../components-lib/__base';
import { Button, Icon } from '../../../components-lib';

import { __t } from '../../../i18n/translator';

import './ConfirmAction.less';

class ConfirmAction extends Component {
  static propTypes = {
    dispatch: Type.func.isRequired,
    closePopup: Type.func.isRequired,
    errors: Type.oneOfType([Type.object, Type.any]),
  };

  handleAction = () => {
    const { options, closePopup } = this.props;

    options.action().then(() => closePopup());
  }

  render() {
    const { closePopup, options } = this.props;

    return (
      <div className="popup-wrap" id="sendMessage">
        <div className="popup mobile-search__popup register-popup">
          <Button
            view="icon"
            className="register-popup__close"
            onClick={closePopup}
            aria-label={__t('Close')}
            icon={<Icon
              glyph="close"
              size="xs"
              color="gray-500"
            />}
          />
          <div className="register-popup__body">
            <div className="register-popup__content">
              <div className="register-popup__subtitle">
                { options.title }
              </div>
              <p className="register-popup__content-text">
                { options.text }
              </p>
              <div className="register-popup__actions">
                <Button
                  view="outline"
                  onClick={closePopup}
                  text={__t('Cancel')}
                  className="register-popup__action"
                />
                <Button
                  onClick={this.handleAction}
                  text={__t('Delete')}
                  className="register-popup__action"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmAction;

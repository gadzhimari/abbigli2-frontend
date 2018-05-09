import { React, Component, Type } from '../../../components-lib/__base';
import { Button } from '../../../components-lib';

import { __t } from '../../../i18n/translator';

class StatusPopup extends Component {
  static propTypes = {
    closePopup: Type.func.isRequired,
    options: Type.shape({
      title: Type.string,
    }).isRequired,
  }

  render() {
    const { closePopup, options } = this.props;

    return (
      <div className="popup-wrap" id="sendMessage" style={{ display: 'block' }}>
        <div className="popup mobile-search__popup reset-popup">
          <form className="register-popup__form">
            <div className="register-popup__content">
              {options.title}
            </div>
            <Button
              className="register-popup__fetch-button-new"
              onClick={closePopup}
              text={__t('Ok')}
            />
          </form>
        </div>
      </div>
    );
  }
}


export default StatusPopup;

import { connect } from 'react-redux';
import { compose } from 'recompose';
import popupHOC from '../../../HOC/popupHOC';

import { React, Component, Type } from '../../../components-lib/__base';
import { Button, Link } from '../../../components-lib';
import IconClose from '../../../icons/close';

import pages from '../../../lib/pages';

import { __t } from '../../../i18n/translator';

import './WelcomePopup.less';

class WelcomePopup extends Component {
  static propTypes = {
    closePopup: Type.func.isRequired,
    dispatch: Type.func.isRequired,
    isFetching: Type.bool.isRequired,
    errors: Type.oneOfType([Type.object, Type.any]),
  };

  handleClick = () => {
    const { closePopup, dispatch } = this.props;

    dispatch(closePopup());
  }

  render() {
    const { closePopup, me } = this.props;

    return (
      <div className="popup-wrap" id="sendMessage" style={{ display: 'block' }}>
        <div
          className="popup mobile-search__popup register-popup"
        >
          <Button
            view="icon"
            className="register-popup__close"
            aria-label={__t('Close')}
            onClick={closePopup}
            icon={<IconClose
              size="xs"
              color="gray-500"
            />}
          />
          <div className="register-popup__title">
            Поздравляем
          </div>
          <div className="register-popup__body">
            <Link
              onClick={this.handleClick}
              view="default"
              to={`/profile/${me.id}`}
              name="sign in"
              text={__t('Sign In')}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ Auth }) => ({
  me: Auth.me
});

const enhance = compose(connect(mapStateToProps), popupHOC);

export default enhance(WelcomePopup);

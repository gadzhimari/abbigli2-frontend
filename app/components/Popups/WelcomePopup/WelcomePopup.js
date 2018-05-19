import { connect } from 'react-redux';
import { compose } from 'recompose';
import popupHOC from '../../../HOC/popupHOC';

import { React, Component, Type } from '../../../components-lib/__base';
import { Button, Link } from '../../../components-lib';
import IconClose from '../../../icons/close';

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
      <div className="popup-wrap" id="sendMessage">
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
            {__t('Congratulations!')}
          </div>
          <p
            className="register-popup__text"
          >
            {__t('You signed up. Create showcases, share your knowledge and skill!')}
          </p>
          <div className="register-popup__footer">
            <Link
              onClick={this.handleClick}
              view="default"
              to={`/profile/${me.id}`}
              name="Go to profile"
              text={__t('Go to profile')}
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

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import {
  Header,
  Footer,
  Search,
  Sprites,
  AvatarBlock,
} from 'components';
import { appConfig } from 'config';
import {
  fetchMe,
  logoutUser,
  setPassword,
  resetConfirm,
} from 'ducks/Auth';
import { closePopup } from 'ducks/Popup/actions';
import { fetchData as settingsFetch, fetchGeo } from 'ducks/Settings';

import Popups from 'components/Popups';
import getComponentFromObject from 'utils/getComponent';

import './App.styl';
import './_concat.styl';
import './main.styl';
import './responsive.styl';
import './slider-pro.css';

class App extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  };

  static fetchData = ({ store, token }, nextState, replace, callback) => {
    if (!token) {
      return callback();
    }

    return store.dispatch(fetchMe(token))
      .then(() => callback());
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(settingsFetch());
    dispatch(fetchGeo());
  }

  componentDidMount() {
    if (window) {
      if (window.innerWidth < 500) {
        window.document.querySelector('body').className = 'isMobile';
      }

      setTimeout(() => {
        this.slideout = new Slideout({
          panel: document.getElementById('app'),
          menu: document.getElementById('swipeMenu'),
          padding: 265,
          tolerance: 70,
        });

        this.slideout.disableTouch();

        this.slideout.on('open', () => {
          this.slideout.enableTouch();
        });
        this.slideout.on('close', () => {
          this.slideout.disableTouch();
        });
      }, 500);
    }

    if (window.document) {
      window.addEventListener('click', (e) => {
        if (e.target.className === 'popup-wrap') {
          this.closePopup();
        }
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth < 500) {
          window.document.querySelector('body').className = 'isMobile';
        } else {
          window.document.querySelector('body').className = '';
        }
      });
    }
  }

  componentWillUpdate(nextProps) {
    const { isAuthenticated, dispatch } = this.props;

    // document.body.scrollTop = 0;

    if (nextProps.isAuthenticated !== isAuthenticated && nextProps.isAuthenticated) {
      dispatch(fetchMe());
    }
  }

  toggleMenu = () => this.slideout.toggle();

  closePopup = () => this.props
    .dispatch(closePopup())

  render() {
    const {
      dispatch,
      isAuthenticated,
      errorMessage,
      openedPopup,
      popupOptions,
      children,
      seo,
      location,
      messagesSending,
      geo,
      isFetchingRegister,
      isFetchingLogin,
      isFetchingConfirm,
      isFetchingSetpass,
      isFetchingReset,
      currentCountry,
    } = this.props;


    const seoData = seo.data.filter(item => item.url == location.pathname)[0];
    const shouldOpenModal = openedPopup;

    const Modal = getComponentFromObject(openedPopup, Popups);

    return (
      <div className="global-wrapper">
        <Helmet
          {...appConfig.head}
          title={seoData && seoData.seo_title}
          meta={seoData && [
            {
              name: 'description',
              content: seoData.seo_description,
            },
          ]}
        />
        <div
          className={`content-wrapper ${shouldOpenModal && 'modal-open-new'}`}
        >
          <Header>
            <Search />
            <AvatarBlock
              isAuthenticated={isAuthenticated}
              errorMessage={errorMessage}
              dispatch={dispatch}
              onLogoutClick={() => dispatch(logoutUser())}
              toggleMenu={this.toggleMenu}
            />
          </Header>
          <Sprites />
          <Modal
            dispatch={dispatch}
            closePopup={this.closePopup}
            options={popupOptions}
          />

          {/*{(showLogin && !isAuthenticated) &&
            <Login
              errors={this.props.loginErrors}
              dispatch={dispatch}
              onLoginClick={creds => dispatch(loginUser(creds))}
              isFetching={isFetchingLogin}
            />
          }

          {
            showSearch
            &&
            <MobileSearchPopup
              dispatch={dispatch}
            />
          }

          {(showRegister && !isAuthenticated) &&
            <Register
              errors={this.props.registerErrors}
              dispatch={dispatch}
              onRegisterClick={creds => dispatch(registerUser(creds))}
              codes={geo}
              isFetching={isFetchingRegister}
              currentCountry={currentCountry}
            />
          }

          {(showSetpass && !isAuthenticated) &&
            <SetPasswordPopup
              errors={this.props.setpassError}
              dispatch={dispatch}
              handleSet={this.handleSetPassword}
              isFetching={isFetchingSetpass}
            />
          }

          {(showConfirm && !isAuthenticated) &&
            <Confirm
              errors={this.props.confirmSignUpError}
              dispatch={dispatch}
              onConfirmClick={creds => dispatch(confirmUser(creds))}
              isFetching={isFetchingConfirm}
            />
          }

          {(showDeleteMessage && isAuthenticated) &&
            <DeleteMessage
              errorMessage={errorMessage}
              dispatch={dispatch}
              recipient={recipient}
              id={dialogId}
            />
          }

          {(showReset && !isAuthenticated) &&
            <Reset
              dispatch={dispatch}
              onResetClick={creds => dispatch(resetUser(creds))}
              isFetching={isFetchingReset}
              errors={this.props.resetError}
            />
          }

          {showSupport &&
            <Support
              errorMessage={errorMessage}
              dispatch={dispatch}
              onSupportClick={creds => dispatch(getSupport(creds))}
            />
          }


          {(showMessage && isAuthenticated) &&
            <Message
              dispatch={dispatch}
              userName={userName}
              userId={userId}
              sending={messagesSending}
            />

          }

          {(confirmResetShow && !isAuthenticated) &&
            <ConfirmReset
              dispatch={dispatch}
              isFetching={isFetchingConfirm}
              sendCode={this.sendConfirmReset}
              errors={this.props.confirmResetError}
            />
          }

          {(showStatus && isAuthenticated) &&
            <Status
              dispatch={dispatch}
            />
          }*/}

          {children}

        </div>
        <Footer dispatch={dispatch}>
          Logo
        </Footer>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/slideout/1.0.1/slideout.min.js"></script>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};


function mapStateToProps(state) {
  const {
    isAuthenticated,
    errorMessage,
    isFetchingRegister,
    isFetching,
    isFetchingConfirm,
    isFetchingSetpass,
    isFetchingReset,
    loginErrors,
    registerErrors,
    resetError,
    confirmSignUpError,
    confirmResetError,
    setpassError,
  } = state.Auth || { isAuthenticated: false, errorMessage: '' };
  const messages = state.Dialogs || {};

  const seo = (state.Seo) || { isFetching: true,  data: []  };
  const settings = (state.Settings) || { isFetching: true,  data: []  };

  return {
    openedPopup: state.Popup.openedPopup,
    popupOptions: state.Popup.options,
    seo,
    settings,
    isAuthenticated,
    errorMessage,
    messagesSending: messages.isSending,
    geo: settings.geo,
    currentCountry: settings.currentCountry,
    isFetchingRegister,
    isFetchingLogin: isFetching,
    isFetchingConfirm,
    isFetchingSetpass,
    isFetchingReset,
    loginErrors,
    registerErrors,
    resetError,
    confirmSignUpError,
    confirmResetError,
    setpassError,
  };
}

export default connect(mapStateToProps)(App);

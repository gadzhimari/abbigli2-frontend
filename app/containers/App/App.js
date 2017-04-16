import React, { Component, PropTypes } from 'react';
import { connect } from 'preact-redux';
import Helmet from 'react-helmet';
import {
  Header,
  Footer,
  Search,
  Sprites,
  AvatarBlock,
  Login,
  Register,
  Confirm,
  DeleteMessage,
  Reset,
  Support,
  Message,
  Status,
  MobileSearchPopup,
  mediaHOC,
} from 'components';
import { appConfig } from 'config';
import {
  loginUser,
  fetchMe,
  logoutUser,
  registerUser,
  confirmUser,
  resetUser,
} from 'ducks/Auth';
import { closeAll } from 'ducks/Popup';
import { getSupport } from 'ducks/Support';
import { fetchData as settingsFetch } from 'ducks/Settings';
import { fetchData as seoFetch } from 'ducks/Seo';
import { fetchData as fetchDataSections } from 'ducks/Sections';
import './App.styl';
import './_concat.styl';
import './main.styl';
import './responsive.styl';
import './slider-pro.css';

class App extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  };

  static fetchData = ({ store, token }) => {
    const promises = [
      store.dispatch(seoFetch()),
      store.dispatch(settingsFetch()),
    ];

    if (token) {
      promises.push(
        store.dispatch(fetchMe(token))
      );
    }

    return Promise.all(promises);
  }

  componentDidMount() {
    if (window) {
      if (window.innerWidth < 500) {
        window.document.querySelector('body').className = 'isMobile';
      }

      setTimeout(() => {
        this.slideout = new Slideout({
          'panel': document.getElementById('app'),
          'menu': document.getElementById('swipeMenu'),
          'padding': 265,
          'tolerance': 70,
        });
      }, 500);
    }

    if (window.document) {
      window.addEventListener('click', (e) => {
        if (e.target.className === 'popup-wrap') {
          this.props.dispatch(closeAll());
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

    document.body.scrollTop = 0;

    if (nextProps.isAuthenticated !== isAuthenticated && nextProps.isAuthenticated) {
      dispatch(fetchMe());
    }
  }

  toggleMenu = () => {
    this.slideout.toggle();
  }

  render() {
    const {
      dispatch,
      isAuthenticated,
      errorMessage,
      showLogin,
      showRegister,
      dialogId,
      recipient,
      showDeleteMessage,
      showReset,
      showMessage,
      showStatus,
      userName,
      showConfirm,
      showSupport,
      children,
      showSearch,
      userId,
      seo,
      location,
      messagesSending,
    } = this.props;

    const seoData = seo.data.filter((item) => item.url == location.pathname)[0];
    const shouldOpenModal = showLogin || showRegister || showConfirm ||
      showDeleteMessage || showReset || showMessage || showStatus || showSupport || showSearch;

    const searchTemplate = ({ media }) => (media.isDesctop ? <Search /> : null);

    const desctopSearch = mediaHOC({
      isDesctop: '(min-width: 1000px)',
    })(searchTemplate);

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

            {desctopSearch}

            <AvatarBlock
              isAuthenticated={isAuthenticated}
              errorMessage={errorMessage}
              dispatch={dispatch}
              onLogoutClick={() => dispatch(logoutUser())}
              toggleMenu={this.toggleMenu}
            />
          </Header>
          <Sprites />


          {(showLogin && !isAuthenticated) &&
            <Login
              errorMessage={errorMessage}
              dispatch={dispatch}
              onLoginClick={creds => dispatch(loginUser(creds))}
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
              errorMessage={errorMessage}
              dispatch={dispatch}
              onRegisterClick={creds => dispatch(registerUser(creds))}
            />
          }

          {(showConfirm && !isAuthenticated) &&
            <Confirm
              errorMessage={errorMessage}
              dispatch={dispatch}
              onConfirmClick={creds => dispatch(confirmUser(creds))}
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
              errorMessage={errorMessage}
              dispatch={dispatch}
              onResetClick={creds => dispatch(resetUser(creds))}
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

          {(showStatus && isAuthenticated) &&
            <Status
              dispatch={dispatch}
            />
          }

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
  const { isAuthenticated, errorMessage } = state.Auth || { isAuthenticated: false, errorMessage: '' };
  const {
    showLogin, showRegister, showDeleteMessage, userId, recipient,
    showReset, showMessage, showStatus, userName,
    sendMessageYourselfError, showConfirm, showSupport, showSearch, dialogId } = state.Popup;
  const messages = state.Dialogs || {};

  const seo = (state.Seo) || { isFetching: true,  data: []  };
  const settings = (state.Settings) || { isFetching: true,  data: []  };

  return {
    seo,
    settings,
    isAuthenticated,
    errorMessage,
    showLogin,
    showRegister,
    showConfirm,
    showDeleteMessage,
    userId,
    recipient,
    dialogId,
    showReset,
    showMessage,
    showStatus,
    showSupport,
    showSearch,
    userName,
    sendMessageYourselfError,
    messagesSending: messages.isSending,
  };
}

export default connect(mapStateToProps)(App);

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
} from 'ducks/Auth/authActions';
import { closePopup, openPopup } from 'ducks/Popup/actions';
import { fetchData as settingsFetch, fetchGeo } from 'ducks/Settings';

import * as Popups from 'components/Popups';
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

  static fetchData = ({ store, token, shouldPreload }, nextState, replace, callback) => {
    if (!shouldPreload) return callback();

    const promises = [];
    const child = nextState.routes[nextState.routes.length - 1].component;

    if (token) {
      promises.push(store.dispatch(fetchMe(token)));
    }

    if (child.fetchData) {
      promises.push(child.fetchData(store.dispatch, nextState.params, token));
    }

    return Promise.all(promises)
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

  logoutUser = () => this.props
    .dispatch(logoutUser())

  modalPopupClick = ({ currentTarget }) => this.props
    .dispatch(openPopup(currentTarget.dataset.type || currentTarget.name))

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

    const Popup = getComponentFromObject(openedPopup, Popups);

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
            {
              name: 'keywords',
              content: seoData.seo_keywords,
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
              onLogoutClick={this.logoutUser}
              toggleMenu={this.toggleMenu}
            />
          </Header>
          <Sprites />

          <Popup
            dispatch={dispatch}
            closePopup={this.closePopup}
            options={popupOptions}
          />

          { children }

        </div>
        <Footer
          openPopup={this.modalPopupClick}
        >
          Logo
        </Footer>
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

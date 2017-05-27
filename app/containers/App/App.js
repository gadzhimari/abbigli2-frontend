import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Helmet from 'react-helmet';

import {
  Header,
  Footer,
  Search,
  Sprites,
  AvatarBlock,
  ContentWrapper,
} from 'components';

import {
  fetchMe,
  logoutUser,
} from 'ducks/Auth/authActions';
import { closePopup, openPopup } from 'ducks/Popup/actions';
import { fetchData as settingsFetch, fetchGeo } from 'ducks/Settings';
import toggleMobileMenu, { closeMenu } from 'ducks/Menu/actions';
import { fetchData as fetchDataSections } from 'ducks/Sections';

import * as Popups from 'components/Popups';
import getComponentFromObject from 'utils/getComponent';

import { appConfig } from 'config';

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
    const { dispatch, itemsSections } = this.props;

    if (itemsSections.length === 0) {
      dispatch(fetchDataSections());
    }

    dispatch(settingsFetch());
    dispatch(fetchGeo());
  }

  componentDidMount() {
    if (window) {
      if (window.innerWidth < 500) {
        window.document.querySelector('body').className = 'isMobile';
      }
    }

    if (window.document) {
      window.addEventListener('click', (e) => {
        if (e.target.className === 'popup-wrap') {
          this.closePopup();
        }
      });
    }
  }

  componentWillUpdate(nextProps) {
    const { isAuthenticated, dispatch } = this.props;

    if (nextProps.isAuthenticated !== isAuthenticated && nextProps.isAuthenticated) {
      dispatch(fetchMe());
    }
  }

  toggleMenu = () => this.props.dispatch(toggleMobileMenu());

  closeMenu = () => this.props.dispatch(closeMenu());

  logoutUser = () => this.props
    .dispatch(logoutUser())

  modalButtonClick = ({ currentTarget }) => this.props
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
      mobileMenuOpened,
      itemsSections,
      isFetchingSections,
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

        <ContentWrapper
          contentWrapperClass="global-wrapper"
          modalButtonClick={this.modalButtonClick}
          itemsSections={itemsSections}
          isOpenMenu={mobileMenuOpened}
          closeMenu={this.closeMenu}
          isFetchingSections={isFetchingSections}
        >

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
                itemsSections={itemsSections}
                isFetchingSections={isFetchingSections}
              />
            </Header>
            <Sprites />

            <Popup
              dispatch={dispatch}
              closePopup={this.closePopup}
              options={popupOptions}
            />

            {children}

          </div>
          <Footer
            openPopup={this.modalButtonClick}
          >
            Logo
        </Footer>
        </ContentWrapper>
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
  } = state.Auth || { isAuthenticated: false, errorMessage: '' };
  const messages = state.Dialogs || {};

  const seo = (state.Seo) || { isFetching: true, data: [] };
  const settings = (state.Settings) || { isFetching: true, data: [] };

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
    mobileMenuOpened: state.Menu.open,
    itemsSections: state.Sections.items,
    isFetchingSections: state.Sections.isFetching,
  };
}

export default connect(mapStateToProps)(App);

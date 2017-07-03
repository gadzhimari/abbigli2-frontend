import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Helmet from 'react-helmet';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import {
  Header,
  Footer,
  Search,
  Sprites,
  AvatarBlock,
  ContentWrapper,
} from 'components';

import scrollOnRoute from 'App/HOC/scrollOnRoute';

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

import './app.less';
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

    const promises = [store.dispatch(fetchDataSections())];
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
      <div className="app-wrapper">
        <ContentWrapper
          contentWrapperClass=""
          modalButtonClick={this.modalButtonClick}
          itemsSections={itemsSections}
          isOpenMenu={mobileMenuOpened}
          closeMenu={this.closeMenu}
          isFetchingSections={isFetchingSections}
        >
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

          <main className="main">
            {children}
          </main>
        </ContentWrapper>
        <Footer
          openPopup={this.modalButtonClick}
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

export default connect(mapStateToProps)(DragDropContext(HTML5Backend)(scrollOnRoute(App)));

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Helmet from 'react-helmet';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import { Header, Search, AvatarBlock, ContentWrapper } from '../../components';
import NotFound from '../../containers/NotFound';

import scrollOnRoute from '../../HOC/scrollOnRoute';

import { fetchMe, logoutUser } from '../../ducks/Auth/authActions';
import { closePopup, openPopup } from '../../ducks/Popup/actions';
import { fetchData as settingsFetch, fetchGeo } from '../../ducks/Settings';
import loadNewIn from '../../ducks/NewIn/actions';
import toggleMobileMenu, { closeMenu } from '../../ducks/Menu/actions';
import { fetchData as fetchDataSections } from '../../ducks/Sections';
import { clearNetworkError } from '../../ducks/NetworkErrors/reducer';

import * as Popups from '../../components/Popups';
import getComponentFromObject from '../../utils/getComponent';

import { appConfig } from '../../config';

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
    const childFetch = child.fetchData ||
      (child.WrappedComponent && child.WrappedComponent.fetchData);

    if (token) {
      promises.push(store.dispatch(fetchMe(token)));
    }

    if (childFetch) {
      promises.push(childFetch(store.dispatch, nextState.params, token));
    }

    return Promise.all(promises)
      .then(() => callback())
      .catch(err => console.log(err));
  }

  constructor(props) {
    super(props);

    if (props.itemsSections.length === 0) {
      props.dispatch(fetchDataSections());
    }
    props.dispatch(settingsFetch());
    props.dispatch(fetchGeo());
    props.dispatch(loadNewIn());
  }

  componentDidMount() {
    if (window) {
      if (window.innerWidth < 500) {
        window.document.querySelector('body').classList.add('isMobile');
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
    const { isAuthenticated, dispatch, location } = this.props;

    if (nextProps.isAuthenticated !== isAuthenticated && nextProps.isAuthenticated) {
      dispatch(fetchMe());
    }

    if (nextProps.location.key !== location.key) {
      dispatch(clearNetworkError());
    }
  }

  toggleMenu = () => this.props.dispatch(toggleMobileMenu());

  closeMenu = () => this.props.dispatch(closeMenu());

  logoutUser = () => this.props.dispatch(logoutUser())

  modalButtonClick = ({ currentTarget }) => this.props
    .dispatch(openPopup(currentTarget.dataset.type || currentTarget.name))

  closePopup = () => this.props.dispatch(closePopup())

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
      errors,
    } = this.props;

    const seoData = seo.data.filter(item => item.url == location.pathname)[0];

    const Popup = getComponentFromObject(openedPopup, Popups);
    const shouldOpenModal = openedPopup;

    return (
      <ContentWrapper
        contentWrapperClass={`global-wrapper ${shouldOpenModal ? 'modal-open-new' : ''}`}
        modalButtonClick={this.modalButtonClick}
        itemsSections={itemsSections}
        isOpenMenu={mobileMenuOpened}
        closeMenu={this.closeMenu}
        isFetchingSections={isFetchingSections}
        openPopup={this.modalButtonClick}
      >
        <Helmet
          {...appConfig.head.titleTemplate}
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
            ...appConfig.head.meta,
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

        <Popup
          dispatch={dispatch}
          closePopup={this.closePopup}
          options={popupOptions}
        />

        {errors.status !== null ?
          <NotFound /> : children
        }
      </ContentWrapper>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  errors: PropTypes.shape({
    status: PropTypes.oneOfType([PropTypes.number, PropTypes.any]),
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  }),
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
    errors: state.NetworkErrors,
  };
}

export default connect(mapStateToProps)(DragDropContext(HTML5Backend)(scrollOnRoute(App)));

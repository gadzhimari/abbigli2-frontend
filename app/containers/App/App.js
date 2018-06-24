import Helmet from 'react-helmet';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import { connect } from 'react-redux';

import { React, Component, Type } from '../../components-lib/__base';

import { Header, Search, AvatarBlock, ContentWrapper } from '../../components';
import { NotFound } from '../../components-lib';

import scrollOnRoute from '../../HOC/scrollOnRoute';

import { fetchMe, logoutUser } from '../../ducks/Auth/authActions';
import { closePopup, openPopup } from '../../ducks/Popup/actions';
import { fetchGeo } from '../../ducks/Settings';
import loadNewIn from '../../ducks/NewIn/actions';
import toggleMobileMenu, { closeMenu } from '../../ducks/Menu/actions';
import { clearNetworkError } from '../../ducks/NetworkErrors/reducer';
import { fetchSections } from '../../ducks/Sections';

import * as Popups from '../../components/Popups';
import getComponentFromObject from '../../utils/getComponent';
import { shouldHideHeaderAndFooter, shouldHideFooter } from '../../lib/hide-header-footer';

import { appConfig } from '../../config';

import './app.less';
import './App.styl';
import './_concat.styl';
import './main.styl';
import './responsive.styl';

class App extends Component {
  static propTypes = {
    children: Type.oneOfType(Type.node, Type.arrayOf(Type.node)),
    dispatch: Type.func.isRequired,
    isAuthenticated: Type.bool.isRequired,
    errorMessage: Type.string,
    errors: Type.shape({
      status: Type.oneOfType([Type.number, Type.any]),
      message: Type.oneOfType([Type.string, Type.any]),
    }),
  };

  constructor(props) {
    super(props);

    props.dispatch(fetchSections());
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

  modalButtonClick = (e, { name }) => {
    this.props.dispatch(openPopup(name));
  }

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

    const seoData = seo.data.filter(item => item.url === location.pathname)[0];

    const Popup = getComponentFromObject(openedPopup, Popups);
    const shouldOpenModal = openedPopup;
    const hideHeaderAndFooter = shouldHideHeaderAndFooter(location);
    const hideFooter = shouldHideFooter(location);

    return (
      <ContentWrapper
        contentWrapperClass={`global-wrapper ${shouldOpenModal ? 'modal-open-new' : ''}`}
        modalButtonClick={this.modalButtonClick}
        itemsSections={itemsSections}
        isOpenMenu={mobileMenuOpened}
        closeMenu={this.closeMenu}
        isFetchingSections={isFetchingSections}
        openPopup={this.modalButtonClick}
        showFooter={!hideHeaderAndFooter && !hideFooter}
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
        {!hideHeaderAndFooter &&
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
        }

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

function mapStateToProps(state) {
  return {
    openedPopup: state.Popup.openedPopup,
    popupOptions: state.Popup.options,
    seo: state.Seo,
    settings: state.Settings,
    isAuthenticated: state.Auth.isAuthenticated,
    errorMessage: state.Auth.errorMessage,
    messagesSending: state.Dialogs.isSending,
    geo: state.Settings.geo,
    currentCountry: state.Settings.currentCountry,
    mobileMenuOpened: state.Menu.open,
    itemsSections: state.Sections.items,
    isFetchingSections: state.Sections.isFetching,
    errors: state.NetworkErrors,
    isTouch: state.isTouch,
  };
}

export default connect(mapStateToProps)(DragDropContext(HTML5Backend)(scrollOnRoute(App)));

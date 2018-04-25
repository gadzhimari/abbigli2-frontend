import pages from './pages';

const shouldHideHeaderAndFooter = ({ pathname }) =>
  pathname === `/${pages.FOR_MASTERS_PAGE.path}`;


export default shouldHideHeaderAndFooter;

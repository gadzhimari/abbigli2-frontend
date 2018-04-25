import pages from './pages';

const hideHeaderAndFooter = ({ pathname }) =>
  pathname === `/${pages.FOR_MASTERS_PAGE.path}`;


export default hideHeaderAndFooter;

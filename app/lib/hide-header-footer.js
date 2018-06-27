import pages from './pages';

export const shouldHideHeaderAndFooter = ({ pathname }) => pathname === `/${pages.FOR_MASTERS_PAGE.path}`;
export const shouldHideFooter = ({ pathname }) => pathname === `/${pages.CHAT_PAGE.path}`;

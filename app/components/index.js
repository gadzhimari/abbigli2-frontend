// TODO: create a node/webpack compatible container factory with require.context
// TODO: migrate to universal-webpack from webpack-isomorphic-tools to allow webpack extra features
// const componentModules = require.context('.', true, /\.js$/);
// let res = {};
//
// componentsModules.keys().forEach((key) => {
//   res[key.replace(/\.\/(.*)\.js/, "$1")] = componentModules[key];
// });
//
// export default res;

export { default as AvatarBlock } from './AvatarBlock/AvatarBlock';
export { default as Banner } from './Banner/Banner';
export { default as TileWrap } from './TileWrap/TileWrap';
export { default as BannerBlue } from './BannerBlue/BannerBlue';
export { default as CardsWrap } from './CardsWrap/CardsWrap';
export { default as CardProduct } from './CardProduct/CardProduct';
export { default as Header } from './Header/Header';
export { default as Footer } from './Footer/Footer';
export { default as Link } from './Link/Link';
export { default as Search } from './Search/Search';
export { default as ProductPreview } from './ProductPreview/ProductPreview';
export { default as UserProfile } from './UserProfile/UserProfile';
export { default as Gallery } from './Gallery/Gallery';
export { default as Loading } from './Loading';
export { default as HR } from './HR';
export { default as Share } from './Share/Share';
export { default as Like } from './Like/Like';
export { default as HomeSlider } from './HomeSlider';
export { default as SliderBar } from './SliderBar';
export { default as UserSearch } from './UserSearch';
export { default as DialogsBlock } from './DialogsBlock';
export { default as DragableImage } from './DragableImage';
export { default as FetchingButton } from './FetchingButton';
export { default as SocialLogin } from './SocialLogin';
export { default as Icons } from './Icons';
export { default as SocialGroups } from './SocialGroups';
export { default as Menu } from './Menu';
export { default as ContentWrapper } from './ContentWrapper';
export { default as BreadCrumbs } from './BreadCrumbs';
export { default as Filters } from './Filters';
export { default as PageSwitcher } from './PageSwitcher';
export { default as NewPost } from './NewPost';
export { default as ListWithNew } from './ListWithNew';
export { default as AuthorInfo } from './AuthorInfo';
export { default as OtherArticles } from './OtherArticles';
export { default as Sidebar } from './Sidebar';
export { default as FavoriteAdd } from './FavoriteAdd';
export { default as RelativePosts } from './RelativePosts';
export { default as ChoiseFilter } from './ChoiseFilter';
export { default as NoMatch } from './NoMatch';


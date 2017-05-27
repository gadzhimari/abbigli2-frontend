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
export { default as Button } from './Button/Button';
export { default as Banner } from './Banner/Banner';
export { default as BannerOld } from './BannerOld';
export { default as BannerBlue } from './BannerBlue/BannerBlue';
export { default as CardsSort } from './CardsSort/CardsSort';
export { default as CardsSortItem } from './CardsSort/CardsSortItem';
export { default as CardsWrap } from './CardsWrap/CardsWrap';
export { default as TileWrap } from './TileWrap/TileWrap';
export { default as Card } from './Card/Card';
export { default as CardShop } from './CardShop/CardShop';
export { default as CardTag } from './CardTag/CardTag';
export { default as CardProduct } from './CardProduct/CardProduct';
export { default as Header } from './Header/Header';
export { default as Footer } from './Footer/Footer';
export { default as Link } from './Link/Link';
export { default as Search } from './Search/Search';
export { default as ProductPreview } from './ProductPreview/ProductPreview';
export { default as ProductInfo } from './ProductInfo/ProductInfo';
export { default as AuthorSubscribe } from './AuthorSubscribe/AuthorSubscribe';
export { default as Title } from './Title/Title';
export { default as Text } from './Text/Text';
export { default as UserProfile } from './UserProfile/UserProfile';
export { default as UserProfileMe } from './UserProfile/UserProfileMe';
export { default as NewBanner } from './NewBanner/NewBanner';
export { default as Sprites } from './Sprites/Sprites';
export { default as Gallery } from './Gallery/Gallery';
export { default as GalleryProduct } from './GalleryProduct/GalleryProduct';
export { default as EventButtons } from './EventButtons/EventButtons';
export { default as BlogCard } from './BlogCard';
export { default as EventCard } from './EventCard';
export { default as Loading } from './Loading';
export { default as HR } from './HR';
export { default as CardUni } from './CardUni';
export { default as SidebarItem } from './SidebarItem';
export { default as Share } from './Share/Share';
export { default as Like } from './Like/Like';
export { default as Subscription } from './Subscription/Subscription';
export { default as HomeSlider } from './HomeSlider';
export { default as TagsBar } from './TagsBar';
export { default as CommentsBox } from './CommentsBox';
export { default as SelectInput } from './SelectInput';
export { default as UserSearch } from './UserSearch';
export { default as DialogsBlock } from './DialogsBlock';
export { default as UploadingImage } from './UploadingImage';
export { default as FetchingButton } from './FetchingButton';
export { default as SocialLogin } from './SocialLogin';
export { default as Icons } from './Icons';
export { default as SocialGroups } from './SocialGroups';
export { default as Menu } from './Menu';
export { default as ContentWrapper } from './ContentWrapper';

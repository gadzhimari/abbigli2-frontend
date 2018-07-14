import { compose } from 'recompose';
import { React, PureComponent, connect, cn } from '../../components-lib/__base';

import { BreadCrumbs, ListWithNew, SliderBar, SliderBarCard } from '../../components';
import { Product } from '../../components-lib/Cards';
import { ProductsIcons } from '../../components/Icons';

import { fetchData } from '../../ducks/PostsSpecific';

import paginateHOC from '../../HOC/paginate';
import mapFiltersToProps from '../../HOC/mapFiltersToProps';
import preloader from './preloader';

import { __t } from '../../i18n/translator';

import './SpecificPostsPage.less';

const giftsCategoriesSlugs = new Set(['podarki', 'gifts']);

@cn('SpecificPostsPage')
class SpecificPostsPage extends PureComponent {

  render(cn) {
    const { page, items, sections, route, renderPaginator } = this.props;
    const crumbs = [page];

    const gifts = sections.filter(item => giftsCategoriesSlugs.has(item.slug))[0];
    const Icon = ProductsIcons[route.filter] || null;

    return (
      <main className={`main ${cn()}`}>
        <BreadCrumbs
          crumbs={crumbs}
        />

        <div className={cn('giftsTitle')}>
          {__t('Buy a gifts')}
        </div>

        <SliderBar
          className={cn('giftsSlider')}
          items={gifts && gifts.children}
          ItemComponent={SliderBarCard}
        />

        <h1 className="section-title">
          {Icon && <Icon />}
          {page.title}
        </h1>

        <ListWithNew
          ItemComponent={Product}
          items={items}
          count={8}
        />

        {renderPaginator()}

      </main>
    );
  }
}

const mapStateToProps = ({ PostsSpecific, Auth, Sections }) => ({
  next: PostsSpecific.next,
  items: PostsSpecific.items,
  isFetching: PostsSpecific.isFetching,
  isAuthenticated: Auth.isAuthenticated,
  pagesCount: PostsSpecific.pages,
  sections: Sections.items,
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: (specific, options) => dispatch(fetchData(specific, options))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  paginateHOC,
  mapFiltersToProps,
  preloader
);

export default enhance(SpecificPostsPage);

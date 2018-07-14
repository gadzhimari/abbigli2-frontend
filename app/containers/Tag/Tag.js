import { compose } from 'recompose';
import Helmet from 'react-helmet';

import { React, Component, Type, cn, connect } from '../../components-lib/__base';

import { BreadCrumbs, SliderBar, ListWithNew, SliderBarTag } from '../../components';

import { Spin } from '../../components-lib';

import { fetchPosts, fetchTags } from '../../ducks/TagSearch/actions';

import paginateHOC from '../../HOC/paginate';
import mapFiltersToProps from '../../HOC/mapFiltersToProps';

import { PRODUCT_TYPE, BLOG_TYPE, EVENT_TYPE } from '../../lib/constants/posts-types';
import { __t } from './../../i18n/translator';

import './Tag.less';

const allowedTypes = new Set([PRODUCT_TYPE, BLOG_TYPE, EVENT_TYPE]);

@cn('TagPage')
class TagSearchResults extends Component {
  static propTypes = {
    routeParams: Type.shape().isRequired,
    dispatch: Type.func.isRequired,
    applyFilters: Type.func.isRequired,
    updateFilter: Type.func.isRequired,
    changeFiltersType: Type.func.isRequired,
    updateFieldByName: Type.func.isRequired,
    paginate: Type.func.isRequired,
    reversePriceRange: Type.func.isRequired,
    isAuthenticated: Type.bool.isRequired,
    filters: Type.shape({
      price_from: Type.string,
      price_to: Type.string,
      section: Type.string,
      color: Type.string,
      distance: Type.string,
    }).isRequired,
  };

  componentDidMount() {
    const { location, router, items } = this.props;

    if (!window.location.search.includes('?tags')) {
      router.push('/');
    }

    if (location.action === 'POP' && items.length === 0) {
      this.loadItems();
      this.loadRelativeTags();
    }

    if (location.action === 'PUSH') {
      this.loadItems();
      this.loadRelativeTags();
    }
  }

  componentDidUpdate(prevProps) {
    const { routeParams } = this.props;

    if (prevProps.routeParams !== routeParams) {
      this.loadItems();
      this.loadRelativeTags();
    }
  }

  sliderBarTagProps;

  loadRelativeTags = () => {
    const { query, dispatch } = this.props;
    const options = {
      related_with: query.tags
    };

    if (!allowedTypes.has(query.type)) {
      options.type = `${PRODUCT_TYPE}s`;
    } else {
      options.type = `${query.type}s`;
    }

    dispatch(fetchTags(options));
  }

  loadItems = () => {
    const { query: { type, ...query }, dispatch } = this.props;
    const postType = allowedTypes.has(type) ? type : PRODUCT_TYPE;

    dispatch(fetchPosts(query, postType));
  }

  clickOnTag = (tag) => {
    const { router, filters } = this.props;
    const tags = filters.tags.split(',');
    const newTags = [...tags, tag];

    router.push({
      pathname: '/find',
      query: Object.assign({}, filters, {
        tags: newTags.join(','),
      }),
    });
  }

  renderResultsOfSearch() {
    const { items, query } = this.props;
    const tags = query.tags || '';

    return ((items.length !== 0) &&
      <h1 className="section-title">
        <span>{__t('Search results')}</span>
        {` "${tags.split(',').join(' ')}"`}
      </h1>
    );
  }

  render(cn) {
    const {
      tags,
      items,
      isFetching,
      filters,
      renderPaginator,
      query: { type }
    } = this.props;

    const postType = allowedTypes.has(type) ? type : PRODUCT_TYPE;

    if (!this.sliderBarTagProps) {
      this.sliderBarTagProps = { onClick: this.clickOnTag };
    }

    return (
      <div className={cn()}>
        <Helmet>
          <title>{__t('Searching on Abbigli')}</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>

        <SliderBar
          className={cn('sliderBar')}
          items={tags}
          ItemComponent={SliderBarTag}
          itemWidth={175}
          itemProps={this.sliderBarTagProps}
        />

        <main className="main">
          <BreadCrumbs />

          <div className="content">
            {this.renderResultsOfSearch()}

            {
              isFetching
                ? <div className="cards-wrap">
                  <div className="spin-wrapper">
                    <Spin visible={isFetching} />
                  </div>
                </div>
                : <ListWithNew
                  items={items}
                  count={4}
                  query={filters.tags}
                  type={postType}
                />
            }

            {!isFetching && renderPaginator()}
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ Auth, TagSearch, Sections, Location }) => ({
  isAuthenticated: Auth.isAuthenticated,
  items: TagSearch.items,
  tags: TagSearch.tags,
  isFetching: TagSearch.isFetching,
  pagesCount: TagSearch.pagesCount,
  sections: Sections.items,

  query: Location.query
});

const enhance = compose(
  connect(mapStateToProps),
  mapFiltersToProps,
  paginateHOC
);

export default enhance(TagSearchResults);

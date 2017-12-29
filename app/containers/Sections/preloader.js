import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Helmet from 'react-helmet';

import { SectionTag } from '../../containers';

const preloader = WrappedComponent => class extends PureComponent {
  static propTypes = {
    fetchSectionTags: PropTypes.func.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    params: PropTypes.shape({
      subsection: PropTypes.string,
    }).isRequired,
    sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  constructor(props) {
    super(props);

    const { params, sections } = this.props;
    const tree = this.createTree(params, sections);
    const currentSection = tree[tree.length - 1];
    const promo = this.getPromo(currentSection);

    this.state = {
      isFetching: true,
      tree,
      promo,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    const { params } = this.props;

    if (prevProps.params !== params) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const { params, fetchSectionTags, fetchPosts, sections, routing } = this.props;
    const tree = this.createTree(params, sections);
    const currentSection = tree[tree.length - 1];
    const promo = this.getPromo(currentSection);

    this.setState({
      isFetching: true,
      tree,
      promo,
    });

    Promise.all([
      fetchSectionTags(currentSection.slug),
      fetchPosts(currentSection.slug, routing.query.page, routing.query.tag),
    ]).then(() => this.setState({
      isFetching: false,
    }));
  }

  createTree = (params, sections) => {
    const { normalizedSections, promo } = this.props;

    let array = [params.section];
    const categories = normalizedSections.entities.categories;
    const promoCategories = promo.entities.categories;

    if (params.splat) {
      array = params.splat.split('/').concat(array);
    }

    return array.reduce((acc, cur) => {
      let targetCategories = cur in categories ? categories : promoCategories;
      let current = Object.assign({}, targetCategories[cur]);

      if (current.is_promo) {
        targetCategories = promoCategories;
        current = Object.assign({}, targetCategories[cur]);
      }

      if (current.children.length === 0 && cur in promoCategories) {
        targetCategories = promoCategories;
        current = Object.assign({}, targetCategories[cur]);
      }

      current.children = current.children.map(catSlug => targetCategories[catSlug]);
      current.url = current.view_on_site_url;

      acc.push(current);

      return acc;
    }, []);
  }

  getPromo = (currentSection) => {
    if (currentSection.children.length === 0) return [];

    const { promo } = this.props;
    const promoCategories = promo.entities.categories;

    const currentPromoParent = promoCategories[currentSection.slug];

    const promoCat = getPromoFromCat(currentPromoParent.children);

    return promoCat;

    function getPromoFromCat(array) {
      return array.reduce((prev, cur) => {
        const currentCat = promoCategories[cur];

        if (currentCat.is_promo) {
          prev.push(currentCat);

          return prev;
        }

        prev.push(...getPromoFromCat(currentCat.children));

        return prev;
      }, []);
    }
  }

  render() {
    const { isFetching, tree, promo } = this.state;
    const currentSection = tree[tree.length - 1] || {};

    return (<div>
      <Helmet>
        <title>{currentSection.seo_title}</title>
        <meta name="description" content={currentSection.seo_description} />
        {currentSection.posts_num === 0 &&
          <meta name="robots" content="noindex, nofollow" />
        }
      </Helmet>

      {currentSection.children && currentSection.children.length === 0 &&
        <SectionTag
          isFetching={isFetching}
          {...this.props}
          tree={tree}
        />
      }

      {currentSection.children && currentSection.children.length !== 0 &&
        <WrappedComponent
          isFetching={isFetching}
          {...this.props}
          tree={tree}
          promo={promo}
          section={currentSection}
        />
      }
    </div>);
  }
};

export default preloader;

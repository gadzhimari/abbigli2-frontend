import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { SectionTag } from 'containers';

import { Loading } from 'components';

const preloader = WrappedComponent => class extends PureComponent {
  static propTypes = {
    fetchSectionTags: PropTypes.func.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    params: PropTypes.shape({
      subsection: PropTypes.string,
    }).isRequired,
    sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  constructor() {
    super();
    this.state = {
      isFetching: true,
      tree: [],
      promo: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    const { params } = this.props;
    if (prevProps.params !== params) {
      this.setState({
        isFetching: true,
      });

      this.getData();
    }
  }

  getData = () => {
    const { params, fetchSectionTags, fetchPosts, sections } = this.props;
    const start = performance.now();
    const tree = this.createTree(params, sections);
    const currentSection = tree[tree.length - 1];
    const promo = this.getPromo(currentSection);

    Promise.all([fetchSectionTags(currentSection.slug), fetchPosts(currentSection.slug)])
      .then(() => this.setState({
        isFetching: false,
        tree,
        promo,
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
      const targetCategories = cur in categories ? categories : promoCategories;
      const current = Object.assign({}, targetCategories[cur]);

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

    if (isFetching) {
      return <Loading loading={isFetching} />;
    }

    if (currentSection.children.length === 0) {
      return <SectionTag {...this.props} tree={tree} />;
    }

    return (<WrappedComponent {...this.props} tree={tree} promoCategories={promo} />);
  }
};

export default preloader;

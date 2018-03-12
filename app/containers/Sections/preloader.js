import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Helmet from 'react-helmet';

import { Spin } from '../../components-lib';
import { SectionTag } from '../../containers';

const preloader = WrappedComponent => class extends PureComponent {
  static propTypes = {
    fetchSectionTags: PropTypes.func.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    params: PropTypes.shape({
      subsection: PropTypes.string,
    }).isRequired
  }

  state = {
    isFetching: true,
    promo: []
  };

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
    const {
      params,
      fetchSectionTags,
      fetchPosts,
      routing,
      fetchCrumbs
    } = this.props;

    this.setState({ isFetching: true });

    const { section, splat } = params;
    const { page, tag } = routing.query;

    let slugs = [section];

    if (splat) {
      slugs = splat.split('/').concat(slugs);
    }

    Promise.all([
      fetchSectionTags(section),
      fetchPosts(section, page, tag),
      fetchCrumbs({ slugs })
    ]).then(() => this.setState({
      isFetching: false,
    }));
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
    const { isFetching, promo } = this.state;
    const { tree } = this.props;
    const currentSection = tree[tree.length - 1] || {};

    if (isFetching) {
      return (
        <div className="spin-wrapper">
          <Spin visible />
        </div>
      );
    }

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

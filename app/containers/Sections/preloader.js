import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Helmet from 'react-helmet';

import { Spin } from '../../components-lib';
import { SectionTag } from '../../containers';

const preloader = WrappedComponent => class extends PureComponent {
  static propTypes = {
    fetchCatalogPageData: PropTypes.func.isRequired,
    params: PropTypes.shape({
      subsection: PropTypes.string,
    })
  }

  state = { isFetching: true };

  componentDidMount() {
    const { currentSection, params } = this.props;

    if (currentSection.slug !== params.section) {
      this.fetchData();
    }
  }

  componentDidUpdate(prevProps) {
    const { params, query } = this.props;

    if (prevProps.params !== params || query !== prevProps.query) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const { params, query, fetchCatalogPageData } = this.props;
    fetchCatalogPageData(params, query);
  }

  render() {
    const { currentSection, isFetching } = this.props;

    return (<div>
      <Helmet>
        <title>{currentSection.seo_title}</title>
        <meta name="description" content={currentSection.seo_description} />

        {currentSection.posts_num === 0 &&
          <meta name="robots" content="noindex, nofollow" />
        }
      </Helmet>

      {isFetching &&
        <div className="spin-wrapper">
          <Spin visible />
        </div>
      }

      {!isFetching && currentSection.children && currentSection.children.length === 0 &&
        <SectionTag
          isFetching={isFetching}
          {...this.props}
        />
      }

      {!isFetching && currentSection.children && currentSection.children.length !== 0 &&
        <WrappedComponent
          isFetching={isFetching}
          {...this.props}
        />
      }
    </div>);
  }
};

export default preloader;

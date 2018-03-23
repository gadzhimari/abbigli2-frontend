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

  state = { isFetching: true };

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

  render() {
    const { isFetching } = this.state;
    const { currentSection } = this.props;

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
          section={currentSection}
        />
      }
    </div>);
  }
};

export default preloader;

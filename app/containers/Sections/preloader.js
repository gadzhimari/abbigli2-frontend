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
    };
  }

  componentDidMount() {
    const { params, fetchSectionTags, fetchPosts, sections } = this.props;
    const tree = this.createTree(params, sections);
    const currentSection = tree[tree.length - 1];

    Promise.all([
      fetchSectionTags(currentSection.slug),
      fetchPosts(currentSection.slug),
    ]).then(() => this.setState({
      isFetching: false,
      tree,
    }));
  }

  componentDidUpdate(prevProps) {
    const { params, fetchSectionTags, fetchPosts, sections } = this.props;
    const tree = this.createTree(params, sections);
    const currentSection = tree[tree.length - 1];

    if (prevProps.params !== params) {
      this.setState({
        isFetching: true,
      });

      Promise.all([
        fetchSectionTags(currentSection.slug),
        fetchPosts(currentSection.slug),
      ]).then(() => this.setState({
        isFetching: false,
        tree,
      }));
    }
  }

  createTree = (params, sections) => {
    const array = Object.keys(params)
      .map(key => params[key]);

    return array.reduce((acc) => {
      const categories = acc.length > 0
        ? acc[acc.length - 1].children
        : sections;
      const current = categories.filter(section => array.includes(section.slug))[0] || {};
      const previous = acc.length > 0
        ? acc[acc.length - 1]
        : null;


      acc.push({
        id: current.id,
        title: current.title,
        slug: current.slug,
        children: current.children,
        url: previous
          ? `${previous.url}/${current.slug}`
          : `/c/${current.slug}`,
        showAll: current.show_all,
      });

      return acc;
    }, []);
  }

  render() {
    const { isFetching, tree } = this.state;
    const currentSection = tree[tree.length - 1] || {};

    if (isFetching) {
      return <Loading loading={isFetching} />;
    }

    if (currentSection.children.length === 0) {
      return <SectionTag {...this.props} tree={tree} />;
    }

    return (<WrappedComponent {...this.props} tree={tree} />);
  }
};

export default preloader;

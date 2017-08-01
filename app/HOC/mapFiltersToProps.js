import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const mapFiltersToProps = WrappedComponent => class MapFilters extends PureComponent {
  static propTypes = {
    routing: PropTypes.shape({
      query: PropTypes.object,
    }),
  }

  static defaultProps = {
    routing: {
      query: {},
    },
  }

  render() {
    const { routing } = this.props;
    let filters = {};

    if (routing && routing.query) {
      filters = Object.assign(filters, routing.query);
    }

    return (<WrappedComponent {...this.props} filters={filters} />);
  }
};

export default mapFiltersToProps;

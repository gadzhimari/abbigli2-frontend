import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const omitInvalidData = (object) => {
  const keys = Object.keys(object);
  const newObject = {};

  keys.forEach((key) => {
    if (object[key] !== undefined && object[key] !== '') {
      newObject[key] = object[key];
    }
  });

  return newObject;
};

const mapFiltersToProps = WrappedComponent => class MapFilters extends PureComponent {
  static propTypes = {
    routing: PropTypes.shape({
      query: PropTypes.object,
      pathname: PropTypes.string,
    }),
    router: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  }

  static defaultProps = {
    routing: {
      query: {},
    },
  }

  // This function must be bind in the target class
  // for access to its state
  applyFilters() {
    const { routing, router } = this.props;
    const query = Object.assign({}, routing.query, omitInvalidData(this.state));

    router.push({
      pathname: routing.pathname,
      query,
    });
  }

  render() {
    const { routing } = this.props;
    let filters = {};

    if (routing && routing.query) {
      filters = Object.assign(filters, routing.query);
    }

    return (<WrappedComponent
      {...this.props}
      filters={filters}
      applyFilters={this.applyFilters}
    />);
  }
};

export default mapFiltersToProps;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { updateOptions } from '../ducks/Popup/actions';

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

const mapFiltersToProps = WrappedComponent => class MapFilters extends
Component {
  static propTypes = {
    routing: PropTypes.shape({
      query: PropTypes.object,
      pathname: PropTypes.string,
    }),
    router: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  static defaultProps = {
    routing: {
      query: {},
    },
  }

  constructor(props) {
    super(props);

    const { routing } = props;
    let filters = {};

    if (routing && routing.query) {
      filters = Object.assign(filters, routing.query);
    }

    this.state = filters;
  }

  updateFilter = (event) => {
    event.stopPropagation();

    this.updateFieldByName(
      event.currentTarget.dataset.field,
      event.currentTarget.value || event.currentTarget.dataset.value
    );
  }

  updateFieldByName = (name, value) => {
    this.setState(prevState => this.updateFilterPopupOptions({
      ...prevState,
      [name]: value,
    }));
  }

  applyFilters = () => {
    const { routing, router } = this.props;
    const query = Object.assign({}, omitInvalidData(this.state));

    router.push({
      pathname: routing.pathname,
      query,
    });
  }

  reversePriceRange = () => {
    this.setState({
      price_from: this.state.price_to,
      price_to: this.state.price_from,
    });
  }

  changeFiltersType = ({ target }) => {
    const { router, routing } = this.props;
    const query = Object.assign({}, {
      type: target.getAttribute('data-value'),
      tags: this.state.tags,
    });

    this.setState({
      type: target.getAttribute('data-value'),
    });

    router.push({
      pathname: routing.pathname,
      query,
    });
  }

  updateFilterPopupOptions = (options) => {
    this.props.dispatch(updateOptions({ filters: options }));

    return options;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.routing.query);
  }

  render() {
    return (<WrappedComponent
      {...this.props}
      filters={this.state}
      applyFilters={this.applyFilters}
      updateFilter={this.updateFilter}
      updateFieldByName={this.updateFieldByName}
      reversePriceRange={this.reversePriceRange}
      changeFiltersType={this.changeFiltersType}
    />);
  }
};

export default mapFiltersToProps;

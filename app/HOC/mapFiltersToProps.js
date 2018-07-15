import React, { PureComponent } from 'react';
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

const mapFiltersToProps = WrappedComponent => class MapFilters extends PureComponent {
  static propTypes = {
    router: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  state = {
    ...this.props.query
  };

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
    const { router } = this.props;

    router.push({
      pathname: router.location.pathname,
      query: omitInvalidData(this.state)
    });
  }

  reversePriceRange = () => {
    this.setState({
      price_from: this.state.price_to,
      price_to: this.state.price_from,
    });
  }

  changeFiltersType = ({ target }) => {
    const { router } = this.props;
    const type = target.getAttribute('data-value');

    const query = { type, tags: this.state.tags };
    this.setState({ type });

    router.push({ pathname: router.location.pathname, query });
  }

  updateFilterPopupOptions = (options) => {
    this.props.dispatch(updateOptions({ filters: options }));

    return options;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.query);
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

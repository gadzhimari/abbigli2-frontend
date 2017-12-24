import PropTypes from 'prop-types';
import { Component, Children } from 'react';

import { connect } from 'react-redux';
import { Geo } from '../api';

import { saveCity } from '../ducks/Geo';

class Geolocation extends Component {
  componentDidMount() {
    this.getPosition();
  }

  getPosition = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(this.handleGeoSucces, this.handleGeoError);
    } else {
      this.handleGeoError();
    }
  }

  handleGeoSucces = (data) => {
    this.fetchCityByCoords(data.coords);
  }

  handleGeoError = () => {
    this.fetchCityByCoords(this.props.coordinates);
  }

  fetchCityByCoords = ({ latitude, longitude }) => {
    Geo.getCities({ latitude, longitude })
      .then((res) => {
        const { dispatch } = this.props;

        dispatch(saveCity(res.data.results[0]));
      });
  }

  render() {
    return Children.only(this.props.children);
  }
}

Geolocation.propTypes = {
  children: PropTypes.element.isRequired,
  coordinates: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

Geolocation.defaultProps = {
  coordinates: {},
};

const mapStateToProps = ({ Geo: GeoStore, Auth }) => ({
  coordinates: GeoStore.coordinates,
  isAuthenticated: Auth.isAuthenticated,
  user: Auth.me,
});

export default connect(mapStateToProps)(Geolocation);

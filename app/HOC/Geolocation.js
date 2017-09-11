import PropTypes from 'prop-types';
import { Component, Children } from 'react';

import { connect } from 'react-redux';
import { API_URL } from 'config';
import { saveCity } from 'ducks/Geo';

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
    fetch(`${API_URL}geo/cities/?coords=${latitude},${longitude}`)
      .then(res => res.json())
      .then(({ results }) => {
        this.saveCityToStore(results[0]);
      });
  }

  saveCityToStore = city => this.props
    .dispatch(saveCity(city));

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
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    city: PropTypes.object,
  }).isRequired,
};

const mapStateToProps = ({ Geo, Auth }) => ({
  coordinates: Geo.coordinates,
  isAuthenticated: Auth.isAuthenticated,
  user: Auth.me,
});

export default connect(mapStateToProps)(Geolocation);

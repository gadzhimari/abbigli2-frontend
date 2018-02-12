import { React, Component, B, mix } from '../__base';

const b = B('City');

export default class City extends Component {
  render() {
    const { className, city, showCountry } = this.props;

    if (!city) {
      return null;
    }

    const text = [city.name, showCountry && city.country.name]
      .filter(Boolean).join(', ');

    return (
      <div className={mix(b(), className)}>
        {text}
      </div>
    );
  }
}

import { React, Component, cn } from '../__base';

@cn('City')
class City extends Component {
  render(cn) {
    const { city, showCountry } = this.props;

    if (!city) {
      return null;
    }

    const text = [city.name, showCountry && city.country.name]
      .filter(Boolean).join(', ');

    return (
      <div className={cn()}>
        {text}
      </div>
    );
  }
}

export default City;

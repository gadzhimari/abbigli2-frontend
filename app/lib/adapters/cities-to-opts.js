import store from '../../store/store';

function sortCitiesByUserCountry() {
  const { settlement } = store.getState();
  const userCountryCode = settlement.country.iso_code;

  return (a, b) => {
    if (a.country.code === userCountryCode) {
      return b.country.code === userCountryCode ? 0 : -1;
    }

    return b.country.code === userCountryCode ? 1 : 0;
  };
}

/**
 * Используется для преобразования массива городав в массив опций для Select'a
 * отсортированный по стране пользователя
 * @param {Array} cities
 * @returns {Array}
 */
export default function citiesToOpts(cities) {
  return cities
    .sort(sortCitiesByUserCountry())
    .map(({ id, name, country }) => ({
      label: `${name}, ${country.name}`,
      value: id
    }));
}

import store from '../../store/store';

/**
 * Используется для преобразования массива городав в массив опций для Select'a
 * отсортированный по стране пользователя
 * @param {Array} cities
 * @returns {Array}
 */
export default function citiesToOpts(cities) {
  const { settlement: { country } } = store.getState();
  const userCountryCode = country.iso_code;

  return cities
    .sort((a, b) => {
      if (a.country.code === userCountryCode) {
        return b.country.code === userCountryCode ? 0 : -1;
      }

      return b.country.code === userCountryCode ? 1 : 0;
    })
    .map(city => ({
      label: city.name,
      value: city.id
    }));
}

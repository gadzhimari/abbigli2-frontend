import en from './en_US';
import ru from './ru_RU.js';

const location = process.env.LOCATION;
const langs = {
  en,
  ru,
};

export const __t = str => langs[location][str] || str;

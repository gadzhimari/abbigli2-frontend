export const FORMAT_CHARACTERS = {
  phone: /(?!^\+)[^\d\n]/g,
};

export const INPUT_MASKS = {
  phone: ['+', /\d/, ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
};

import cc from 'currency-codes';

export const parseNumber = (input, currencyCode) => {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: cc.number(currencyCode).code,
  }).format(input / 100);
};

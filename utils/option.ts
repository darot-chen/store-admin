import { currencies } from "~/constants/currencies";

export const getCurrencyByValue = (value: string) => {
  const currency = currencies.find((currency) => currency.value === value);

  if (!currency) {
    return undefined;
  }

  return currency;
};

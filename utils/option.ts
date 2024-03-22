export const getCurrencyByValue = (value?: string) => {
  const currencyStore = useCurrencyStore();
  const currency = currencyStore.options.find(
    (currency) => currency.value === value
  );

  if (!currency) {
    return undefined;
  }

  return currency;
};

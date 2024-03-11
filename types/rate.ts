export type Rate = {
  id: string;
  nickName: string;
  baseCurrency: string;
  quoteCurrency: string;
  price: string;
};

export type RateParams = {
  base_currency: string;
  quote_currency: string;
};

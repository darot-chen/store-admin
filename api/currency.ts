import type { Currency } from "~/types/currency";

export const getAllCurrencies = async (): Promise<Currency[]> => {
  const { data } = await useAxiosInstance().get<Currency[]>("/currencies");
  return data;
};

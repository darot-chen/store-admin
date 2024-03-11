import type { Rate, RateParams } from "~/types/rate";

export const getRate = async (params: RateParams) => {
  const url = "p2p";
  const { data } = await useAxiosInstance().get<Rate[]>(url, {
    params,
  });

  return data;
};

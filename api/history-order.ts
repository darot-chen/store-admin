import type { HistoryOrder, HistoryOrderParams } from "~/types/history-order";
import type { CursorResponse } from "~/types/pagination";

export const getHistoryOrders = async (params: HistoryOrderParams) => {
  const { data } = await useAxiosInstance().get<CursorResponse<HistoryOrder[]>>(
    `orders`,
    {
      params,
    }
  );

  return data;
};

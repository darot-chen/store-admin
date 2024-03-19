import type { APIMeta } from "~/types/base";
import type {
  CreateOrder,
  GetOrderParams,
  Order,
  OrderDetail,
  RateSeller,
} from "~/types/order";
import type { CursorResponse } from "~/types/pagination";

const url = "orders";

export const createExchangeOrder = async (payload: CreateOrder) => {
  const { data } = await useAxiosInstance().post<Order>(
    `${url}/exchange`,
    payload
  );

  return data;
};

export const createOrder = async (payload: CreateOrder) => {
  const { data } = await useAxiosInstance().post<Order>(`${url}`, payload);

  return data;
};

export const confirmOrder = async (orderId: number) => {
  const { data } = await useAxiosInstance().put<APIMeta>(
    `${url}/${orderId}/confirm`
  );

  return data;
};

export const buyerRejectOrder = async (orderId: number) => {
  const { data } = await useAxiosInstance().post<APIMeta>(
    `${url}/${orderId}/reject`
  );

  return data;
};

export const sellerCancelOrder = async (orderId: number) => {
  const { data } = await useAxiosInstance().delete<APIMeta>(
    `${url}/${orderId}`
  );

  return data;
};

export const confirmPayment = async (orderId: number) => {
  const { data } = await useAxiosInstance().put<APIMeta>(
    `${url}/payments/${orderId}/confirm`
  );

  return data;
};

export const completeOrder = async (orderId: number) => {
  const { data } = await useAxiosInstance().post<APIMeta>(
    `${url}/${orderId}/complete`
  );

  return data;
};

export const getOrdersPayment = async (id: number, params: GetOrderParams) => {
  const { data } = await useAxiosInstance().get<CursorResponse<OrderDetail[]>>(
    `${url}/${id}/payments`,
    {
      params,
    }
  );

  return data;
};

export const reviseOrder = async (orderId: number, payload: CreateOrder) => {
  const { data } = await useAxiosInstance().put<Order>(
    `${url}/${orderId}`,
    payload
  );

  return data;
};

export const rateSeller = async (orderId: number, payload: RateSeller) => {
  const { data } = await useAxiosInstance().post<APIMeta>(
    `${url}/${orderId}/rate-seller`,
    payload
  );

  return data;
};

export const getOrderDetail = async (
  orderId: number,
  params: GetOrderParams
) => {
  const { data } = await useAxiosInstance().get<Order>(`${url}/${orderId}`, {
    params,
  });

  return data;
};

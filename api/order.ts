import type { APIMeta } from "~/types/base";
import type { CreateOrder, Order } from "~/types/order";

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

export const confirmPayment = async (orderId: number) => {
  const { data } = await useAxiosInstance().put<APIMeta>(
    `${url}/payments/${orderId}/confirm`
  );

  return data;
};

import type { APIMeta } from "~/types/base";
import type { ConfirmOrder, CreateOrder, Order } from "~/types/order";

const url = "orders";

export const createOrder = async (payload: CreateOrder) => {
  const { data } = await useAxiosInstance().post<Order>(`${url}`, payload);

  return data;
};

export const confirmOrder = async (orderId: number, payload: ConfirmOrder) => {
  const { data } = await useAxiosInstance().put<APIMeta>(
    `${url}/${orderId}/confirm`,
    payload
  );

  return data;
};

export const confirmPayment = async (orderId: number) => {
  const { data } = await useAxiosInstance().put<APIMeta>(
    `${url}/payments/${orderId}/confirm`
  );

  return data;
};

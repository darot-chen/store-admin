import type { APIMeta } from "~/types/base";
import type { CreateOrder } from "~/types/order";

const url = "orders";

export const createOrder = async (payload: CreateOrder) => {
  const { data } = await useAxiosInstance().post<APIMeta>(`${url}`, payload);

  return data;
};

export const confirmOrder = async (roomID: number) => {
  const { data } = await useAxiosInstance().put<APIMeta>(
    `${url}/${roomID}/confirm`
  );

  return data;
};

export const confirmPayment = async (roomID: number) => {
  const { data } = await useAxiosInstance().put<APIMeta>(
    `${url}/payments/${roomID}/confirm`
  );

  return data;
};

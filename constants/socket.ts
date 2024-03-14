export enum SOCKET_EVENT {
  NEW_CHAT_RECEIVED = "new_chat_received",
  ORDER_PAYMENT_CONFIRMED = "order_payment_confirmed",
  ORDER_STATUS_UPDATED = "order_status_updated",
}

export const IsValidSocketEvent = (str: string | SOCKET_EVENT): boolean => {
  return Object.values(SOCKET_EVENT).includes(str as SOCKET_EVENT);
};

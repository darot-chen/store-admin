export const formatOrderId = (orderId: number) => {
  return `BS${orderId.toString().padStart(6, "0")}`;
};

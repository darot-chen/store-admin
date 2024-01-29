export type CreateOrder = {
  currency_id: number;
  buyer_id: number;
  quantity: number;
  rate: number;
  chat_room_id: number;
  remark?: string;
  total_commission?: number;
  service_fee?: number;
};

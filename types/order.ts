export enum OrderStatus {
  FAILED = "failed",
  SUCCESS = "success",
  CONFIRMING = "confirming",
  PROCESSING = "processing",
}

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

export type ConfirmOrder = {
  currency_id: number;
  buyer_id: number;
  quantity: number;
  rate: number;
};

export type Order = {
  id: number;
  created_at: string;
  updated_at?: string;
  deleted_at?: string;
  business_id: number;
  chat_room_id: number;
  seller_id: number;
  buyer_id: number;
  currency_id: number;
  status: OrderStatus;
  quantity: number;
  quantity_given: number;
  rate: number;
  whatever_rate?: number;
  price: number;
  amount_paid: number;
  buyer_commission_percentage: number;
  seller_commission_percentage: number;
  total_commission_amount: number;
  other_expense: number;
  note?: string;
  seller_confirmed_at?: string;
  buyer_confirmed_at?: string;
};

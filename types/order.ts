export enum OrderStatus {
  FAILED = "failed",
  SUCCESS = "success",
  CONFIRMING = "confirming",
  PROCESSING = "processing",
}

export type CreateOrder = {
  chat_room_id: number;
  currency_id: number;
  buyer_id: number;
  quantity_to_be_given: number;
  exchange_rate: number;
  handling_fee_percentage: number;
  buyer_pay_commission: boolean;
  other_expense: number;
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
  quantity_to_be_given: number;
  quantity_given: number;
  exchange_rate: number;
  handling_fee_percentage: number;
  amount_paid: number;
  buyer_commission_percentage: number;
  seller_commission_percentage: number;
  total_commission: number;
  other_expense: number;
  buyer_guaranteed_amount?: number;
  buyer_guaranteed_currency_id?: number;
  seller_guaranteed_amount?: number;
  seller_guaranteed_currency_id?: number;
  note?: string;
  seller_confirmed_at?: string;
  buyer_confirmed_at?: string;
};

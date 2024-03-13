import type { Cursor } from "./common";
import type { Currency } from "./currency";

export enum OrderStatus {
  FAILED = "failed",
  SUCCESS = "success",
  CONFIRMING = "confirming",
  PROCESSING = "processing",
}

export type CreateOrder = {
  chat_room_id: number;
  seller_currency_id: number;
  buyer_currency_id: number;
  buyer_id: number;
  amount: number;
  exchange_rate: number;
  handling_fee_percentage: number;
  commission_type: "buyer" | "seller" | "both";
  other_expense: number;
  duration?: string;
  note?: string;
  title?: string;
};

export type GetOrderParams = Cursor & {
  party: string;
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
  amount_to_be_paid: number;
  buyer_commission_percentage: number;
  seller_commission_percentage: number;
  total_commission: number;
  total_seller_payments: number;
  total_buyer_payments: number;
  other_expense: number;
  buyer_guaranteed_amount?: number;
  buyer_guaranteed_currency_id?: number;
  seller_guaranteed_amount?: number;
  seller_guaranteed_currency_id?: number;
  note?: string;
  seller_confirmed_at?: string;
  buyer_confirmed_at?: string;
  seller_completed_at?: string;
  buyer_completed_at: string;
  buyer_currency?: Currency;
  seller_currency: Currency;
};

export type OrderDetail = {
  id: number;
  created_at: string;
  updated_at?: string;
  order_id: number;
  user_id: number;
  chat_message_id: number;
  status: string;
  quantity_given: number;
  amount_paid?: number;
};

export type OrderPaymentConfirmedType = {
  order: Order;
  orderPayment: OrderDetail;
};

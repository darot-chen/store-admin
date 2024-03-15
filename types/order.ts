import type { Cursor } from "./common";
import type { Currency } from "./currency";

export enum OrderStatus {
  FAILED = "failed",
  SUCCESS = "success",
  CONFIRMING = "confirming",
  PROCESSING = "processing",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
}

export enum CommissionType {
  BUYER = "buyer",
  SELLER = "seller",
  BOTH = "both",
}

export type CreateOrder = {
  chat_room_id: number;
  seller_currency_id: number;
  buyer_currency_id: number;
  buyer_id: number;
  amount: number;
  exchange_rate: number;
  handling_fee_percentage: number;
  commission_type: CommissionType;
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
  created_at: Date;
  updated_at: Date;
  deleted_at: string | null;
  business_id: number;
  chat_room_id: number;
  seller_id: number;
  buyer_id: number;
  seller_currency_id: number;
  buyer_currency_id: number;
  status: OrderStatus;
  title: string;
  duration: string | null;
  commission_paid_by: CommissionType;
  note: string | null;
  deadline_at: string | null;
  amount: number;
  amount_to_be_paid: number;
  amount_paid: number;
  quantity_to_be_given: number;
  quantity_given: number;
  base_currency: string;
  quote_currency: string;
  commission_type: CommissionType;
  buyer_commission_percentage: number;
  seller_commission_percentage: number;
  total_commission: number;
  handling_fee_percentage: number;
  exchange_rate: number;
  other_expense: number;
  seller_confirmed_at: Date;
  buyer_confirmed_at: string | null;
  seller_completed_at: string | null;
  buyer_completed_at: string | null;
  seller_currency: Currency;
  buyer_currency: Currency;
  total_seller_payments: number;
  total_buyer_payments: number;
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

export type RateSeller = {
  score: number;
  comment: string;
};

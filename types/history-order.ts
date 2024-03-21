import type { Business } from "./business";
import type { ChatRoom } from "./chatRoom";
import type { Cursor } from "./common";
import type { User } from "./user";

export enum OrderStatusEnum {
  CONFIRMING = "confirming",
  PROCESSING = "processing",
  SUCCESS = "success",
  FAILED = "failed",
}

export type OrderStatusType =
  | OrderStatusEnum.CONFIRMING
  | OrderStatusEnum.PROCESSING
  | OrderStatusEnum.SUCCESS
  | OrderStatusEnum.FAILED;

export type HistoryOrder = {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  business_id: number;
  chat_room_id: number;
  seller_id: number;
  buyer_id: number;
  seller_currency_id: number;
  buyer_currency_id: number;
  status: OrderStatusType;
  title: string;
  duration?: string;
  commission_paid_by: string;
  note: string;
  deadline_at?: string;
  amount: number;
  amount_to_be_paid: number;
  amount_paid: number;
  quantity_to_be_given: number;
  quantity_given: number;
  base_currency: string;
  quote_currency: string;
  commission_type: string;
  buyer_commission_percentage: number;
  seller_commission_percentage: number;
  total_commission: number;
  handling_fee_percentage: number;
  exchange_rate: number;
  other_expense: number;
  seller_confirmed_at?: string;
  buyer_confirmed_at?: string;
  seller_completed_at?: string;
  buyer_completed_at?: string;
  business: Business;
  seller: User;
  chat_room: ChatRoom;
  has_dispute: boolean;
};

export type HistoryOrderParams = Cursor & {
  has_dispute?: boolean;
  status?: OrderStatusEnum;
  keyword?: string;
  start_date?: string;
  end_date?: string;
};

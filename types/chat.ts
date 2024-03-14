import type { SupportTicket } from "./support-ticket";
import type { Admin } from "./admin";
import type { Business } from "./business";
import type { ChatRoomType } from "./chatRoom";
import type { Order } from "./order";
import type { User } from "./user";
import type { Cursor } from "./common";

export enum ChatType {
  Image = "image",
  Video = "video",
  Action = "action",
  Text = "text",
}

export type GetMessagePayload = Cursor & {
  query: string;
};

export type GetChatMessageByIdPayload = Cursor & {
  msgId: number;
};

export type Chat = {
  id: number;
  created_at: string;
  chat_room_id: number;
  admin_id?: number;
  user_id: number;
  order_id?: number;
  type: ChatType;
  message: string;
  user: User | null;
  admin: Admin | null;
  order?: Order;
};

export type ChatDetail = {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  owner_id: number;
  business_id: number;
  type: ChatRoomType;
  closed_at: string;
  business?: Business;
  lobby_no: number;
  is_a_member: boolean;
  support_ticket?: SupportTicket;
  order?: Order;
};

export type Member = {
  id: number;
  created_at: string;
  chat_room_id: number;
  admin_id: number | null;
  user_id: number | null;
  user?: User;
  admin?: Admin;
};

type Owner = {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  type: string;
  name: string;
  username: string;
  tg_username: string;
  rating_score: number;
  rating_count: number;
  user_id: string;
};

type ChatBusiness = {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  owner_id: number;
  category_id: number;
  currency_id: number;
  title: string;
  description: string;
  status: string;
  commission: number;
  total_fund: number;
  available_fund: number;
  frozen_fund: number;
  group_ref_id: string;
  group_tg_id: string;
  group_type: string;
};

type ChatRoom = {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  owner_id: number;
  business_id: number;
  type: string;
  closed_at: null;
  owner: Owner;
  business: ChatBusiness;
  latest_message_id: number;
  current_order_id: number;
  lobby_no: number;
  order: string;
};

export type ChatMessage = {
  id: number;
  created_at: Date;
  chat_room_id: number;
  admin_id: string;
  user_id: number;
  type: string;
  message: string;
  order_id: string;
  chat_room: ChatRoom;
};

import type { Admin } from "./admin";
import type { Business } from "./business";
import type { ChatRoomType } from "./chatRoom";
import type { Order } from "./order";
import type { User } from "./user";

export enum ChatType {
  Image = "image",
  Video = "video",
  Action = "action",
  Text = "text",
}

export type Chat = {
  id: number;
  created_at: string;
  chat_room_id: number;
  admin_id?: number;
  user_id: number;
  type: ChatType;
  message: string;
  user: User | null;
  admin: Admin | null;
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
  is_a_member: boolean;
  order: Order;
};

export type Member = {
  id: number;
  created_at: string;
  chat_room_id: number;
  admin_id: number | null;
  user_id: number | null;
  user: User;
};

import type { Business } from "./business";
import type { Chat } from "./chat";
import type { User } from "./user";

export enum ChatRoomType {
  PUBLIC = "public",
  PRIVATE = "private",
}

export type ChatRoom = {
  id: number;
  created_at: string;
  updated_at: string;
  owner_id: number;
  business_id: number;
  title: string;
  type: ChatRoomType;
  closed_at: string;
  lobby_no: number;
  business: Business;
  chat_messages: Chat[];
  latest_message: Chat;
  owner: User;
  total_unread: number;
};

export type CursorChatRoomPayload = {
  limit?: number;
  last?: number;
  keyword?: string;
};

import type { Business } from "./business";

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
  type: ChatRoomType;
  closed_at: string;
  lobby_no: number;
  business: Business;
};

export type CursorChatRoomPayload = {
  limit?: number;
  last?: number;
};

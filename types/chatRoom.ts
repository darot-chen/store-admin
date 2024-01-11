import { Business } from "./business";

export type ChatRoom = {
  id: number;
  created_at: string;
  updated_at: string;
  owner_id: number;
  business_id: number;
  type: string;
  closed_at: string;
  business: Business;
};

export type CursorChatRoomPayload = {
  limit?: number;
  last?: number;
};

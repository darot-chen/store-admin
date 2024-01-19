import { Admin } from "./admin";
import { Business } from "./business";
import { User } from "./user";

export type Chat = {
  id: number;
  created_at: string;
  chat_room_id: number;
  admin_id?: number;
  user_id: number;
  type: string;
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
  type: string;
  closed_at: string;
  business: Business;
  is_a_member: boolean;
};

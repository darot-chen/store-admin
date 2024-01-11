import { User } from "./user";
import { Admin } from "./admin";

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

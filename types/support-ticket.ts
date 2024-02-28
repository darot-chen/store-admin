export type SupportTicket = {
  id: number;
  created_at: string | null;
  updated_at: string | null;
  chat_room_id: number;
  user_id: number;
  handled_by_admin_id: null;
  order_id: number;
  status: string;
  handled_at: string | null;
  closed_at: string | null;
};

import type { User } from "./user";

export type Business = {
  id: number;
  created_at: string;
  updated_at: string;
  owner_id: number;
  category_id: number;
  currency_id: number;
  title: string;
  description: string;
  status: string;
  total_fund: number;
  available_fund: number;
  owner: User;
  commission: number;
};

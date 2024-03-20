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
  handling_fee_percentage: number | null;
  exchange_rate: number | null;
  other_fee: number | null;
  default_currency: string | null;
};

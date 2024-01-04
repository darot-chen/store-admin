import { APIMeta } from "./base";

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
};

export type CursorMeta = {
  cursor?: string;
  limit?: number;
  hasNext: boolean;
};

export type PaginationPayload = {
  page?: number;
  limit?: number;
};

export type CursorPayload = {
  cursor?: string;
  limit?: number;
};

export type PaginationResponse<T> = APIMeta<T> & {
  meta: PaginationMeta;
};

export type CursorResponse<T> = APIMeta<T> & {
  meta: CursorPayload;
};

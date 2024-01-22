export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

/**
 * any response from api must be in this format
 */

export type CursorPaginationMeta = {
  cursor?: string;
  limit?: number;
  hasNext?: boolean;
};

export type APIMeta<T = any> = {
  data: { id: number; name: string; type: string; value: string };
  code: number;
  message: string;
  results: T;
  meta: CursorPaginationMeta;
};

export type CursorPaginationResponse<T = any> = APIMeta<T> & {
  meta: CursorPaginationMeta;
};

export enum SocketChannel {
  ODD_CHANGED = "oddChanged",
}

export enum SocketType {
  PUBLISH = "publish",
  EVENT = "event",
}

export type SocketMessageData<T = any> = {
  type: SocketType;
  channel: SocketChannel;
  event: string;
  data: T;
};

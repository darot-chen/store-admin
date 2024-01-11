import { useApiFetch } from "~/composables/useAPIFetch";
import { APIMeta, HTTPMethod } from "~/types/base";
import { ChatRoom, CursorChatRoomPayload } from "~/types/chatRoom";
import { CursorResponse } from "~/types/pagination";

export const API_CHAT_ROOM = {
  GET_PUBLIC_ROOM: {
    path: (last?: number, limit?: number) =>
      `/chat-rooms?type=public${last ? `&last=${last}` : ""}${
        limit ? `&limit=${limit}` : ""
      }`,
    method: HTTPMethod.GET,
    body: (value: CursorChatRoomPayload) => value,
    execute(body: CursorChatRoomPayload) {
      return useApiFetch<CursorResponse<ChatRoom[]>>(
        this.path(body?.last, body.limit),
        {
          method: this.method,
          key: "chatRoom/Public",
        }
      );
    },
  },
  JOIN_PUBLIC_ROOM: {
    path: (roomID: number) => `/chat-rooms/${roomID}/join`,
    method: HTTPMethod.POST,
    execute(roomID: number) {
      return useApiFetch<APIMeta>(this.path(roomID), {
        method: this.method,
        key: "joinPublicRoom",
      });
    },
  },
} as const;

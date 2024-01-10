import { useApiFetch } from "~/composables/useAPIFetch";
import { HTTPMethod } from "~/types/base";
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
} as const;

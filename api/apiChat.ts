import { useApiFetch } from "~/composables/useAPIFetch";
import { HTTPMethod } from "~/types/base";
import { Chat } from "~/types/chat";
import { CursorChatRoomPayload } from "~/types/chatRoom";
import { CursorResponse } from "~/types/pagination";

export const API_CHAT = {
  GET_CHAT_MSG: {
    path: (roomID: number, last?: number, limit?: number) =>
      `/chat-rooms/${roomID}/chats?${last ? `&last=${last}` : ""}${
        limit ? `&limit=${limit}` : ""
      }`,
    method: HTTPMethod.GET,
    body: (value: CursorChatRoomPayload) => value,
    execute(roomID: number, body: CursorChatRoomPayload) {
      return useApiFetch<CursorResponse<Chat[]>>(
        this.path(roomID, body?.last, body.limit),
        {
          method: this.method,
          key: "chat",
        }
      );
    },
  },
  ADD_TEXT_CHAT: {
    path: (roomID: number) => `/chat-rooms/${roomID}/chat`,
    method: HTTPMethod.POST,
    body: (value: string) => ({
      message: value,
    }),
    execute(roomID: number, message: string) {
      return useApiFetch<Chat>(this.path(roomID), {
        method: this.method,
        key: "add_text_chat",
        body: this.body(message),
      });
    },
  },
  ADD_IMAGE_CHAT: {
    path: (roomID: number) => `/chat-rooms/${roomID}/image`,
    method: HTTPMethod.POST,
    body: (file: File) => {
      const payload = new FormData();
      payload.append("image", file);
      return payload;
    },
    execute(roomID: number, file: File) {
      return useApiFetch<Chat>(this.path(roomID), {
        method: this.method,
        key: "add_image_chat",
        body: this.body(file),
      });
    },
  },
  ADD_VIDEO_CHAT: {
    path: (roomID: number) => `/chat-rooms/${roomID}/video`,
    method: HTTPMethod.POST,
    body: (file: File) => {
      const payload = new FormData();
      payload.append("video", file);
      return payload;
    },
    execute(roomID: number, file: File) {
      return useApiFetch<Chat>(this.path(roomID), {
        method: this.method,
        key: "add_video_chat",
        body: this.body(file),
      });
    },
  },
} as const;

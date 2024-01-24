import type { APIMeta } from "~/types/base";
import type { Chat, ChatDetail } from "~/types/chat";
import type { ChatRoom } from "~/types/chatRoom";
import type { Cursor } from "~/types/common";
import type { CursorResponse } from "~/types/pagination";

const url = "/chat-rooms";

export const getPublicChatRoom = async (type: string, params: Cursor) => {
  const { data } = await useAxiosInstance().get<CursorResponse<ChatRoom[]>>(
    `${url}/${type}`,
    {
      params,
    }
  );

  return data;
};

export const joinPublicChatRoom = async (roomID: number) => {
  const { data } = await useAxiosInstance().post<APIMeta>(
    `${url}/${roomID}/join`
  );

  return data;
};

export const getChat = async (roomID: number, params: Cursor) => {
  const { data } = await useAxiosInstance().get<CursorResponse<Chat[]>>(
    `${url}/${roomID}/chats`,
    {
      params,
    }
  );

  return data;
};

export const getChatDetail = async (roomID: number) => {
  const { data } = await useAxiosInstance().get<ChatDetail>(`${url}/${roomID}`);

  return data;
};

export const addChat = async (roomID: number, message: string) => {
  const { data } = await useAxiosInstance().post<Chat>(
    `${url}/${roomID}/chat`,
    {
      message,
    }
  );

  return data;
};

export const uploadImage = async (roomID: number, file: File) => {
  const formatData = new FormData();
  formatData.append("image", file);

  const { data } = await useAxiosInstance().postForm<Chat>(
    `${url}/${roomID}/image`,
    formatData
  );

  return data;
};

export const uploadVideo = async (roomID: number, file: File) => {
  const payload = new FormData();
  payload.append("video", file);

  const { data } = await useAxiosInstance().postForm<Chat>(
    `${url}/${roomID}/video`,
    payload
  );

  return data;
};

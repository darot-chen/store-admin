import type { APIMeta } from "~/types/base";
import type {
  Chat,
  ChatDetail,
  ChatMessage,
  GetMessagePayload,
  Member,
} from "~/types/chat";
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

export const joinPublicChatRoom = async (roomId: number) => {
  const { data } = await useAxiosInstance().post<APIMeta>(
    `${url}/${roomId}/join`
  );

  return data;
};

export const getChat = async (roomId: number, params: Cursor) => {
  const { data } = await useAxiosInstance().get<CursorResponse<Chat[]>>(
    `${url}/${roomId}/chats`,
    {
      params,
    }
  );

  return data;
};

export const getChatMessageById = async (roomId: string) => {
  try {
    const { data } = await useAxiosInstance().get<Chat>(
      `chat-messages/${roomId}`
    );

    return data;
  } catch (error) {
    return undefined;
  }
};

export const getChatDetail = async (roomId: number) => {
  const { data } = await useAxiosInstance().get<ChatDetail>(`${url}/${roomId}`);

  return data;
};

export const addChat = async (
  roomId: number,
  message: string,
  replyMsgId?: number
) => {
  const { data } = await useAxiosInstance().post<Chat>(
    `${url}/${roomId}/chat`,
    {
      message,
      reply_message_id: replyMsgId,
    }
  );

  return data;
};

export const uploadImage = async (roomId: number, file: File) => {
  const formatData = new FormData();
  formatData.append("image", file);

  const { data } = await useAxiosInstance().postForm<Chat>(
    `${url}/${roomId}/image`,
    formatData
  );

  return data;
};

export const uploadVideo = async (roomId: number, file: File) => {
  const payload = new FormData();
  payload.append("video", file);

  const { data } = await useAxiosInstance().postForm<Chat>(
    `${url}/${roomId}/video`,
    payload
  );

  return data;
};

export const getChatRoomMembers = async (roomId: number) => {
  const { data } = await useAxiosInstance().get<Member[]>(
    `${url}/${roomId}/members`
  );

  return data;
};

export const requestSupport = async (roomId: number, orderId: number) => {
  const { data } = await useAxiosInstance().post<APIMeta>(
    `${url}/${roomId}/orders/${orderId}/support`
  );

  return data;
};

export const getChatMessages = async (params: GetMessagePayload) => {
  const { data } = await useAxiosInstance().get<CursorResponse<ChatMessage[]>>(
    "chat-messages",
    {
      params,
    }
  );

  return data;
};

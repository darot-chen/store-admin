export type UserState = {
  id?: number;
  username?: string;
  nickname?: string;
  phoneNumber?: string;
  balance?: number;
  blocking?: number;
  type?: string;
  creditAmount?: number;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type FinalRegisterFormState = {
  username: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  username: string;
  phoneNumber: string;
  token: string;
};

export type OnlineUserResponse = {
  onlineUsers: number;
};

type UserRespone = {
  phoneNumber: string;
  password: string;
  refCode?: string;
};

export type RegisterSendOTPRespone = {
  sessionId: string;
  user: UserRespone;
  refCode?: string;
};

export type RegisterSendOTPPayload = {
  phoneNumber: string;
  password: string;
};

export type RegisterVerifyCodePayload = {
  sessionId: string;
  verifyCode: string;
  phoneNumber: string;
  password: string;
  refCode?: string;
};

export type RegisterPayload = {
  sessionId: string;
  phoneNumber: string;
  password: string;
  refCode: string;
};

export type NormalRegisterPayload = {
  phoneNumber: string;
  password: string;
  refCode: string;
};

export type VerifyCodeRepsone = {
  id: number;
  phoneNumber: string;
  sessionId: string;
};

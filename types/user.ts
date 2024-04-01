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

export type User = {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  type: string;
  name: string;
  username: string;
  rating_score: number;
  rating_count: number;
  profile_key: string;
  business_name?: string;
  business_profile_key?: string;
  last_viewed_page?: string;
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

export type LoginViaMiniAppResponse = {
  token: string;
  start_action: any;
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

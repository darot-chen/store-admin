import { APIMeta, HTTPMethod } from "~/types/base";
import {
  LoginPayload,
  LoginResponse,
  NormalRegisterPayload,
  RegisterSendOTPPayload,
  RegisterSendOTPRespone,
  RegisterVerifyCodePayload,
} from "~/types/user";

export const API_AUTH = {
  LOGIN: {
    method: HTTPMethod.POST,
    path: () => "/auth/login",
    body: (value: LoginPayload) => value,
    execute(body: LoginPayload) {
      return useApiFetch<APIMeta<LoginResponse>>(this.path, {
        method: this.method,
        body: this.body(body),
      });
    },
  },
  REGISTER: {
    method: HTTPMethod.POST,
    path: (refCode?: string) =>
      `/auth/register${refCode && `?refCode=${refCode}`}`,
    body: (value: NormalRegisterPayload) => value,
    execute(body: NormalRegisterPayload) {
      return useApiFetch<APIMeta<LoginResponse>>(this.path(body?.refCode), {
        method: this.method,
        body: this.body(body),
      });
    },
  },
  REGISTER_SEND_OTP: {
    method: HTTPMethod.POST,
    path: () => "/v1/auth/register/sendOtp",
    body: (value: RegisterSendOTPPayload) => value,
    execute(body: RegisterSendOTPPayload) {
      return useApiFetch<APIMeta<RegisterSendOTPRespone>>(this.path, {
        method: this.method,
        body: this.body(body),
      });
    },
  },
  REGISTER_VERYFY_CODE: {
    method: HTTPMethod.POST,
    path: () => "/v1/auth/register/verifyCode",
    body: (value: RegisterVerifyCodePayload) => value,
    execute(body: RegisterVerifyCodePayload) {
      return useApiFetch<APIMeta>(this.path, {
        method: this.method,
        body: this.body(body),
      });
    },
  },
} as const;

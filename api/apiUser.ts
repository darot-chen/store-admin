import { APIMeta, HTTPMethod } from "~/types/base";
import { ChangePasswordPayload } from "~/types/changePassword";
import { LoginResponse, OnlineUserResponse } from "~/types/user";

export const API_USER = {
  ME: {
    path: () => "v1/users/me",
    method: HTTPMethod.GET,
    execute() {
      return useApiFetch<APIMeta<LoginResponse>>(this.path, {
        method: this.method,
      });
    },
  },
  GET_ONLINE_USERS: {
    path: () => "v1/users/onlineUsers",
    method: HTTPMethod.GET,
    execute() {
      return useApiFetch<APIMeta<OnlineUserResponse>>(this.path, {
        method: this.method,
        key: "onlineUsers",
      });
    },
  },
  CHANGE_PASSWORD: {
    path: () => "v1/users/me/change-password",
    method: HTTPMethod.PUT,
    body: (value: ChangePasswordPayload) => value,
    execute(body: ChangePasswordPayload) {
      return useApiFetch<APIMeta>(this.path, {
        method: this.method,
        body: this.body(body),
      });
    },
  },
} as const;

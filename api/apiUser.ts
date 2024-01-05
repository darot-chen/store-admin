import { APIMeta, HTTPMethod } from "~/types/base";
import { LoginResponse } from "~/types/user";

export const API_USER = {
  ME: {
    path: () => "auth/me",
    method: HTTPMethod.GET,
    execute() {
      return useApiFetch<APIMeta<LoginResponse>>(this.path, {
        method: this.method,
      });
    },
  },
} as const;

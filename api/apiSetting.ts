import { useApiFetch } from "~/composables/useAPIFetch";
import { APIMeta, HTTPMethod } from "~/types/base";
import { SettingType } from "~/types/setting";

export const API_SETTING = {
  GET_HOME_BANNER: {
    path: () => "/v1/settings/homeBanner",
    method: HTTPMethod.GET,
    execute() {
      return useApiFetch<APIMeta<SettingType>>(this.path, {
        method: this.method,
        key: "settings/homeBanner",
      });
    },
  },
} as const;

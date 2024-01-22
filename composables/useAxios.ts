/* eslint-disable require-await */
/* eslint-disable prefer-promise-reject-errors */

import axios from "axios";

import { storage } from "~/utils/storage";

type IOptionConfig = {
  contentType: string;
};

export const useAxiosInstance = () => {
  const configOption: IOptionConfig = {
    contentType: "application/json; charset=utf-8",
  };

  const createApi = (options: IOptionConfig = configOption) => {
    const instance = axios.create({
      baseURL: usePublicEnv().baseApi,
      headers: { "Content-Type": options.contentType },
    });

    instance.interceptors.request.use((config) => {
      const token = storage.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      const { $i18n } = useNuxtApp();
      config.headers["Accept-Language"] = $i18n.locale.value;

      return config;
    });

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const { $i18n } = useNuxtApp();
        if (error.code === "ERR_NETWORK") {
          return Promise.reject({
            ...error,
            message: $i18n.t("error.err_network"),
          });
        }

        const isUnauthorized = error.response?.status === 401;
        if (isUnauthorized) {
          storage.clearAccessToken();
          navigateTo({
            path: "/",
            query: {
              message: error.response?.data?.message,
            },
          });
          return Promise.reject(undefined);
        }

        return Promise.reject({
          ...error,
          message:
            error.response?.data?.message ||
            error.response?.message ||
            error.message,
        });
      }
    );

    return instance;
  };

  const axiosInstance = createApi();

  return axiosInstance;
};

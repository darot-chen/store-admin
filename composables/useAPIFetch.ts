import { showToast } from "vant";

export type useFetchType = typeof useFetch;

const modifyHeader = (headers = new Headers()) => {
  const token = storage.getAccessToken();

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return headers;
};

const notShowingErrCode = [-505, -807, -808, -809, -813];

const useApiFetchUnified: useFetchType = (path, options = {}) => {
  const { $i18n } = useNuxtApp();
  const { t } = $i18n;
  const router = useRouter();
  return useFetch(path, {
    onResponseError({ response }) {
      if (response._data.code === -5) {
        router.replace("/login");
      }

      if (
        !response._data.message.includes("not found") &&
        !notShowingErrCode.includes(response._data.code)
      ) {
        showToast({
          message: t(`error.${response._data.code}`),
          position: "bottom",
        });
      }
    },
    onRequest: ({ options }) => {
      options.headers = modifyHeader(new Headers(options.headers));
    },
    ...options,
  });
};

// wrap useFetch with configuration needed to talk to our API
export const useApiFetch: useFetchType = (path, options = {}) => {
  const config = useRuntimeConfig();
  options.baseURL = config.public.baseApi;
  return useApiFetchUnified(path, options);
};

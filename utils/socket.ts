export function getWebSocketUrl() {
  let protocol = "ws";

  const { $i18n } = useNuxtApp();
  const { getLocaleCookie } = $i18n;
  const locale = getLocaleCookie();

  const config = useRuntimeConfig();
  if (config.public.baseApi.includes("https")) {
    protocol = "wss";
  }

  const url = config.public.baseApi
    .replace("https://", "")
    .replace("http://", "");

  const token = storage.getAccessToken();
  const encoded = btoa(token || "");
  if (!encoded) return;

  return `${protocol}://${url}/ws?at=${encoded}&lang=${locale}`;
}

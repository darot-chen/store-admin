export const TOKEN_KEY = "auth-token";

const isLogin = () => !!useCookie(TOKEN_KEY).value;
const getToken = () => useCookie(TOKEN_KEY).value;
const setToken = (token: string) => (useCookie(TOKEN_KEY).value = token);
const clearToken = () => (useCookie(TOKEN_KEY).value = null);

export {
  isLogin,
  getToken,
  setToken,
  clearToken,
  setRefCode,
  getRefCode,
  clearRefCode,
};

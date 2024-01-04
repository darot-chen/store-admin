export default defineNuxtRouteMiddleware((to) => {
  const isLogin = !!useCookie(TOKEN_KEY).value;

  if (isLogin) {
    if (to.name === "login") {
      return navigateTo("/");
    }
  } else if (to.path !== "/login" && !to.path.includes("/register")) {
    return navigateTo({
      path: "/login",
      query: { redirect: to.path },
    });
  }
});

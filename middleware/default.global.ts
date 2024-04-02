import { saveLastSession } from "~/api/user";

export default defineNuxtRouteMiddleware((to) => {
  if (to.path === "/") return;
  if (storage.getAccessToken()) {
    saveLastSession(to.fullPath);
  }
});

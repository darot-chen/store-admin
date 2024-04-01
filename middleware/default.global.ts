import { saveLastSession } from "~/api/user";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  if (storage.getAccessToken() && authStore.user?.last_viewed_page) {
    saveLastSession(to.fullPath);
  }
});

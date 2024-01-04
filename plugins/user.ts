import useUserStore from "~/stores/userStore";

export default defineNuxtPlugin(() => {
  const userStore = useUserStore();
  if (isLogin() && !userStore.data.id) {
    userStore.me();
  }
});

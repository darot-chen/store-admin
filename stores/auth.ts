import { showFailToast } from "vant";
import { getMe } from "~/api/user";
import type { User } from "~/types/user";

export const useAuthStore = defineStore({
  id: "auth-store",
  state: () => ({
    user: undefined as User | undefined,
  }),
  actions: {
    async getUser() {
      try {
        this.user = await getMe();
      } catch (e: any) {
        showFailToast(e?.message);
      }
    },
  },
});

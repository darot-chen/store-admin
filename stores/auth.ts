import { showFailToast } from "vant";
import { getMe } from "~/api/user";
import { User } from "~/types/user";

export const useAuthStore = defineStore({
  id: "user",
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

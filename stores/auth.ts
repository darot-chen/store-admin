import { showFailToast } from "vant";
import { getMe } from "~/api/user";
import type { Option } from "~/types/common";
import type { User } from "~/types/user";

export const useAuthStore = defineStore({
  id: "auth-store",
  state: () => ({
    user: undefined as User | undefined,
    selectedReportTab: undefined as Option | undefined,
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

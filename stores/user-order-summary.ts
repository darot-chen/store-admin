import { getUserOrderSummary } from "~/api/order";
import type { UserOrderSummary } from "~/types/order";
import { UserMode } from "~/types/user";

export const userUserOrderSummaryStore = defineStore({
  id: "user-order-summary-store",
  state: () => ({
    data: {} as {
      user: UserOrderSummary;
      merchant: UserOrderSummary;
    },
  }),
  actions: {
    getAllUserOrderSummary() {
      Promise.all([
        getUserOrderSummary(UserMode.USER),
        getUserOrderSummary(UserMode.MERCHANT),
      ]).then(([user, merchant]) => {
        this.data = { user, merchant };
      });
    },
    getUserOrderSummary(mode: UserMode) {
      return mode === UserMode.USER ? this.data.user : this.data.merchant;
    },
    fetchUserOrderSummary(mode: UserMode) {
      return getUserOrderSummary(mode).then((data) => {
        if (mode === UserMode.USER) {
          this.data.user = data;
        } else {
          this.data.merchant = data;
        }
      });
    },
  },
});

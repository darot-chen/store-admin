import { getUserOrderSummary } from "~/api/user";
import type { UserOrderSummary } from "~/types/order";
import { UserMode } from "~/types/user";

export const useCurrencyStore = defineStore({
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
  },
});

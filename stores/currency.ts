import { getAllCurrencies } from "~/api/currency";
import type { Option } from "~/types/common";
import type { Currency } from "~/types/currency";

export const useCurrencyStore = defineStore({
  id: "currency-store",
  state: () => ({
    data: [] as Currency[],
    options: [] as Option[],
  }),
  actions: {
    async getAllCurrencies() {
      if (this.data.length > 0) {
        return this.data;
      }
      const data = await getAllCurrencies();
      this.data = data;

      return this.data;
    },
    async getCurrencyOptions() {
      if (this.options.length > 0) {
        return this.options;
      }
      await this.getAllCurrencies();

      this.options = this.data.map((currency) => ({
        value: currency.id.toString(),
        label: currency.code,
      }));

      return this.options;
    },
  },
});

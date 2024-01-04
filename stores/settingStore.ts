import { defineStore } from "pinia";
import { API_SETTING } from "~/api/apiSetting";
import { SettingType } from "~/types/setting";

const useSettingStore = defineStore("setting-store", {
  state: () => ({
    loading: false,
    homeBanner: {} as SettingType,
  }),
  actions: {
    async getHomeBanner() {
      this.loading = true;
      const { data } = await API_SETTING.GET_HOME_BANNER.execute();
      if (data.value) {
        this.homeBanner = data.value.data;
      }
    },
  },
});

export default useSettingStore;

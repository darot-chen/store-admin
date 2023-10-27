import {defineStore} from 'pinia';

export const useAppConfigStore = defineStore('appConfig', {
  state: () => ({
    collapse: false as boolean,
  }),
  getters: {
   isCollapse: (state) => state.collapse,
  },
  actions: {
    toggle() {
      this.collapse = !this.collapse;
    }
  }
})
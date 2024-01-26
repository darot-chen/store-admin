export const usePageStore = defineStore("page-store", {
  state: () => ({
    title: "" as string,
  }),
  actions: {
    setTitle(title: string) {
      this.title = title;
    },
  },
});

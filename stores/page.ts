const usePageStore = defineStore("page-store", {
  state: () => ({
    title: "" as string,
    showBackButton: true as boolean,
  }),
  actions: {
    setTitle(title: string) {
      this.title = title;
    },
    setShowBackButton(show: boolean) {
      this.showBackButton = show;
    },
  },
});

export default usePageStore;

export default defineNuxtPlugin(() => {
  // https://github.com/nuxt/movies/commit/20a859bd14d5d80673ea03722aa46ad72d24abe6
  const nuxtApp = useNuxtApp();

  nuxtApp.hooks.hook("page:transition:finish", async () => {
    await document.querySelector("[data-scroll]")?.scrollTo({ top: 0 });
  });
});

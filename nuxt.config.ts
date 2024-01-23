export default defineNuxtConfig({
  // devtools: true,
  ssr: false,
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@pinia/nuxt", "@nuxtjs/i18n", "@vueuse/nuxt"],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  i18n: {
    locales: [
      {
        code: "zh",
        name: "簡體中文",
        file: "zh.json",
      },
      {
        code: "en",
        name: "English",
        file: "en.json",
      },
    ],
    defaultLocale: "zh",
    lazy: true,
    langDir: "locales/",
    strategy: "no_prefix",
  },
  app: {
    head: {
      title: "百順擔保",
      charset: "utf-8",
      meta: [
        { charset: "utf-8" },
        { name: "application-name", content: "買馬易" },
        {
          name: "viewport",
          content:
            "initial-scale=1.0, maximum-scale=1.0, user-scalable=no, height=device-height, width=device-width, viewport-fit=cover",
        },
        { name: "theme-color", content: "#ffff" },
        { name: "msapplication-TileColor", content: "#ffff" },
      ],
      script: [
        {
          src: "https://telegram.org/js/telegram-web-app.js",
        },
        {
          src: "https://telegram.org/js/games.js",
        },
      ],
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "mask-icon",
          color: "#fff",
          href: "/safari-pinned-tab.svg",
        },
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.png",
        },
      ],
    },
  },
  telemetry: false,
  runtimeConfig: {
    public: {
      baseApi: "https://dev-bs-api.ss.hd1.fun",
      baseWs: "https://dev-bs-api.ss.hd1.fun",
    },
  },
});

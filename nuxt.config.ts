import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

export default defineNuxtConfig({
  modules: [ '@pinia/nuxt'],
  ssr: false,
  devtools: {
    enabled: process.env.NUXT_PUBLIC_ENABLE_DEV_TOOLS === 'true' ? true : false
  },
  build: {
    transpile:
      process.env.NUXT_PUBLIC_ENV === 'staging' ||
      process.env.NUXT_PUBLIC_ENV === 'production'
        ? [
            'naive-ui',
            'vueuc',
            '@css-render/vue3-ssr',
            '@juggle/resize-observer',
            'date-fns',
            '@css-render/plugin-bem'
          ]
        : ['@juggle/resize-observer']
  },
  imports: {
    dirs: ['stores']
  },
  typescript: {
    strict: true
  },
  runtimeConfig: {
    public: {
      env: process.env.NUXT_PUBLIC_ENV || 'local',
      apiUrl: process.env.NUXT_PUBLIC_API_URI || 'http://localhost:3000/admin',
      defaultLang: process.env.NUXT_PUBLIC_DEFAULT_LANG || 'en-US'
    }
  },
  vite: {
    plugins: [
      Components({
        dts: true,
        resolvers: [NaiveUiResolver()]
      })
    ]
  }
});
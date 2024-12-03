// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon"],
  components: [
    {
      path: "~/components",
      pathPrefix: true,
      global: true,
    },
  ],
  runtimeConfig: {
    public: {},
    private: {
      MONGO_DB_URL_END: process.env.NUXT_MONGO_DB_URL_END,
      MONGO_DB_URL_START: process.env.NUXT_MONGO_DB_URL_START,
      MONGO_DB_USER: process.env.NUXT_MONGO_DB_USER,
      MONGO_DB_PW: process.env.NUXT_MONGO_DB_PW,
      SURVEY_COLLECTION: process.env.NUXT_SURVEY_COLLECTION,
      REGISTRATION_COLLECTION: process.env.NUXT_REGISTRATION_COLLECTION,
      NUXT_APP_BASE_URL: process.env.NUXT_APP_BASE_URL,
    },
  },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL,
    head: {
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
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
          rel: "android-chrome",
          type: "image/png",
          sizes: "192x192",
          href: "/android-chrome-192x192.png",
        },
        {
          rel: "android-chrome",
          type: "image/png",
          sizes: "512x512",
          href: "/android-chrome-512x512.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },
});

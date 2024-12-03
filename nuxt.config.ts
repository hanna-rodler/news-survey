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
      NUXT_MONGO_DB_URL_END: process.env.NUXT_MONGO_DB_URL_END,
      NUXT_MONGO_DB_URL_START: process.env.NUXT_MONGO_DB_URL_START,
      NUXT_MONGO_DB_USER: process.env.NUXT_MONGO_DB_USER,
      NUXT_MONGO_DB_PW: process.env.NUXT_MONGO_DB_PW,
      NUXT_SURVEY_COLLECTION: process.env.NUXT_SURVEY_COLLECTION,
      NUXT_REGISTRATION_COLLECTION: process.env.NUXT_REGISTRATION_COLLECTION,
    },
  },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL,
  },
});
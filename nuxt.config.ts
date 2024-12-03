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
      MONGO_DB_URL_END: process.env.MONGO_DB_URL_END,
      MONGO_DB_URL_START: process.env.MONGO_DB_URL_START,
      MONGO_DB_USER: process.env.MONGO_DB_USER,
      MONGO_DB_PW: process.env.MONGO_DB_PW,
      MONGO_DB_SURVEY_COLLECTION: process.env.MONGO_DB_SURVEY_COLLECTION,
      MONGO_DB_REGISTRATION_COLLECTION:
        process.env.MONGO_DB_REGISTRATION_COLLECTION,
    },
  },
});

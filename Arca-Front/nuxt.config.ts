// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'nuxt-snackbar',
  
  ],

  snackbar: {
    top: true,
    right: true,
    duration: 5000
  },


  ui: {
    icons: ['heroicons', 'simple-icons'],
    safelistColors: ['primary', 'red', 'orange', 'green'],
  },
  devtools: {
    enabled: true
  },

});

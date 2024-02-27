import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import {resolve} from 'path'

export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/supabase'
  ],
  supabase:{
    redirect: false
  },
  alias: {
    "@": resolve(__dirname, '/')
  },
  css: ["./assets/scss/global.scss"],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    css: {
      preprocessorOptions:{
        scss: {
          additionalData: '@use "./assets/scss/_vars.scss" as *;'
        }
      }
    }
  },

})

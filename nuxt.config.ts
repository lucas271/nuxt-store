import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import {resolve} from 'path'

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  build: {
    transpile: ['vuetify'],
  },
  routeRules: {
    '/item/**': {isr: 3600, prerender: true},
    '/item': {ssr: true, isr: 3600},
    '/': {isr: 3600, prerender: true},
    '/auth': {static: 3600},
    '/cart': {isr: 3600}
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
    '@nuxtjs/supabase',
    "nuxt-csurf",
  ],
  csurf: { 
    https: true, 
    cookie: { 
      path: '/',
      httpOnly: true,
      sameSite: 'strict'
    },
    methodsToProtect: ['POST', 'PUT', 'PATCH'], // the request methods we want CSRF protection for
    encryptAlgorithm: 'AES-CBC', // by default '' (node), 'AES-CBC' (serverless)
    addCsrfTokenToEventCtx: true // default false, to run useCsrfFetch on server set it to true
  },
  supabase:{
    redirect: false
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

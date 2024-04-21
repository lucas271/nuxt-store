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
  routeRules:{
    '/': {isr: 3600},
    '/item': {isr: 3600},
    '/item/**': {static: true, prerender: true},
    '/cart': {isr: 3600},
    '/wishList': {isr: 3600}

  },
  csurf: { 
    https: true, 
    cookie: { 
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
    },
    addCsrfTokenToEventCtx: true, // default false, to run useCsrfFetch on server set it to true
    encryptAlgorithm: 'AES-CBC', // by default 'aes-256-cbc' (node), 'AES-CBC' (serverless)
    methodsToProtect: ['POST', 'PUT', 'PATCH'], // the request methods we want CSRF protection for
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
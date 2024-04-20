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
    '/': {isr: true},
    '/item': {isr: true},
    '/item/**': {static: true, prerender: true},
    '/cart': {isr: true},
    '/wishList': {isr: true}

  },
  csurf: { 
    https: true, 
    cookie: { 
      path: '/',
      httpOnly: true,
      sameSite: 'strict'
    },
    encryptAlgorithm: 'AES-CBC',
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

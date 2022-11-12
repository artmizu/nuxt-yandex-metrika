import { defineNuxtConfig } from 'nuxt/config'
import MyModule from '../src/module'

export default defineNuxtConfig({
  modules: [
    MyModule,
  ],
  runtimeConfig: {
    public: {
      yandexMetrika: {
        id: '49439650',
      },
    },
  },
  plugins: [

  ],
})

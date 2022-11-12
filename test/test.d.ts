import { vi } from 'vitest'

declare module '@nuxt/schema' {
  import { MetrikaModuleParams } from '../src/runtime/type'

  interface NuxtConfig {
    yandexMetrika: Partial<MetrikaModuleParams>
  }
}
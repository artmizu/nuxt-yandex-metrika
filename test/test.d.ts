import { vi } from 'vitest'

// declare module 'consola' {
//   export const mockedInfo: ReturnType<typeof vi.fn>
// }

declare module '@nuxt/schema' {
  import { MetrikaModuleParams } from '../src/runtime/type'

  interface NuxtConfig {
    yandexMetrika: Partial<MetrikaModuleParams>
  }
}
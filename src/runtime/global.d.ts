
declare global {
  interface Window {
    ym: (id: string, action: string, value: string) => void
  }
}

interface Metrika {
  reachGoal: (goal: string) => void
  hit: (url: string) => void
}

declare module 'vue/types/vue' {
  import Vue from 'vue'
  interface Vue {
    $metrika: Metrika
  }
}

// nuxt 2 types 
declare module '@nuxt/types' {
  interface Context {
    $metrika: Metrika
  }

  interface NuxtAppOptions {
    $metrika: Metrika
  }

  interface NuxtOptions {
    yandexMetrikaID?: string
  }
}

// nuxt 2 shim for the head acceptance
declare module '@nuxt/schema' {
  interface NuxtOptions {
    head: any
  }
}

export { }
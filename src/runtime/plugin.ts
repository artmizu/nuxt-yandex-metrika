import { defineNuxtPlugin, useRouter, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((ctx) => {
  const id: string = useRuntimeConfig().public.yandexMetrika.id
  const router = useRouter()

  router.afterEach((to, from) => {
    window.ym(id, 'hit', to.fullPath, {
      referer: from.fullPath,
    })
  })

  ctx.provide('metrika', {
    hit: (url: string) => {
      window.ym(id, 'hit', url)
    },
    reachGoal: (identifyer: string) => {
      window.ym(id, 'reachGoal', identifyer)
    },
  })
})

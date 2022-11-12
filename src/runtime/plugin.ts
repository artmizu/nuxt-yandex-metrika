import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((ctx) => {
  const id: string = useRuntimeConfig().public.yandexMetrika.id

  ctx.provide('metrika', {
    hit: (url: string) => {
      window.ym(id, 'hit', url)
    },
    reachGoal: (identifyer: string) => {
      window.ym(id, 'reachGoal', identifyer)
    },
  })
})

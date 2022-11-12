import { defineNuxtPlugin } from '#app'
import consola from 'consola'

export default defineNuxtPlugin((ctx) => {
  ctx.provide('metrika', {
    reachGoal: (identifyer: string) => {
      consola.info(`[yandex.metrika] reach goal "${identifyer}" on dev`)
    },
    hit: (url: string) => {
      consola.info(`[yandex.metrika] hit on "${url}" on dev`)
    },
  })
})
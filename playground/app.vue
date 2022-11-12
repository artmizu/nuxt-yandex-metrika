<script setup>
import consola from 'consola'
import { useNuxtApp } from '#app'

const ctx = useNuxtApp()
consola.info('test-test')
if (process.client)
  ctx.$metrika.reachGoal('zzz')
</script>

<template>
  <div>
    Nuxt module playground!
  </div>
</template>

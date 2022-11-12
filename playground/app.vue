<template>
  <div>
    Nuxt module playground!
  </div>
</template>

<script setup>
import { useNuxtApp } from '#app';
import consola from 'consola'

const ctx = useNuxtApp()
consola.info('test-test')
if (process.client) ctx.$metrika.reachGoal('zzz')
</script>

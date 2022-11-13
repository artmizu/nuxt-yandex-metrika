<script setup>
import { useNuxtApp } from '#app'

const ctx = useNuxtApp()
if (process.client)
  ctx.$metrika.reachGoal('zzz')
</script>

<template>
  <div>
    Nuxt module playground!
  </div>
</template>

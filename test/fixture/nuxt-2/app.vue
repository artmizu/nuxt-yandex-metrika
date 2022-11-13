<script>
import { useNuxtApp } from '#app'

const ctx = useNuxtApp()
if (process.client)
  ctx.$metrika.reachGoal('zzz')
</script>

<template>
  <div>
    <bla-bla-bla />
  </div>
</template>

<template>
  bla-bla-bla
</template>

<script setup>
import { useNuxtApp } from '#app';

const ctx = useNuxtApp()
if (process.client) ctx.$metrika.reachGoal('zzz')
</script>
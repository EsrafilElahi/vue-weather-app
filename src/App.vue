<script setup lang="ts">
import Header from "./components/Header.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <VApp>
    <div class="min-h-screen bg-gray-100 pt-14">
      <Header />

      <RouterView />
    </div>
  </VApp>
</template>

<style scoped></style>

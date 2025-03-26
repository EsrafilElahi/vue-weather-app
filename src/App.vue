<script setup lang="ts">
import Header from "./components/Header.vue";
</script>

<template>
  <VApp>
    <div class="min-h-screen bg-gray-100 pt-14">
      <Header />

      <VBtn color="gray"> Button </VBtn>
      <v-btn variant="outlined" color="primary">Primary Button</v-btn>
    </div>
  </VApp>
</template>

<style scoped></style>

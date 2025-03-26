<script setup lang="ts">
import Header from "./components/Header.vue";
</script>

<template>
  <vApp>
    <div class="min-h-screen bg-gray-100">
      <Header />

      <VBtn color="primary" class="mt-14"> Button </VBtn>
      <v-btn variant="outlined" color="primary" class="mt-14"  >Primary Button</v-btn>

    </div>
  </vApp>
</template>

<style scoped></style>

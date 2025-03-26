<script setup lang="ts">
import { ref, watch } from "vue";

const searchValue = ref("");

watch(searchValue, () => {
  console.log(searchValue.value);
});
</script>

<template>
  <VContainer class="mt-3">
    <VTextField
      v-model="searchValue"
      append-inner-icon="mdi-magnify"
      label="Search for cities..."
    />
  </VContainer>
</template>

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
      density="compact"
      label="Search for cities..."
      class="!text-medium-gray"
      variant="solo"
      hide-details
      single-line
    />
  </VContainer>
</template>

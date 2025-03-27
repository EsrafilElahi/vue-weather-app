<script setup lang="ts">
import { useDebounce } from "@/composables/useDebounce";
import { ref, watch } from "vue";

const searchValue = ref("");

const debouncedValue = useDebounce((val: string) => {
  console.log("val :", val);
}, 600);

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  debouncedValue(target.value);
};

</script>

<template>
  <VContainer class="mt-3">
    <VTextField
      v-model="searchValue"
      @input="handleInput"
      append-inner-icon="mdi-magnify"
      label="Search for cities..."
    />
  </VContainer>
</template>

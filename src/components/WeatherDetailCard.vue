<script setup lang="ts">
interface Props {
  icon: string;
  weatherPropertyKey: string;
  weatherPropertyValue: string;
  subDescription: "high" | "low" | "mid" | "normal";
}

const props = defineProps<Props>();
</script>

<template>
  <VRow
    class="flex flex-col items-start justify-center gap-1 bg-white !py-[10px] !px-[12px] rounded-lg shadow-md"
  >
    <VRow class="flex justify-between items-center gap-2">
      <VIcon color="primary-blue" :icon="icon" />
      <span v-capitalize class="font-semibold">{{ weatherPropertyKey }}</span>
    </VRow>

    <span class="text-2xl font-extrabold pt-1">{{ weatherPropertyValue }}</span>
    <span v-capitalize class="text-text-gray">{{ subDescription }}</span>
  </VRow>
</template>

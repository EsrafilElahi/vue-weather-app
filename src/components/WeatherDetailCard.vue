<script setup lang="ts"></script>

<template>
  <VRow
    class="flex flex-col items-start justify-center gap-1 bg-white !py-[10px] !px-[12px] rounded-lg shadow-md"
  >
    <VRow class="flex justify-between items-center gap-2">
      <span>icon</span>
      <span v-capitalize class="font-semibold">wind</span>
    </VRow>

    <span class="text-2xl font-extrabold">12 km/h</span>
    <span v-capitalize class="text-text-gray">clear conditions</span>
  </VRow>
</template>

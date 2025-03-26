<script setup lang="ts">
import { defineModel } from "vue";

interface Props {
  title: string;
  text: string;
}

// for multiple model
// const dialogOpen2 = defineModel("dialogOpen2");
const dialogOpen = defineModel<boolean>("dialogOpen");
const props = defineProps<Props>();
</script>

<template>
  <div class="text-center pa-4">
    <VDialog v-model="dialogOpen" max-width="400">
      <VCard :text="text" :title="title">
        <template #actions>
          <VBtn @click="dialogOpen = false"> OK </VBtn>
        </template>
      </VCard>
    </VDialog>
  </div>
</template>

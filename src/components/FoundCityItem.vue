<script setup lang="ts">
const props = defineProps(["cityItem"]);
</script>

<template>
  <VCard
    density="compact"
    class="d-flex justify-between items-center !p-2 rounded-lg"
    link
  >
    <VRow align="center">
      <VCol cols="11">
        <VCardTitle class="!p-0 !text-lg">{{ cityItem.text }}</VCardTitle>
        <VCardText class="!p-0 !pt-1 !text-md">{{
          cityItem.place_name
        }}</VCardText>
      </VCol>
      <VCol cols="1" class="!flex justify-end">
        <v-icon
          icon="mdi-chevron-right"
          color="grey-darken-1"
          class="ml-2"
        ></v-icon>
      </VCol>
    </VRow>
  </VCard>
</template>

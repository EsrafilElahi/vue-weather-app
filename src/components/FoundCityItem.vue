<script setup lang="ts">
import { watch, watchEffect } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps(["cityItem"]);

const redirectToCityDetailsPage = () => {
  router.push({
    name: "cityDetailsPage",
    params: { city: props.cityItem.text },
  });
};

// Use watch instead of watchEffect for specific prop observation
// watch(
//   () => props.cityItem,
//   (newVal) => {
//     if (newVal) {
//       console.log('cityItem:', newVal);
//     }
//   },
//   { immediate: true } // need for run first time
// );
</script>

<template>
  <VCard
    @click="redirectToCityDetailsPage"
    density="compact"
    class="d-flex justify-between items-center !p-2 rounded-lg"
    :aria-label="`Location: ${cityItem.text}`"
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

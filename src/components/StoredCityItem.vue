<script setup lang="ts">
// import { watch, watchEffect } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps(["cityItem"]);

const redirectToCityDetailsPage = () => {
  router.push({
    name: "cityDetailsPage",
    params: { city: props.cityItem.name },
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
    :aria-label="`Location: ${cityItem.name}`"
    link
  >
    <VRow align="center">
      <VCol cols="11">
        <VCardTitle class="!p-0 !text-lg">{{ cityItem.name }}</VCardTitle>
        <VCardText class="!p-0 !pt-1 !text-md">{{
          cityItem.sys.country
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

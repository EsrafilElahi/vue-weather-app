<script setup lang="ts">
import { fetchCity } from "@/apis/fetchCity";
import FoundCityItem from "@/components/FoundCityItem.vue";
import StoredCityItem from "@/components/StoredCityItem.vue";
import { useDebounce } from "@/composables/useDebounce";
import { getStoredCities } from "@/lib/utils";
import { onBeforeUnmount, ref, watchEffect } from "vue";

const cities = ref<any | null>(null);
let abortController: AbortController | null = null;

const storedCities = getStoredCities();

const debouncedValue = useDebounce(async (val: string) => {
  // Abort previous request
  if (abortController) {
    abortController.abort();
  }

  // Create new controller for this request
  abortController = new AbortController();

  if (val.trim().length > 1) {
    const results = await fetchCity(val, {
      signal: abortController.signal,
    });
    cities.value = results;
  } else {
    cities.value = null; // Reset when search is cleared
  }
}, 600);

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  debouncedValue(target.value);
};

onBeforeUnmount(() => {
  if (abortController) {
    abortController.abort();
  }
});

watchEffect(() => {
  console.log(
    "cities !== null && cities?.length > 0 :",
    cities.value !== null && cities.value.length > 0
  );
});
</script>

<template>
  <VContainer class="mt-3">
    <VTextField
      @input="handleInput"
      append-inner-icon="mdi-magnify"
      label="Search for cities..."
    />

    <div
      v-if="cities !== null && cities?.length > 0"
      :class="{ 'flex flex-col gap-2 mt-1': 'cities.length > 0' }"
    >
      <FoundCityItem v-for="city in cities" :key="city.id" :cityItem="city" />
    </div>
    <VCard v-else-if="cities !== null && cities?.length === 0" class="mt-1">
      <VCardText class="text-error-red">No City Found</VCardText>
    </VCard>

    <div
      v-else-if="storedCities.length > 0"
      :class="{ 'flex flex-col gap-2 mt-10': 'storedCities.length > 0' }"
    >
      <h2 class="text-2xl text-text-gray">saved cities</h2>
      <StoredCityItem
        v-for="storedCity in storedCities"
        :key="storedCity.id"
        :cityItem="storedCity"
      />
    </div>
  </VContainer>
</template>

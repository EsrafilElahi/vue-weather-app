<script setup lang="ts">
import { fetchCity } from "@/apis/fetchCity";
import FoundCityItem from "@/components/FoundCityItem.vue";
import { useDebounce } from "@/composables/useDebounce";
import { ref } from "vue";

const cities = ref<any | null>(null);

const debouncedValue = useDebounce(async (val: string) => {
  const citiesFound = await fetchCity(val);
  cities.value = citiesFound;
}, 600);

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  debouncedValue(target.value);
};
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
    <VCard v-else-if="cities !== null && cities?.length === 0">
      <VCardText class="text-error-red">No City Found</VCardText>
    </VCard>
  </VContainer>
</template>

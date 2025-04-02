<script setup lang="ts">
import { useDebounce } from "@/composables/useDebounce";
import {
  computed,
  defineAsyncComponent,
  onBeforeUnmount,
  // watchEffect,
} from "vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
import ErrorComponent from "@/components/ErrorComponent.vue";
import { useStore } from "vuex";

const FoundCityItem = defineAsyncComponent({
  loader: () => import("@/components/FoundCityItem.vue"),
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
});

const StoredCityItem = defineAsyncComponent({
  loader: () => import("@/components/StoredCityItem.vue"),
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
});

let abortController: AbortController | null = null;
const store = useStore();

const foundCities = computed(() => store.getters["getFoundCities"]);
const savedCities = computed(() => store.getters["getSavedCities"]);

const debouncedValue = useDebounce(async (val: string) => {
  // Abort previous request
  if (abortController) {
    abortController.abort();
  }

  // Create new controller for this request
  abortController = new AbortController();
  store.dispatch("setFoundCitiesAction", { val, abortController });
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
</script>

<template>
  <VContainer class="mt-3">
    <VTextField
      @input="handleInput"
      append-inner-icon="mdi-magnify"
      label="Search for cities..."
    />

    <div
      v-if="foundCities !== null && foundCities?.length > 0"
      :class="{ 'flex flex-col gap-2 mt-1': 'foundCities.length > 0' }"
    >
      <FoundCityItem
        v-for="city in foundCities"
        :key="city.id"
        :cityItem="city"
      />
    </div>
    <VCard
      v-else-if="foundCities !== null && foundCities?.length === 0"
      class="mt-1"
    >
      <VCardText class="text-error-red">No City Found</VCardText>
    </VCard>

    <div
      v-else-if="savedCities.length > 0"
      :class="{ 'flex flex-col gap-2 mt-10': 'savedCities.length > 0' }"
    >
      <h2 class="text-2xl text-text-gray">saved cities</h2>
      <StoredCityItem
        v-for="storedCity in savedCities"
        :key="storedCity.id"
        :cityItem="storedCity"
      />
    </div>
  </VContainer>
</template>

<script setup lang="ts">
import { fetchWeatherCity } from "@/apis/fetchWeather";
import { onBeforeUnmount, onMounted, ref, watch, watchEffect } from "vue";
import { useRoute, type RouteLocationNormalized } from "vue-router";

interface Params {
  city: string;
}

type CustomRoute = RouteLocationNormalized & {
  params: Params;
};

const route = useRoute() as CustomRoute;
const city = ref(null);
let abortController: AbortController | null = null;

const handleFetchWeatherCity = async () => {
  // Abort previous request
  if (abortController) {
    abortController.abort();
  }

  // Create new controller for this request
  abortController = new AbortController();

  const res = await fetchWeatherCity(route.params.city, {
    signal: abortController.signal,
  });

  console.log("res :", res);

  if (res.cod === 200) {
    city.value = res;
  }
};

onMounted(() => {
  if (route.params.city) {
    handleFetchWeatherCity();
  }
});

watch(
  () => route.params.city,
  (newCity, oldCity) => {
    console.log({ newCity, oldCity });

    if (newCity && newCity !== oldCity) {
      handleFetchWeatherCity();
    }
  },
  { immediate: false } // Already handled by onMounted
);

onBeforeUnmount(() => {
  if (abortController) {
    abortController.abort();
  }
});
</script>

<template>
  <div>City Details Page</div>
</template>

<script setup lang="ts">
import { fetchWeatherCity } from "@/apis/fetchWeather";
import { getStoredCities } from "@/lib/utils";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute, type RouteLocationNormalized } from "vue-router";
import { useToast } from "vue-toast-notification";
import WeatherDetailCard from "@/components/WeatherDetailCard.vue";

interface Params {
  city: string;
}

type CustomRoute = RouteLocationNormalized & {
  params: Params;
};

const route = useRoute() as CustomRoute;
const city = ref(null);
const toast = useToast();
let abortController: AbortController | null = null;

const handleStoreCityInLocalStorage = (city: any) => {
  if (city !== null) {
    const storedCities = getStoredCities();

    const exist = storedCities.some(
      (storedCity: any) => storedCity.name === city.name
    );
    if (exist) {
      toast.open({
        type: "warning",
        message: "city is already exist in local storage!",
        duration: 2000,
        position: "top",
      });
    } else {
      localStorage.setItem(
        "savedCities",
        JSON.stringify([...storedCities, city])
      );
    }
  }
};

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
    handleStoreCityInLocalStorage(res);
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
  <VContainer class="flex flex-col gap-[2rem] !p-0 !mt-[2rem]">
    <VRow class="bg-white !p-4 rounded-lg shadow-md">
      <VCol cols="9" class="flex flex-col gap-5">
        <VRow>
          <VCol cols="12">
            <p class="text-2xl font-bold">new york</p>
          </VCol>

          <VCol cols="12">
            <p class="text-text-gray">wendnesday</p>
          </VCol>
        </VRow>

        <VRow class="flex gap-4">
          <p class="text-3xl font-bold">23C</p>
          <p>partly cloudy</p>
        </VRow>
      </VCol>

      <VCol cols="3" class="flex flex-col justify-between items-end">
        <p>add to favorite</p>
        <p>icon weather</p>
      </VCol>
    </VRow>

    <VRow class="!grid grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 gap-4">
      <WeatherDetailCard />
      <WeatherDetailCard />
      <WeatherDetailCard />
      <WeatherDetailCard />
      <WeatherDetailCard />
      <WeatherDetailCard />
    </VRow>
  </VContainer>
</template>

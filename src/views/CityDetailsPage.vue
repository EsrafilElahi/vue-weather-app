<script setup lang="ts">
import { fetchWeatherCity } from "@/apis/fetchWeather";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute, type RouteLocationNormalized } from "vue-router";
import { useToast } from "vue-toast-notification";

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

const getStoredCities = () => {
  const cities = localStorage.getItem("savedCities");
  return cities ? JSON.parse(cities) : [];
};

const handleStoreCityInLocalStorage = (city: any) => {
  if (city !== null) {
    const storedCities = getStoredCities();
    console.log("storedCities :", storedCities);
    const exist = storedCities.some(
      (storedCity: any) => storedCity.name === city.name
    );
    if (exist) {
      toast.open({
        type: "error",
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

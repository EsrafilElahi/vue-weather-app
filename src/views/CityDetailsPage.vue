<script setup lang="ts">
import { fetchWeatherCity } from "@/apis/fetchWeather";
import { getStoredCities } from "@/lib/utils";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
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
const city = ref<any | null>(null);
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
            <p v-capitalize class="text-2xl font-bold">{{ city?.name }}</p>
          </VCol>

          <VCol cols="12">
            <p v-capitalize class="text-text-gray">{{ city?.sys?.country }}</p>
          </VCol>
        </VRow>

        <VRow class="flex gap-5">
          <p class="text-3xl font-bold">{{ city?.main?.temp }} °C</p>
          <div>
            <p v-capitalize>{{ city?.weather?.[0]?.description }}</p>
            <p class="text-text-gray text-sm">
              Feels like {{ city?.main?.feels_like }}
            </p>
          </div>
        </VRow>
      </VCol>

      <VCol cols="3" class="flex flex-col justify-between items-end">
        <div
          class="flex justify-between items-start gap-2 !p-2 rounded-lg cursor-pointer"
        >
          <!-- bg-contrast-blue -->
          <VBtn
            prepend-icon="mdi-star"
            elevation="0"
            variant="tonal"
            rounded="lg"
          >
            <template v-slot:prepend>
              <VIcon class="mr-2" />
            </template>
            add to favorite
          </VBtn>
        </div>

        <img
          alt="weather icon"
          :src="`https://openweathermap.org/img/wn/${city?.weather?.[0]?.icon}@2x.png`"
        />
      </VCol>
    </VRow>

    <VRow class="!grid grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 gap-4">
      <WeatherDetailCard
        :icon="'mdi-weather-dust'"
        :weather-property-key="'wind'"
        :weather-property-value="`${city?.wind?.speed} km/h`"
        :sub-description="'normal'"
      />
      <WeatherDetailCard
        :icon="'mdi-water'"
        :weather-property-key="'humidity'"
        :weather-property-value="`${city?.main?.humidity} %`"
        :sub-description="'low'"
      />
      <WeatherDetailCard
        :icon="'mdi-eye'"
        :weather-property-key="'grand level'"
        :weather-property-value="`${city?.main?.grnd_level}`"
        :sub-description="'normal'"
      />
      <WeatherDetailCard
        :icon="'mdi-thermometer'"
        :weather-property-key="'pressure'"
        :weather-property-value="`${city?.main?.pressure} km`"
        :sub-description="'high'"
      />
      <WeatherDetailCard
        :icon="'mdi-weather-sunset-up'"
        :weather-property-key="'sea level'"
        :weather-property-value="`${city?.main?.sea_level} mm`"
        :sub-description="'mid'"
      />
      <WeatherDetailCard
        :icon="'mdi-weather-hail'"
        :weather-property-key="'temp max'"
        :weather-property-value="`${city?.main?.temp_max} °C`"
        :sub-description="'low'"
      />
    </VRow>
  </VContainer>
</template>

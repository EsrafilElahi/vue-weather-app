<script setup lang="ts">
import CityDetailsComponent from "@/components/CityDetailsComponent.vue";
</script>

<template>
  <div>
    <Suspense>
      <template #default>
        <CityDetailsComponent />
      </template>

      <template #fallback>
        <span>loading...</span>
      </template>
    </Suspense>
  </div>
</template>

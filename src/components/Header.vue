<script setup lang="ts">
import { ref } from "vue";
import Modal from "@/components/Modal.vue";

const TITLE = "ESRAFIL ELAHI";
const TEXT = "Senior Frontend Engineer at Okala";

// for multiple model
// const dialogOpen2 = ref(false);
const dialogOpen = ref(false);
</script>

<template>
  <VAppBar elevation="0" class="!border !border-b-medium-gray" density="comfortable">
    <VAppBarTitle class="text-left">Weather Application</VAppBarTitle>

    <template v-slot:append>
      <VIcon
        @click="dialogOpen = true"
        color="info"
        class="mr-3 cursor-pointer"
        icon="mdi-information"
      ></VIcon>
    </template>

    <!-- for multiple model -->
    <!-- <Modal v-model:dialogOpen="dialogOpen" v-model:dialogOpen2="dialogOpen2" /> -->
    <Modal v-model:dialogOpen="dialogOpen" :title="TITLE" :text="TEXT" />
  </VAppBar>
</template>

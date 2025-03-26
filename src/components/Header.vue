<script setup lang="ts"></script>

<template>
  <VAppBar color="primary-blue" density="comfortable">
    <VAppBarTitle class="text-left">Application Bar</VAppBarTitle>

    <template v-slot:append>
      <VIcon
        color="info"
        class="mr-3 cursor-pointer"
        icon="mdi-information"
      ></VIcon>
    </template>
  </VAppBar>
</template>

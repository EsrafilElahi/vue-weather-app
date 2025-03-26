<script setup lang="ts"></script>

<template>
  <VAppBar color="primary-blue" density="comfortable">
    <VAppBarTitle class="text-left">Application Bar</VAppBarTitle>

    <template v-slot:append>
      <VIcon
        color="secondary-warning"
        class="mr-3"
        icon="mdi-information"
      ></VIcon>
    </template>
  </VAppBar>
</template>

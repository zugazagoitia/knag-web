<script setup lang="ts">
import FooterComponent from "./components/FooterComponent.vue";
import NavbarComponent from "./components/NavbarComponent.vue";
</script>

<template>
  <NavbarComponent />

    <router-view />

  <FooterComponent />
</template>

<style>
html {
  overflow-y: auto;
}
</style>

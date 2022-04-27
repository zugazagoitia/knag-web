<script setup lang="ts">
import FooterComponent from "./components/FooterComponent.vue";
import NavbarComponent from "./components/NavbarComponent.vue";
</script>

<template>
  <NavbarComponent />

  <section class="section align-center">
    <router-view />
  </section>

  <FooterComponent />
</template>

<style>
html {
  overflow-y: auto;
}
</style>

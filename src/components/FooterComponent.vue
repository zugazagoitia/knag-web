<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <a :href="gitHubURL" target="_blank"
        ><span class="icon is-large"> <i class="lab la-github la-2x"></i> </span
      ></a>

      <p>
        {{ new Date().getFullYear() }} — <strong>Alberto Zugazagoitia</strong>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const gitHubURL = "https://github.com/zugazagoitia/knag";
</script>

<style scoped>
a {
  color: black;
}
</style>

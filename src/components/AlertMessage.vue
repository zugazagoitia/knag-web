<script setup lang="ts">
let props = defineProps({
  alertShown: Boolean,
  alertType: String,
  alertMessage: String,
});

let emits = defineEmits(["alertClosed"]);

function closeAlert() {
  emits("alertClosed");
}
</script>

<template>
  <div
    v-if="alertShown"
    :class="[
      alertType === 'error' && 'is-danger',
      alertType === 'warning' && 'is-warning',
      alertType === 'success' && 'is-success',
    ]"
    class="notification is-light"
  >
    <button class="delete" @click="closeAlert()"></button>
    {{ alertMessage }}
  </div>
</template>

<style scoped></style>

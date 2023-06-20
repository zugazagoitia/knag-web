<script setup lang="ts">

import auth from "../logic/auth";
import AlertMessage from "../components/AlertMessage.vue";
import { ref, onMounted } from "vue";
import {useRoute, useRouter} from "vue-router";

async function checkEmail(token: string): Promise<boolean> {
  let response = await auth.verifyEmail(token);
  //Check for errors
  return response.data.status == 200;
}
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  // Check if route.params.token is a string, if its an array, convert it to string
  let token = Array.isArray(route.params.token) ? route.params.token[0] : route.params.token;
  try {
    let success = await checkEmail(token);
    if (success) {
      await router.push({name: "login"});
    }
  } catch (error) {
    alertShown.value = true;
  } finally {
    loading.value = false;
  }
});

let loading = ref(true);
let alertShown = ref(false);
let alertType = ref("error");
let alertMessage = ref("There was an error verifying your email. Check if your account is already verified and if the link is correct.");

function hideAlert() {
  router.push({name: "home"});
}

</script>

<template>

  <div>
    <AlertMessage
        :alert-message="alertMessage"
        :alert-shown="alertShown"
        :alert-type="alertType"
        @alert-closed="hideAlert"
    />
    <progress v-if="loading" class="progress is-small is-primary" max="100">15%</progress>
  </div>

</template>


<style scoped>

</style>
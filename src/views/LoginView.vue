<script setup lang="ts">
import auth, {SuccessfulLoginResponse, SuccessfulSessionResponse} from "../logic/auth";
import { useUserSession } from "../store/userSession";

import LoginForm from "../components/LoginForm.vue";
import AlertMessage from "../components/AlertMessage.vue";
import { ref } from "vue";

let loading = ref(false);
let alertShown = ref(false);
let alertType = ref("error");
let alertMessage = ref("");

const userSessionStore = useUserSession();

function login(user: { email: string; password: string }) {
  let responsePromise = auth.login(user.email, user.password);
  loading.value = true;
  responsePromise
    .then((response: { data: { status: any } }) => {
      switch (response.data.status) {
        case 201: {
          userSessionStore.login(response as SuccessfulLoginResponse);
          let sessionTokenPromise = auth.getSession(userSessionStore.refreshToken);
          sessionTokenPromise
            .then((response: { data: { status: any } }) => {
              switch (response.data.status) {
                case 200: {
                  userSessionStore.setSession(response as SuccessfulSessionResponse);
                  loading.value = false;
                  //TODO redirect somewhere?
                  break;
                }
                default: {
                  loading.value = false;
                  alertType.value = "error";
                  alertMessage.value =
                    "There was a problem with the request, please try again later.";
                  alertShown.value = true;
                  break;
                }
              }
            })
            .catch((error: any) => {
              console.log(error);
            });
          break;
        }

        case 212: {
          alertType.value = "info";
          alertMessage.value = "Email is not verified";
          alertShown.value = true;

          loading.value = false;
          break;
        }
      }
    })
    .catch((error: any) => {
      alertType.value = "error";

      console.log(error);
      if (error.response == undefined) {
        alertMessage.value =
          "There was a problem while logging you in, please try again later.";
      } else if (error.response.status === 401) {
        alertMessage.value = "Wrong credentials";
      } else if (error.response.status === 429) {
        alertMessage.value =
          "There were too many attempts, please try again later";
      } else {
        alertMessage.value =
          "There was a problem while logging you in, please try again later.";
      }

      alertShown.value = true;
      loading.value = false;
    });
}

function hideAlert() {
  alertShown.value = false;
}
</script>

<template>
    <section class="section">
        <div class="my-12">
            <AlertMessage
                    :alert-message="alertMessage"
                    :alert-shown="alertShown"
                    :alert-type="alertType"
                    @alert-closed="hideAlert"
            />
            <LoginForm @form-submitted="login" :loading="loading" />
        </div>
    </section>

</template>

<style scoped>
AlertMessage {
  width: 700px;
}
</style>

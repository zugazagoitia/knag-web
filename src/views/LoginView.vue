<template>
  <div class="my-12">
    <v-spacer></v-spacer>
    <v-card class="mx-auto" max-width="700">
      <v-form @submit.prevent="login">
        <v-container>
          <v-row align="center" justify="center">
            <v-col cols="3">
              <v-img
                :src="require('../assets/logo.svg')"
                class="my-2"
                contain
                height="128"
              />
            </v-col>
            <v-col cols="6">
              <v-img
                :src="require('../assets/name.svg')"
                class="my-2"
                contain
                max-height="80"
              />
            </v-col>
          </v-row>
          <v-row class="mx-2">
            <v-col>
              <v-text-field class="" label="Email" v-model="email">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="mx-2">
            <v-col>
              <v-text-field class="" label="Password" v-model="password">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="mx-2 mb-2" justify="end">
            <v-col md="auto" align-self="end">
              <v-btn type="submit"> Log-in</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      {{ content }}
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import auth, { SuccessfulLoginResponse } from "@/logic/auth";
import { useUserSession } from "@/store/userSession";
import { mapStores } from "pinia";

export default Vue.extend({
  name: "LoginView",
  data: () => ({
    email: "",
    password: "",
    content: "",
  }),
  computed: {
    ...mapStores(useUserSession),
  },

  methods: {
    login() {
      let responsePromise = auth.login(this.email, this.password);
      //tuerca a girar
      responsePromise
        .then((response) => {
          switch (response.data.status) {
            case 201: {
              this.userSessionStore.login(response as SuccessfulLoginResponse);
              break;
            }

            case 212: {
              //handle email not verified
              break;
            }
          }
          this.content = response.toString();
        })
        .catch((error) => {
          if (error.response.status === 401) {
            //wrong username/password
          }
          console.log(error.response.status);
          this.content = "error: " + error.toString();
        });
      //paro tuerca
    },
  },
});
</script>

<style scoped></style>

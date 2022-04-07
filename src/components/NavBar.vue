<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <router-link to="/"
        ><v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../assets/logo.svg"
          transition="scale-transition"
          width="40"
      /></router-link>
    </div>

    <v-spacer></v-spacer>

    <div v-if="this.userSessionStore.isLoggedIn">
      Welcome {{ this.userSessionStore.email }}
      <!-- TODO get name and other information -->
      <v-btn color="info" class="ml-2 mr-1" @click="logout()">
        <span class="mx-1">Log out</span>
      </v-btn>
    </div>

    <div v-else>
      <v-btn to="/login" class="mx-1" text>
        <span class="mx-1">Log-in</span>
      </v-btn>
      <v-btn color="secondary" class="mx-1" to="/register">
        <span class="mx-1">Register</span>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapStores } from "pinia";
import { useUserSession } from "@/store/userSession";
import auth from "@/logic/auth";

export default Vue.extend({
  name: "NavBar",
  data: () => ({}),
  computed: {
    ...mapStores(useUserSession),
  },
  methods: {
    logout() {
      auth.logout(this.userSessionStore.refreshToken).catch((error) => {
        console.log(error);
      });
      this.userSessionStore.logout();
    },
  },
});
</script>

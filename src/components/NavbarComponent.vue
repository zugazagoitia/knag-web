<script setup lang="ts">
import { useUserSession } from "../store/userSession";
import auth from "../logic/auth";
import logo from "../assets/img/name-logo.svg";

const userSessionStore = useUserSession();

function logout() {
  auth.logout(userSessionStore.refreshToken).catch((error: any) => {
    console.log(error);
  });
  userSessionStore.logout();
}
</script>

<template>
  <nav
    class="navbar has-shadow is-spaced"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <router-link class="is-flex" to="/">
        <figure class="image m-0 px-1">
          <img class="logo" :src="logo" />
        </figure>
      </router-link>
    </div>

    <div class="navbar-menu">
      <div class="navbar-end">
        <div v-if="userSessionStore.isLoggedIn" class="navbar-item">
          <!-- TODO get name and other information -->
          Welcome <strong class="px-2">{{ userSessionStore.email }}</strong>
          <div class="buttons">
            <button @click="logout()" class="button is-light">Log out</button>
          </div>
        </div>
        <div v-else class="navbar-item">
          <div class="buttons">
            <router-link to="/register" class="button is-primary">
              <strong>Sign up</strong>
            </router-link>
            <router-link to="/login" class="button is-light">
              Log in
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.logo {
  max-height: 64px;
  width: auto;
}
</style>

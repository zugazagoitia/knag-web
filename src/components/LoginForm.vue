<script setup lang="ts">
import logo from "../assets/img/logo@0.25x.png";
import name from "../assets/img/name.svg";

import { ref } from "vue";

let email = ref("");
let password = ref("");

let passwordPresentAlert = ref(false);
let correctEmailAlert = ref(false);

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["form-submitted"]);

function submitForm() {
  if (checkForm()) {
    emitLoginEvent();
  }
}

function checkForm() {
  passwordPresentAlert.value = false;
  correctEmailAlert.value = false;
  if (!password.value) {
    passwordPresentAlert.value = true;
  }
  if (!email.value) {
    correctEmailAlert.value = true;
  }
  return !(passwordPresentAlert.value || correctEmailAlert.value);
}

function emitLoginEvent() {
  let user = {
    email: email.value,
    password: password.value,
  };
  emit("form-submitted", user);
}
</script>

<template>
  <div class="card mx-auto">
    <div class="card-image">
      <div class="level">
        <div class="level-item has-text-centered">
          <figure class="image m-0 px-2">
            <img class="logo" :src="logo" />
          </figure>
        </div>
        <div class="level-item has-text-centered">
          <figure class="image m-0 px-2">
            <img class="name" :src="name" />
          </figure>
        </div>
      </div>
      <h2 class="title is-2 has-text-centered">Log in</h2>
    </div>
    <div class="card-content">
      <div class="content">
        <form @submit.prevent="submitForm">
          <div class="field">
            <div class="control has-icons-left has-icons-right">
              <input
                class="input"
                :class="correctEmailAlert && 'is-danger'"
                type="email"
                placeholder="Email"
                v-model="email"
              />
              <span class="icon is-small is-left">
                <i class="las la-envelope"></i>
              </span>
              <span v-if="correctEmailAlert" class="icon is-small is-right">
                <i class="las la-exclamation-triangle"></i>
              </span>
            </div>
            <p v-if="correctEmailAlert" class="help is-danger">
              This email is invalid
            </p>
          </div>
          <div class="field">
            <div class="control has-icons-left has-icons-right">
              <input
                class="input"
                :class="passwordPresentAlert && 'is-danger'"
                type="password"
                placeholder="Password"
                minlength="8"
                v-model="password"
              />
              <span class="icon is-small is-left">
                <i class="las la-lock"></i>
              </span>
              <span v-if="passwordPresentAlert" class="icon is-small is-right">
                <i class="las la-exclamation-triangle"></i>
              </span>
            </div>
            <p v-if="passwordPresentAlert" class="help is-danger">
              This password is invalid
            </p>
          </div>
          <div class="field">
            <p class="control">
              <button
                type="submit"
                :class="props.loading && 'is-loading'"
                class="button is-success"
                :disabled="loading"
              >
                Login
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  max-width: 700px;
}

.logo {
  max-width: 150px;
  max-height: 150px;
}
.name {
  max-width: 400px;
  height: auto;
}
</style>

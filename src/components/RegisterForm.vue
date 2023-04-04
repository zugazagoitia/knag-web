<script setup lang="ts">
import logo from "../assets/img/logo@0.25x.png";
import nameImg from "../assets/img/name.svg";

import { onMounted, ref } from "vue";
import { VueRecaptcha } from "vue-recaptcha";

let captchaSiteKey = import.meta.env.VITE_CAPTCHA_SITE_KEY;

let name = ref("");
let surname = ref("");
let email = ref("");
let password = ref("");
let captcha = ref("");

let nameAbsentAlert = ref(false);
let surnameAbsentAlert = ref(false);
let passwordAbsentAlert = ref(false);
let emailAbsentAlert = ref(false);
let captchaAbsentAlert = ref(false);

let captchaAbsent = ref(true);

const captchaElement = ref(null);

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["form-submitted"]);

function submitForm() {
  if (checkForm()) {
    emitRegisterEvent();
    if (captchaElement.value) {
      captchaElement.value.reset();
      captchaAbsent.value = true;
    }
  }
}

function emitRegisterEvent() {
  let user = {
    email: email.value,
    password: password.value,
    name: name.value,
    surname: surname.value,
    captcha: captcha.value,
  };
  emit("form-submitted", user);
}

function checkForm() {
  nameAbsentAlert.value = false;
  surnameAbsentAlert.value = false;
  passwordAbsentAlert.value = false;
  emailAbsentAlert.value = false;

  if (!name.value) {
    nameAbsentAlert.value = true;
  }
  if (!surname.value) {
    surnameAbsentAlert.value = true;
  }
  if (!password.value) {
    passwordAbsentAlert.value = true;
  }
  if (!email.value) {
    emailAbsentAlert.value = true;
  }
  if (captchaAbsent.value) {
    captchaAbsentAlert.value = true;
  }
  return !(
    passwordAbsentAlert.value ||
    emailAbsentAlert.value ||
    nameAbsentAlert.value ||
    surnameAbsentAlert.value ||
    captchaAbsent.value
  );
}

function captchaExpired() {
  captchaAbsent.value = true;
}

function captchaVerified(response: any) {
  captchaAbsent.value = false;
  captchaAbsentAlert.value = false;
  captcha.value = response;
}
</script>

<template>
  <div class="card mx-auto">
    <div class="card-image">
      <h2 class="title is-2 has-text-centered pt-4">Sign up</h2>
    </div>
    <div class="card-content">
      <div class="content">
        <form @submit.prevent="submitForm">
          <div class="field">
            <label class="label">First Name</label>
            <div class="control has-icons-right">
              <input
                class="input"
                :class="nameAbsentAlert && 'is-danger'"
                type="text"
                placeholder="First Name"
                v-model="name"
              />
              <span v-if="nameAbsentAlert" class="icon is-small is-right">
                <i class="las la-exclamation-triangle"></i>
              </span>
            </div>
            <p v-if="nameAbsentAlert" class="help is-danger">
              First name is empty
            </p>
          </div>

          <div class="field">
            <label class="label">Last Name</label>
            <div class="control has-icons-right">
              <input
                class="input"
                :class="surnameAbsentAlert && 'is-danger'"
                type="text"
                placeholder="Last Name"
                v-model="surname"
              />
              <span v-if="surnameAbsentAlert" class="icon is-small is-right">
                <i class="las la-exclamation-triangle"></i>
              </span>
            </div>
            <p v-if="surnameAbsentAlert" class="help is-danger">
              Last name is empty
            </p>
          </div>

          <div class="field">
            <label class="label">Email</label>

            <div class="control has-icons-left has-icons-right">
              <input
                class="input"
                :class="emailAbsentAlert && 'is-danger'"
                type="email"
                placeholder="user@domain.com"
                v-model="email"
              />
              <span class="icon is-small is-left">
                <i class="las la-envelope"></i>
              </span>
              <span v-if="emailAbsentAlert" class="icon is-small is-right">
                <i class="las la-exclamation-triangle"></i>
              </span>
            </div>
            <p v-if="emailAbsentAlert" class="help is-danger">
              This email is invalid
            </p>
          </div>

          <div class="field">
            <label class="label">Password</label>

            <div class="control has-icons-left has-icons-right">
              <input
                class="input"
                :class="passwordAbsentAlert && 'is-danger'"
                type="password"
                placeholder="********"
                v-model="password"
                minlength="8"
              />
              <span class="icon is-small is-left">
                <i class="las la-lock"></i>
              </span>
              <span v-if="passwordAbsentAlert" class="icon is-small is-right">
                <i class="las la-exclamation-triangle"></i>
              </span>
            </div>
            <p v-if="passwordAbsentAlert" class="help is-danger">
              This password is invalid
            </p>
          </div>

          <div class="field">
            <vue-recaptcha
              ref="captchaElement"
              :sitekey="captchaSiteKey"
              @verify="captchaVerified"
              @expired="captchaExpired"
            ></vue-recaptcha>
            <p v-if="captchaAbsentAlert" class="help is-danger">
              Please fill the captcha!
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
                Register
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

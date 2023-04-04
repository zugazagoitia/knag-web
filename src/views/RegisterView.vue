<script setup lang="ts">
import RegisterForm from "../components/RegisterForm.vue";
import AlertMessage from "../components/AlertMessage.vue";
import auth, {SuccessfulLoginResponse} from "../logic/auth";
import {ref} from "vue";

let loading = ref(false);
let alertShown = ref(false);
let alertType = ref("error");
let alertMessage = ref("");

function hideAlert() {
    alertShown.value = false;
}

function register(user: {
    email: string;
    password: string;
    name: string;
    surname: string;
    captcha: string;
}) {
    let responsePromise = auth.register(
        user.email,
        user.password,
        user.name,
        user.surname,
        user.captcha
    );
    loading.value = true;
    responsePromise
        .then((response: { data: { status: any } }) => {
            switch (response.data.status) {
                case 201: {
                    loading.value = false;
                    alertType.value = "success";
                    alertMessage.value =
                        "Account created successfully, please verify your email.";
                    alertShown.value = true;
                    break;
                }
            }
        })
        .catch((error: any) => {
            alertType.value = "error";
            console.log(error);
            if (error.response == undefined) {
                alertMessage.value =
                    "There was a problem with the request, please try again later.";
            } else if (error.response.status === 400) {
                alertMessage.value = "Wrong Captcha or Body";
            } else if (error.response.status === 409) {
                alertMessage.value = "Email is already registered";
            } else {
                alertMessage.value =
                    "There was a problem with the request, please try again later.";
            }
            alertShown.value = true;
            loading.value = false;
        });
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
            <RegisterForm @form-submitted="register" :loading="loading"/>
        </div>
    </section>
</template>

<style scoped></style>

<script setup>
import { inject, onMounted, ref } from "vue";
import axios from "axios";
import { user } from "../stores/user";
import { alert } from "../stores/utility";
import { useI18n } from "vue-i18n";
import RequestPassReset from "./product/RequestPassReset.vue";

const { t } = useI18n();
const env = import.meta.env;

const signIn = inject("authMode");
const loadingReg = ref(false);
const passType = ref("password");

const form = ref({
  name: null,
  email: null,
  password: null,
  cPassword: null,
});

const regError = ref(null);
const loginError = ref(null);

function register() {
  regError.value = null;

  if (loadingReg.value) return;

  if (!form.value.email || !form.value.name || !form.value.password || !form.value.cPassword) {
    regError.value = t("authModal.errors.fillForm");
    alert.error(regError.value);
    return;
  }

  if (form.value.password !== form.value.cPassword) {
    regError.value = t("authModal.errors.passwordMismatch");
    alert.error(regError.value);
    return;
  }

  loadingReg.value = true;

  const { name, email, password } = form.value;

  axios
    .post(`${env.VITE_BE_API}/auth/register`, { name, email, password }, { timeout: 20000 })
    .then((response) => {
      if (response.data.error) {
        regError.value = response.data.error;
        alert.error(regError.value);
      } else {
        user.login(response.data);
        alert.success(t("authModal.register.loadingText"));
        window.location.href = "/app#subscription_plans";
      }
    })
    .catch((error) => {
      alert.error(error.message.includes("timeout") ? t("authModal.errors.networkError") : t("authModal.errors.invalidCredentials"));
    })
    .finally(() => {
      loadingReg.value = false;
    });
}

function sumitLogin() {
  if (loadingReg.value) return;

  if (!form.value.email || !form.value.password) {
    loginError.value = t("authModal.errors.fillForm");
    alert.error(loginError.value);
    return;
  }

  loadingReg.value = true;

  axios
    .post(`${env.VITE_BE_API}/auth/login`, { email: form.value.email, password: form.value.password }, { timeout: 20000 })
    .then((response) => {
      if (response.data.error) {
        loginError.value = response.data.error;
        alert.error(loginError.value);
      } else {
        user.login(response.data);
        alert.success(t("authModal.login.loadingText"));
        window.location.href = "/app#subscription_plans";
      }
    })
    .catch((error) => {
      alert.error(error.message.includes("timeout") ? t("authModal.errors.networkError") : t("authModal.errors.invalidCredentials"));
    })
    .finally(() => {
      loadingReg.value = false;
    });
}

onMounted(() => {});
</script>

<template>
  <div class="modal fade" id="authModal" tabindex="-1" role="dialog" aria-labelledby="authModal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down" role="document">
      <div class="modal-content rounded">
        <div class="modal-body p-0">
          <div class="card position-relative h-100 border-gray-300 p-3 px-md-4">
            <div class="card-body">
              <div class="position-absolute top-0 end-0 m-4">
                <button type="button" class="btn btn-light-danger btn-icon btn-sm" data-bs-dismiss="modal" aria-label="Close">
                  <i class="fa-solid fa-times m-0 p-0"></i>
                </button>
              </div>

              <form @submit.prevent="sumitLogin()" v-if="signIn == 'login'" class="form w-100 h-100">
                <div class="text-center mb-10">
                  <h1 class="text-dark mb-3">{{ $t("authModal.login.title") }}</h1>
                  <div class="text-gray-400 fw-semibold fs-4">
                    {{ $t("authModal.login.newHere") }}
                    <a @click="signIn = 'create'" role="button" class="link-primary fw-bold">
                      {{ $t("authModal.login.createAccount") }}
                    </a>
                  </div>
                </div>

                <div class="fv-row mb-10">
                  <label class="form-label fs-6 fw-bold text-dark">{{ $t("authModal.login.emailLabel") }}</label>
                  <input class="form-control form-control-lg form-control-solid" type="text" v-model="form.email" />
                </div>

                <div class="fv-row mb-10">
                  <div class="d-flex flex-stack mb-2">
                    <label class="form-label fw-bold text-dark fs-6 mb-0">{{ $t("authModal.login.passwordLabel") }}</label>
                    <a @click="signIn = 'reset'" role="button" class="link-primary fs-6 fw-bold">
                      {{ $t("authModal.login.forgotPassword") }}
                    </a>
                  </div>
                  <div class="input-group">
                    <input class="form-control form-control-lg form-control-solid" :type="passType" v-model="form.password" />
                    <span class="input-group-text border-0">
                      <a role="button" @click="passType = passType === 'text' ? 'password' : 'text'">
                        <i :class="passType === 'text' ? 'la-eye-slash' : 'la-eye'" class="las fs-1"></i>
                      </a>
                    </span>
                  </div>
                </div>

                <div class="text-center">
                  <button type="submit" class="btn btn-lg btn-primary w-100 mb-5" :class="loadingReg ? 'disabled' : ''">
                    <span v-if="!loadingReg">{{ $t("authModal.login.submitText") }}</span>
                    <span v-else>
                      {{ $t("authModal.login.loadingText") }}
                      <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  </button>
                  <p v-if="loginError" class="alert alert-danger p-3 py-1">{{ loginError }}</p>
                </div>
              </form>

              <form v-else-if="signIn == 'create'" class="form w-100" @submit.prevent="register()">
                <div class="mb-10 text-center">
                  <h1 class="text-dark mb-3">{{ $t("authModal.register.title") }}</h1>
                  <div class="text-gray-400 fw-semibold fs-4">
                    {{ $t("authModal.register.alreadyHaveAccount") }}
                    <a @click="signIn = 'login'" role="button" class="link-primary fw-bold">
                      {{ $t("authModal.register.signIn") }}
                    </a>
                  </div>
                </div>

                <div class="row fv-row mb-7">
                  <div class="col">
                    <label class="form-label fw-bold text-dark fs-6">{{ $t("authModal.register.nameLabel") }}</label>
                    <input class="form-control form-control-lg form-control-solid" type="text" v-model="form.name" />
                  </div>
                </div>

                <div class="fv-row mb-7">
                  <label class="form-label fw-bold text-dark fs-6">{{ $t("authModal.register.emailLabel") }}</label>
                  <input class="form-control form-control-lg form-control-solid" type="email" v-model="form.email" />
                </div>

                <div class="fv-row mb-10">
                  <label class="form-label fw-bold text-dark fs-6">{{ $t("authModal.register.passwordLabel") }}</label>
                  <input class="form-control form-control-lg form-control-solid" :type="passType" v-model="form.password" />
                </div>

                <div class="fv-row mb-5">
                  <label class="form-label fw-bold text-dark fs-6">{{ $t("authModal.register.confirmPasswordLabel") }}</label>
                  <input class="form-control form-control-lg form-control-solid" :type="passType" v-model="form.cPassword" />
                </div>

                <div class="text-center">
                  <button type="submit" class="btn btn-lg btn-primary">
                    <span v-if="!loadingReg">{{ $t("authModal.register.submitText") }}</span>
                    <span v-else>
                      {{ $t("authModal.register.loadingText") }}
                      <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  </button>
                </div>
              </form>

              <RequestPassReset v-if="signIn == 'reset'" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

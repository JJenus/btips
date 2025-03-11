<script setup>
import { ref, inject } from "vue";
import axios from "axios";
import { alert } from "../../stores/utility";
import { user as appUser } from "../../stores/user";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const env = import.meta.env;
const user = inject("user");
const permitDelete = ref(false);
const loading = ref(false);

function closeAccount() {
  if (permitDelete.value) {
    loading.value = true;
    user.value.status = "deleted";
    let config = {
      method: "PUT",
      url: `${env.VITE_BE_API}/users`,
      data: user.value,
    };
    axios
      .request(config)
      .then((res) => {
        console.log(res.data);
        appUser.logout();
        alert.error(t("app.deactivate.alerts.accountDeleted"));

        setTimeout(() => {
          user.logout();
        }, 5000);
      })
      .catch((err) => {
        alert.error(t("app.deactivate.alerts.failed"));
        console.log(err);
      })
      .finally(() => {
        loading.value = false;
      });
  } else {
    alert.info(t("app.deactivate.alerts.checkToPermit"));
  }
}

function disable() {
  return loading.value ? "disabled" : permitDelete.value ? "" : "disabled";
}
</script>

<template>
  <div class="card" id="deactivate_account" data-kt-scroll-offset="{default: 80, md: 30}">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_deactivate"
      aria-expanded="true"
      aria-controls="kt_account_deactivate"
    >
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">{{ $t("app.deactivate.title") }}</h3>
      </div>
    </div>
    <!--end::Card header-->

    <!--begin::Content-->
    <div class="collapse show">
      <!--begin::Form-->
      <form id="kt_account_deactivate_form" class="form">
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--begin::Notice-->
          <div class="notice d-flex bg-light-warning rounded border-warning border border-dashed mb-9 p-6">
            <span class="svg-icon svg-icon-2tx svg-icon-warning me-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="currentColor" />
                <rect x="11" y="14" width="7" height="2" rx="1" transform="rotate(-90 11 14)" fill="currentColor" />
                <rect x="11" y="17" width="2" height="2" rx="1" transform="rotate(-90 11 17)" fill="currentColor" />
              </svg>
            </span>

            <div class="d-flex flex-stack flex-grow-1">
              <div class="fw-semibold">
                <h4 class="text-gray-900 fw-bold">
                  {{ $t("app.deactivate.noticeTitle") }}
                </h4>
                <div class="fs-6 text-gray-700">
                  {{ $t("app.deactivate.noticeDescription") }}
                </div>
              </div>
            </div>
          </div>
          <!--end::Notice-->

          <!--begin::Form input row-->
          <div class="form-check form-check-solid fv-row">
            <input name="deactivate" class="form-check-input" type="checkbox" v-model="permitDelete" />
            <label class="form-check-label fw-semibold ps-2 fs-6" for="deactivate">
              {{ $t("app.deactivate.confirmText") }}
            </label>
          </div>
          <!--end::Form input row-->
        </div>
        <!--end::Card body-->

        <!--begin::Card footer-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button :class="disable()" @click="closeAccount()" type="button" class="btn btn-danger fw-semibold">
            <span v-if="!loading">{{ $t("app.deactivate.button") }}</span>
            <span v-else>
              {{ $t("app.deactivate.deleting") }} <span class="spinner-border spinner-border-sm"></span>
            </span>
          </button>
        </div>
        <!--end::Card footer-->
      </form>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
</template>

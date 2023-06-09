<script setup>
  import { inject, ref } from "vue";
  import { user } from "../../stores/user";
  import { alert } from "../../stores/utility";
  import axios from "axios";

  import * as filestack from "filestack-js";

  const env = import.meta.env;

  const avatar = ref(user.defaultAvatar());
  const User = inject("user");

  const client = filestack.init(env.VITE_FSHARE_KEY);

  const loading = ref(false);
  const imgFile = ref(null);
  const changed = ref(false);

  function saveImage() {
    changed.value = false;
    client
      .upload(imgFile.value)
      .then((res) => {
        console.log("success: ", res);

        User.value.imgUrl = res.url;
        save();
      })
      .catch((err) => {
        console.log(err);
        alert.error("Failed", "Please check your connection.");
      });
  }

  function newImage(evt) {
    const input = evt.target;

    if (input.files && input.files[0]) {
      imgFile.value = input.files[0];
      // user.value.imgUrl = URL.createObjectURL(input.files[0]);
      alert.info("New image Selected");
      changed.value = true;
    }
  }

  function submit($evt) {
    if (!$evt.target.checkValidity()) {
      alert.error("Fill form correctly");
      return;
    }
    loading.value = true;

    if (imgFile.value !== null && changed.value) {
      saveImage();
    } else {
      save();
    }
  }

  function save() {
    let config = {
      method: "PUT",
      url: `${env.VITE_BE_API}/users`,
      data: User.value,
    };
    axios
      .request(config)
      .then((res) => {
        const data = res.data;
        User.value = data;

        alert.success("Success");
      })
      .catch((err) => {
        alert.error("Failed");
        console.log(err);
      })
      .finally(() => {
        loading.value = false;
      });
  }
</script>

<template>
  <div
    class="card mb-5 mb-xl-10"
    id="profile_details"
    data-kt-scroll-offset="{default: 80, md: 30}"
  >
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_profile_details"
      aria-expanded="true"
      aria-controls="kt_account_profile_details"
    >
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Profile Details</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Content-->
    <div class="collapse show">
      <!--begin::Form-->
      <form
        @submit.prevent="submit($event)"
        class="form needs-validation"
        novalidate
      >
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semibold fs-6"
              >Avatar</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Image input-->
              <div
                class="image-input image-input-outline"
                data-kt-image-input="true"
                style="
                  background-image: url('/assets/media/svg/avatars/blank.svg');
                "
              >
                <!--begin::Preview existing avatar-->
                <div
                  class="image-input-wrapper w-125px h-125px"
                  :style="`background-image: url(${User.imgUrl || avatar});`"
                ></div>
                <!--end::Preview existing avatar-->

                <!--begin::Label-->
                <label
                  class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="change"
                  data-bs-toggle="tooltip"
                  title="Change avatar"
                >
                  <i class="bi bi-pencil-fill fs-7"></i>

                  <!--begin::Inputs-->
                  <input
                    @change="newImage($event)"
                    type="file"
                    name="avatar"
                    accept=".png, .jpg, .jpeg"
                  />
                  <input type="hidden" name="avatar_remove" />
                  <!--end::Inputs-->
                </label>
                <!--end::Label-->

                <!--begin::Cancel-->
                <span
                  class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="cancel"
                  data-bs-toggle="tooltip"
                  title="Cancel avatar"
                >
                  <i class="bi bi-x fs-2"></i>
                </span>
                <!--end::Cancel-->

                <!--begin::Remove-->
                <span
                  @click="imgFile = null"
                  class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="remove"
                  data-bs-toggle="tooltip"
                  title="Remove avatar"
                >
                  <i class="bi bi-x fs-2"></i>
                </span>
                <!--end::Remove-->
              </div>
              <!--end::Image input-->

              <!--begin::Hint-->
              <div class="form-text">Allowed file types: png, jpg, jpeg.</div>
              <!--end::Hint-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semibold fs-6"
              >Full Name</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <input
                type="text"
                name="fname"
                class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                placeholder="Full name"
                v-model="User.name"
                required
              />
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semibold fs-6">
              <span class="">
                Contact Phone <span class="small text-muted">(optional)</span>
              </span>

              <i
                class="fas fa-exclamation-circle ms-1 fs-7"
                data-bs-toggle="tooltip"
                title="Phone number must be active"
              ></i>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <input
                type="text"
                name="phone"
                class="form-control form-control-lg form-control-solid"
                placeholder="Phone number"
                v-model="User.phone"
              />
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semibold fs-6">
              Address
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <input
                type="text"
                name="address"
                class="form-control form-control-lg form-control-solid"
                v-model="User.address"
                required
              />
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semibold fs-6">
              <span class="required">Country</span>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <input
                type="text"
                name="country"
                class="form-control form-control-lg form-control-solid"
                v-model="User.country"
                required
              />
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semibold fs-6"
              >City</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <input
                name="city"
                type="text"
                class="form-control form-control-lg form-control-solid"
                v-model="User.city"
                required
              />
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semibold fs-6">
              ZIP Code <span class="small text-muted">(optional)</span>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <!--begin::Input-->
              <input
                type="text"
                name="zip"
                class="form-control form-control-lg form-control-solid"
                v-model="User.zipcode"
              />
              <!--end::Input-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
        </div>
        <!--end::Card body-->

        <!--begin::Actions-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button
            type="reset"
            class="btn btn-light btn-active-light-primary me-2"
          >
            Discard
          </button>

          <button
            type="submit"
            class="btn btn-primary"
            :class="loading ? 'disabled' : ''"
          >
            <span v-if="!loading">Save Changes</span>
            <span v-else>
              Saving... <span class="spinner-border spinner-border-sm"></span>
            </span>
          </button>
        </div>
        <!--end::Actions-->
      </form>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
</template>

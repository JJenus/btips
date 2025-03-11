<script setup>
	import { inject, ref } from "vue";
	import { user } from "../../stores/user";
	import { alert } from "../../stores/utility";
	import axios from "axios";
	import * as filestack from "filestack-js";
	import { useI18n } from "vue-i18n"; // Import useI18n

	const { t } = useI18n(); // Destructure t from useI18n

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
				alert.error(
					t("profile.alerts.failed"),
					t("profile.alerts.checkConnection")
				); // Use t()
			});
	}

	function newImage(evt) {
		const input = evt.target;

		if (input.files && input.files[0]) {
			imgFile.value = input.files[0];
			alert.info(t("profile.alerts.newImageSelected")); // Use t()
			changed.value = true;
		}
	}

	function submit($evt) {
		if (!$evt.target.checkValidity()) {
			alert.error(
				t("profile.alerts.failed"),
				t("profile.alerts.fillFormCorrectly")
			); // Use t()
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

				alert.success(t("profile.alerts.accountUpdated")); // Use t()
			})
			.catch((err) => {
				alert.error(t("profile.alerts.failed")); // Use t()
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
		<div
			class="card-header border-0 cursor-pointer"
			role="button"
			data-bs-toggle="collapse"
			data-bs-target="#kt_account_profile_details"
			aria-expanded="true"
			aria-controls="kt_account_profile_details"
		>
			<div class="card-title m-0">
				<h3 class="fw-bold m-0">{{ $t("app.profile.title") }}</h3>
			</div>
		</div>

		<div class="collapse show">
			<form
				@submit.prevent="submit($event)"
				class="form needs-validation"
				novalidate
			>
				<div class="card-body border-top p-9">
					<div class="row mb-6">
						<label class="col-lg-4 col-form-label fw-semibold fs-6">
							{{ $t("app.profile.avatar") }}
						</label>

						<div class="col-lg-8">
							<div
								class="image-input image-input-outline"
								data-kt-image-input="true"
								style="
									background-image: url('/assets/media/svg/avatars/blank.svg');
								"
							>
								<div
									class="image-input-wrapper w-125px h-125px"
									:style="`background-image: url(${
										User.imgUrl || avatar
									});`"
								></div>

								<label
									class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
									data-kt-image-input-action="change"
									data-bs-toggle="tooltip"
									:title="$t('app.profile.changeAvatar')"
								>
									<i class="bi bi-pencil-fill fs-7"></i>
									<input
										@change="newImage($event)"
										type="file"
										name="avatar"
										accept=".png, .jpg, .jpeg"
									/>
									<input type="hidden" name="avatar_remove" />
								</label>

								<span
									class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
									data-kt-image-input-action="cancel"
									data-bs-toggle="tooltip"
									:title="$t('app.profile.cancelAvatar')"
								>
									<i class="bi bi-x fs-2"></i>
								</span>

								<span
									@click="imgFile = null"
									class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
									data-kt-image-input-action="remove"
									data-bs-toggle="tooltip"
									:title="$t('app.profile.removeAvatar')"
								>
									<i class="bi bi-x fs-2"></i>
								</span>
							</div>

							<div class="form-text">
								{{ $t("app.profile.avatarHint") }}
							</div>
						</div>
					</div>

					<div class="row mb-6">
						<label
							class="col-lg-4 col-form-label required fw-semibold fs-6"
						>
							{{ $t("app.profile.fullName") }}
						</label>

						<div class="col-lg-8">
							<input
								type="text"
								name="fname"
								class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
								:placeholder="$t('app.profile.fullName')"
								v-model="User.name"
								required
							/>
						</div>
					</div>

					<div class="row mb-6">
						<label class="col-lg-4 col-form-label fw-semibold fs-6">
							<span class="">
								{{ $t("app.profile.phone") }}
								<span class="small text-muted">{{
									$t("app.profile.phoneHint")
								}}</span>
							</span>

							<i
								class="fas fa-exclamation-circle ms-1 fs-7"
								data-bs-toggle="tooltip"
								:title="$t('app.profile.phoneTooltip')"
							></i>
						</label>

						<div class="col-lg-8 fv-row">
							<input
								type="text"
								name="phone"
								class="form-control form-control-lg form-control-solid"
								:placeholder="$t('app.profile.phone')"
								v-model="User.phone"
							/>
						</div>
					</div>

					<div class="row mb-6">
						<label
							class="col-lg-4 col-form-label required fw-semibold fs-6"
						>
							{{ $t("app.profile.address") }}
						</label>

						<div class="col-lg-8 fv-row">
							<input
								type="text"
								name="address"
								class="form-control form-control-lg form-control-solid"
								v-model="User.address"
								required
							/>
						</div>
					</div>

					<div class="row mb-6">
						<label class="col-lg-4 col-form-label fw-semibold fs-6">
							<span class="required">{{
								$t("app.profile.country")
							}}</span>
						</label>

						<div class="col-lg-8 fv-row">
							<input
								type="text"
								name="country"
								class="form-control form-control-lg form-control-solid"
								v-model="User.country"
								required
							/>
						</div>
					</div>

					<div class="row mb-6">
						<label
							class="col-lg-4 col-form-label required fw-semibold fs-6"
						>
							{{ $t("app.profile.city") }}
						</label>

						<div class="col-lg-8 fv-row">
							<input
								name="city"
								type="text"
								class="form-control form-control-lg form-control-solid"
								v-model="User.city"
								required
							/>
						</div>
					</div>

					<div class="row mb-6">
						<label class="col-lg-4 col-form-label fw-semibold fs-6">
							{{ $t("app.profile.zip") }}
							<span class="small text-muted">{{
								$t("app.profile.zipHint")
							}}</span>
						</label>

						<div class="col-lg-8 fv-row">
							<input
								type="text"
								name="zip"
								class="form-control form-control-lg form-control-solid"
								v-model="User.zipcode"
							/>
						</div>
					</div>
				</div>

				<div class="card-footer d-flex justify-content-end py-6 px-9">
					<button
						type="reset"
						class="btn btn-light btn-active-light-primary me-2"
					>
						{{ $t("app.profile.discard") }}
					</button>

					<button
						type="submit"
						class="btn btn-primary"
						:class="loading ? 'disabled' : ''"
					>
						<span v-if="!loading">{{
							$t("app.profile.saveChanges")
						}}</span>
						<span v-else>
							{{ $t("app.profile.saving") }}
							<span
								class="spinner-border spinner-border-sm"
							></span>
						</span>
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

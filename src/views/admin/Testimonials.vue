<script setup>
	import { onMounted, ref, provide } from "vue";
	import Testimony from "../../components/admin/Testimony.vue";
	import { user } from "../../stores/user";
	import { alert } from "../../stores/utility";
	import axios from "axios";

	import * as filestack from "filestack-js";

	const env = import.meta.env;
	const client = filestack.init(env.VITE_FSHARE_KEY);
	const avatar = ref(user.defaultAvatar());

	provide("testimonials", loadTestifiers);

	const testimonials = ref([]);
	const form = ref({
		userName: "",
		testimony: "",
		rating: 0,
		imgUrl: null,
	});

	const loading = ref(false);
	const imgFile = ref(null);
	const changed = ref(false);

	function saveImage() {
		changed.value = false;
		client
			.upload(imgFile.value)
			.then((res) => {
				window.debug.log("success: ", res);
				form.value.imgUrl = res.url;

				save();
			})
			.catch((err) => {
				window.debug.log(err);
				alert.error("Failed", "Please check your connection.");
			});
	}

	function newImage(evt) {
		const input = evt.target;

		if (input.files && input.files[0]) {
			imgFile.value = input.files[0];
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
			method: "POST",
			data: form.value,
			url: `${env.VITE_BE_API}/testimonials`,
		};

		window.debug.log(form.value);

		axios
			.request(config)
			.then((res) => {
				alert.success("Testimony added");
				loadTestifiers();
			})
			.catch((error) => {
				alert.success("Testimony added");
				window.debug.log(error);
			})
			.finally(() => {
				loading.value = false;
			});
	}

	function loadTestifiers() {
		let config = {
			method: "GET",
			url: `${env.VITE_BE_API}/testimonials`,
		};

		axios
			.request(config)
			.then((res) => {
				window.debug.log(res);
				let data = res.data;
				testimonials.value = data;
			})
			.catch((error) => {
				window.debug.log(error);
			})
			.finally(() => {});
	}

	onMounted(() => {
		loadTestifiers();
	});
</script>

<template>
	<div
		class="card mb-5 mb-xl-10"
		id="testimonials"
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
				<h3 class="fw-bold m-0">Testimonials</h3>
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
									:style="`background-image: url(${avatar});`"
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
							<div class="form-text">
								Allowed file types: png, jpg, jpeg.
							</div>
							<!--end::Hint-->
						</div>
						<!--end::Col-->
					</div>
					<!--end::Input group-->

					<div class="row g-4">
						<div class="col-md-6">
							<label for="validationCustom01" class="form-label"
								>Name</label
							>
							<input
								v-model="form.userName"
								type="text"
								class="form-control"
								id="validationCustom01"
								required
							/>
							<div class="valid-feedback">Looks good!</div>
						</div>

						<div class="col-md-6">
							<label
								for="validationCufddfdrstom01"
								class="form-label"
								>Rating</label
							>
							<select
								v-model="form.rating"
								class="form-select"
								id="validationCufddfdrstom01"
							>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</select>
							<div class="valid-feedback">Looks good!</div>
						</div>

						<div class="col-md-12">
							<label for="validationCustom03" class="form-label"
								>Testimony</label
							>
							<textarea
								v-model="form.testimony"
								class="form-control"
								id="validationCustom03"
								required
								placeholder="The testimony"
								rows="4"
							></textarea>
							<div class="invalid-feedback">
								Field must not be empty.
							</div>
						</div>
					</div>
				</div>
				<!--end::Card body-->

				<!--begin::Actions-->
				<div class="card-footer py-6 px-9">
					<div class="d-flex justify-content-end">
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
								Saving...
								<span
									class="spinner-border spinner-border-sm"
								></span>
							</span>
						</button>
					</div>

					<hr />
					<div class="row mt-3 w-100">
						<Testimony
							v-for="testimonial in testimonials"
							:testimony="testimonial"
						/>
					</div>
				</div>
				<!--end::Actions-->
			</form>
			<!--end::Form-->
		</div>
		<!--end::Content-->
	</div>
</template>

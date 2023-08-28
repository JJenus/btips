<script setup>
	import { onMounted } from "vue";
	import { ref } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import axios from "axios";
	import { alert } from "../stores/utility";

	const env = import.meta.env;

	const router = useRouter();
	const route = useRoute();

	const appName = import.meta.env.VITE_APP_NAME;
	const passwordType = ref("password");
	const loadingReset = ref(false);
	const timeUp = ref(false);

	const form = ref({
		token: "",
		password: "",
	});

	function submitReset() {
		let config = {
			method: "Post",
			url: `${env.VITE_BE_API}/auth/change-password`,
			data: form.value,
		};

		loadingReset.value = true;

		axios
			.request(config)
			.then((response) => {
				console.log(response.data);
				alert.success("Reset success");
				setTimeout(() => {
					location.href = "/";
				}, 5000);
			})
			.catch(function (error) {
				console.log(error);
				alert.error(error.data);
			})
			.finally(() => {
				loadingReset.value = false;
			});
	}

	onMounted(async () => {
		await router.isReady();
		const token = route.query["id"]
		console.log(token);
		if (token) {
			form.value.token = token;
		}
		setTimeout(() => {
			if (!form.value.token) {
				timeUp.value = true;
			}
		}, 4000);
	});
</script>
<template>
	<div class="auth-bg app-blank">
		<div class="d-flex flex-column flex-root vh-100" id="kt_app_root">
			<!--begin::Authentication - New password -->
			<div class="d-flex flex-column flex-lg-row flex-column-fluid">
				<!--begin::Aside-->
				<div
					class="d-flex flex-column flex-lg-row-auto bg-primary w-xl-600px positon-xl-relative"
				>
					<!--begin::Wrapper-->
					<div
						class="d-flex flex-column position-xl-fixed top-0 bottom-0 w-xl-600px scroll-y"
					>
						<!--begin::Header-->
						<div
							class="d-flex flex-row-fluid flex-center flex-column text-center p-5 p-lg-20"
						>
							<!--begin::Logo-->
							<a href="/" class="py-9 pt-lg-20">
								<img
									alt="Logo"
									src="/assets/logo-default.png"
									class="h-35px h-lg-40px"
								/>
							</a>
							<!--end::Logo-->

							<!--begin::Title-->
							<h1
								class="d-none d-lg-block fw-bold text-white fs-2qx pb-5 pb-md-10"
							>
								Welcome to {{ appName }}
							</h1>
							<!--end::Title-->

							<!--begin::Description-->
							<p
								class="d-none d-lg-block fw-semibold fs-2 text-white"
							>
								Forgot your password?
								<br />
								No worries
							</p>
							<!--end::Description-->
						</div>
						<!--end::Header-->
					</div>
					<!--end::Wrapper-->
				</div>
				<!--begin::Aside-->

				<!--begin::Body-->
				<div class="d-flex flex-column flex-lg-row-fluid py-10">
					<!--begin::Content-->
					<div
						class="d-flex flex-center flex-column flex-column-fluid"
					>
						<!--begin::Wrapper-->
						<div class="w-lg-550px p-10 p-lg-15 mx-auto">
							<div
								v-if="!form.token"
								class="h-100 d-flex align-items-center justify-content-center"
							>
								<div
									v-if="timeUp"
									class="d-flex flex-column align-items-center justify-content-center"
								>
									<span
										class="text-gray-400 fw-semibold fs-4 mb-5"
									>
										Make sure to follow the instructions
										sent to your email. <br />
										Go back to home and resend.
									</span>
									<a href="/" class="btn btn-primary">Home</a>
								</div>
								<span
									v-else
									class="spinner-border spinner-border-lg"
								></span>
							</div>
							<!--begin::Form-->
							<form
								v-else
								class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
								novalidate
								@submit.prevent="submitReset()"
							>
								<!--begin::Heading-->
								<div class="text-center mb-10">
									<!--begin::Title-->
									<h1 class="text-dark mb-3">
										Setup New Password
									</h1>
									<!--end::Title-->

									<!--begin::Link-->
									<div class="text-gray-400 fw-semibold fs-4">
										Already have reset your password ?

										<a
											href="/"
											class="link-primary fw-bold"
										>
											Sign in here
										</a>
									</div>
									<!--end::Link-->
								</div>
								<!--begin::Heading-->

								<!--begin::Input group-->
								<div
									class="mb-10 fv-row fv-plugins-icon-container"
									data-kt-password-meter="true"
								>
									<!--begin::Wrapper-->
									<div class="mb-1">
										<!--begin::Label-->
										<label
											class="form-label fw-bold text-dark fs-6"
										>
											Password
										</label>
										<!--end::Label-->

										<!--begin::Input wrapper-->
										<div class="position-relative mb-3">
											<input
												class="form-control form-control-lg form-control-solid"
												:type="passwordType"
												placeholder=""
												name="password"
												autocomplete="off"
												v-model="form.password"
											/>

											<span
												class="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
											>
												<i
													v-if="
														passwordType ==
														'password'
													"
													@click="
														passwordType = 'text'
													"
													class="bi bi-eye-slash fs-2"
												></i>

												<i
													v-else
													@click="
														passwordType =
															'password'
													"
													class="bi bi-eye fs-2"
												></i>
											</span>
										</div>
										<!--end::Input wrapper-->
									</div>
									<!--end::Wrapper-->

									<div
										class="fv-plugins-message-container invalid-feedback"
									></div>
								</div>
								<!--end::Input group--->

								<!--begin::Input group--->
								<div
									class="fv-row mb-10 fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid"
								>
									<div
										class="form-check form-check-custom form-check-solid form-check-inline"
									>
										<input
											class="form-check-input"
											type="checkbox"
											name="toc"
											value="1"
										/>

										<label
											class="form-check-label fw-semibold text-gray-700 fs-6"
										>
											I Agree &amp;

											<a
												href="#"
												class="ms-1 link-primary"
												>Terms and conditions</a
											>.
										</label>
									</div>
									<div
										class="fv-plugins-message-container invalid-feedback"
									>
										<div
											data-field="toc"
											data-validator="notEmpty"
										>
											You must accept the terms and
											conditions
										</div>
									</div>
								</div>
								<!--end::Input group--->

								<!--begin::Action-->
								<div class="text-center">
									<button
										type="submit"
										id="kt_new_password_submit"
										class="btn btn-lg btn-primary fw-bold"
									>
										<span v-if="!loadingReset">
											Submit
										</span>
										<span v-else>
											Please wait...
											<span
												class="spinner-border spinner-border-sm align-middle ms-2"
												role="status"
												aria-hidden="true"
											></span>
										</span>
									</button>
								</div>
								<!--end::Action-->
								<div></div>
							</form>
							<!--end::Form-->
						</div>
						<!--end::Wrapper-->
					</div>
					<!--end::Content-->
				</div>
				<!--end::Body-->
			</div>
			<!--end::Authentication - New password-->
		</div>
	</div>
</template>

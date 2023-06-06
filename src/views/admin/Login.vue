<script setup>
	import { ref } from "vue";
	import axios from "axios";
	import { user } from "@/stores/user";
	import { alert } from "@/stores/utility";

	const env = import.meta.env;

	console.log(env.VITE_BE_API);

	const loading = ref(false);

	const form = ref({
		name: null,
		email: null,
		password: null,
		cPassword: null,
	});

	const loginError = ref(null);

	async function submitLogin() {
		if (loading.value) {
			return;
		}
		if (!form.value.email || !form.value.password) {
			loginError.value = "Please fill form correctly";
			alert.error(loginError.value);
			return;
		}

		console.log(loginError.value);

		loading.value = true;

		const { email, password } = form.value;
		console.log(email);

		let config = {
			method: "Post",
			url: `${env.VITE_BE_API}/auth/login`,
			data: {
				email,
				password,
			},
		};

		axios
			.request(config)
			.then((response) => {
				console.log(response.data);
				if (response.data.error) {
					loginError.value = response.data.error;
				} else {
					user.login(response.data);
					window.location.href = "/admin";
				}
			})
			.catch(function (error) {
				console.log(error);
			})
			.finally(() => {
				loading.value = false;
			});
	}
</script>

<template>
	<div
		class="container d-flex align-items-center flex-wrap justify-content-center h-100 pt-5"
	>
		<div
			class="d-flex flex-center flex-column flex-column-fluid"
			bis_skin_checked="1"
		>
			<!--begin::Wrapper-->
			<div class="w-lg-500px p-10 p-lg-15 mx-auto" bis_skin_checked="1">
				<!--begin::Form-->
				<form
					@submit.prevent="submitLogin()"
					class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework needs-validation"
					novalidate
				>
					<!--begin::Heading-->
					<div class="text-center mb-10" bis_skin_checked="1">
						<!--begin::Title-->
						<h1 class="text-dark mb-3">Sign In to Good</h1>
						<!--end::Title-->

						<!--begin::Link-->
						<div
							class="text-gray-400 fw-semibold fs-4"
							bis_skin_checked="1"
						>
							New Here?

							<a
								href="../sign-up/basic.html"
								class="link-primary fw-bold"
							>
								Create an Account
							</a>
						</div>
						<!--end::Link-->
					</div>
					<!--begin::Heading-->

					<!--begin::Input group-->
					<div
						class="fv-row mb-10 fv-plugins-icon-container"
						bis_skin_checked="1"
					>
						<!--begin::Label-->
						<label class="form-label fs-6 fw-bold text-dark"
							>Email</label
						>
						<!--end::Label-->

						<!--begin::Input-->
						<input
							class="form-control form-control-lg form-control-solid"
							type="text"
							name="email"
							autocomplete="on"
							v-model="form.email"
						/>
						<!--end::Input-->
						<div
							class="fv-plugins-message-container invalid-feedback"
							bis_skin_checked="1"
						></div>
					</div>
					<!--end::Input group-->

					<!--begin::Input group-->
					<div
						class="fv-row mb-10 fv-plugins-icon-container"
						bis_skin_checked="1"
					>
						<!--begin::Wrapper-->
						<div
							class="d-flex flex-stack mb-2"
							bis_skin_checked="1"
						>
							<!--begin::Label-->
							<label
								class="form-label fw-bold text-dark fs-6 mb-0"
								>Password</label
							>
							<!--end::Label-->

							<!--begin::Link-->
							<a
								href="#!"
								class="link-primary fs-6 fw-bold d-none"
							>
								Forgot Password ?
							</a>
							<!--end::Link-->
						</div>
						<!--end::Wrapper-->

						<!--begin::Input-->
						<input
							class="form-control form-control-lg form-control-solid"
							type="password"
							name="password"
							autocomplete="off"
							v-model="form.password"
						/>
						<!--end::Input-->
						<div
							class="fv-plugins-message-container invalid-feedback"
							bis_skin_checked="1"
						></div>
					</div>
					<!--end::Input group-->

					<!--begin::Actions-->
					<div class="text-center" bis_skin_checked="1">
						<!--begin::Submit button-->
						<button
							:class="loading ? 'disabled' : ''"
							type="submit"
							class="btn btn-lg btn-primary w-100 mb-5"
						>
							<span v-if="!loading"> Continue </span>

							<span v-else>
								Please wait...
								<span
									class="spinner-border spinner-border-sm align-middle ms-2"
								></span>
							</span>
						</button>
						<!--end::Submit button-->
					</div>
					<!--end::Actions-->
					<div bis_skin_checked="1"></div>
				</form>
				<!--end::Form-->
			</div>
			<!--end::Wrapper-->
		</div>
	</div>
</template>

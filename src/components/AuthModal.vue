<script setup>
	import { inject, onMounted, ref } from "vue";
	import axios from "axios";
	import { user } from "../stores/user";
	import { alert } from "../stores/utility";

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
		console.log("What");

		if (loadingReg.value) {
			return;
		}
		if (
			!form.value.email ||
			!form.value.name ||
			!form.value.password ||
			!form.value.cPassword
		) {
			regError.value = "Please fill form correctly";

			alert.error(regError.value);
			return;
		}

		console.log(regError.value);

		if (form.value.password !== form.value.cPassword) {
			regError.value = "Passwords don't match";
			alert.error(regError.value);
			return;
		}

		loadingReg.value = true;

		const { name, email, password } = form.value;
		console.log(email);

		let config = {
			method: "Post",
			url: `${env.VITE_BE_API}/auth/register`,
			data: {
				name,
				email,
				password,
			},
		};

		axios
			.request(config)
			.then((response) => {
				console.log(response.data);
				if (response.data.error) {
					regError.value = response.data.error;
					alert.error(regError.value);
				} else {
					user.login(response.data);
					alert.success("Signing you in. Please wait.");
					window.location.href = "/app#subscription_plans";
				}
			})
			.catch(function (error) {
				console.log(error);
				alert.error("Failed to login");
			})
			.finally(() => {
				loadingReg.value = false;
			});
	}

	function sumitLogin() {
		if (loadingReg.value) {
			return;
		}
		if (!form.value.email || !form.value.password) {
			loginError.value = "Please fill form correctly";
			alert.error(loginError.value);
			return;
		}

		console.log(loginError.value);

		loadingReg.value = true;

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
					alert.error(loginError.value);
				} else {
					user.login(response.data);
					alert.success("Authorized");
					window.location.href = "/app#subscription_plans	";
				}
			})
			.catch(function (error) {
				alert.error("Unable to login. Check your credentials.");
				console.log(error);
			})
			.finally(() => {
				loadingReg.value = false;
			});
	}

	onMounted(() => {});
</script>

<template>
	<div
		class="modal fade"
		id="authModal"
		tabindex="-1"
		role="dialog"
		aria-labelledby="authModal"
		aria-hidden="true"
	>
		<div
			class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down"
			role="document"
		>
			<div class="modal-content rounded">
				<div class="modal-body p-0">
					<div
						class="card position-relative h-100 border-gray-300 p-3 px-md-4"
					>
						<div class="card-body">
							<div class="position-absolute top-0 end-0 m-4">
								<button
									type="button"
									class="btn btn-light-danger btn-icon btn-sm"
									data-bs-dismiss="modal"
									aria-label="Close"
								>
									<i class="fa-solid fa-times m-0 p-0"></i>
								</button>
							</div>
							<!--begin::Form-->
							<form
								@submit.prevent="sumitLogin()"
								v-if="signIn"
								class="form w-100 h-100"
								novalidate="novalidate"
								id="kt_sign_in_form"
							>
								<!--begin::Heading-->
								<div class="text-center mb-10">
									<!--begin::Title-->
									<h1 class="text-dark mb-3">
										Sign In to Good
									</h1>
									<!--end::Title-->

									<!--begin::Link-->
									<div class="text-gray-400 fw-semibold fs-4">
										New Here?

										<a
											@click="signIn = false"
											role="button"
											class="link-primary fw-bold"
										>
											Create an Account
										</a>
									</div>
									<!--end::Link-->
								</div>
								<!--begin::Heading-->

								<!--begin::Input group-->
								<div class="fv-row mb-10">
									<!--begin::Label-->
									<label
										class="form-label fs-6 fw-bold text-dark"
										>Email</label
									>
									<!--end::Label-->

									<!--begin::Input-->
									<input
										class="form-control form-control-lg form-control-solid"
										type="text"
										name="email"
										autocomplete="off"
										v-model="form.email"
									/>
									<!--end::Input-->
								</div>
								<!--end::Input group-->

								<!--begin::Input group-->
								<div class="fv-row mb-10">
									<!--begin::Wrapper-->
									<div class="d-flex flex-stack mb-2">
										<!--begin::Label-->
										<label
											class="form-label fw-bold text-dark fs-6 mb-0"
											>Password</label
										>
										<!--end::Label-->

										<!--begin::Link-->
										<a
											href=""
											class="d-none link-primary fs-6 fw-bold"
										>
											Forgot Password ?
										</a>
										<!--end::Link-->
									</div>
									<!--end::Wrapper-->

									<!--begin::Input-->
									<div class="input-group">
										<input
											class="form-control form-control-lg form-control-solid"
											:type="passType"
											name="password"
											autocomplete="off"
											v-model="form.password"
										/>
										<span class="input-group-text border-0">
											<a
												role="button"
												@click="
													passType == 'text'
														? (passType =
																'password')
														: (passType = 'text')
												"
											>
												<i
													:class="
														passType == 'text'
															? 'la-eye-slash'
															: 'la-eye'
													"
													class="las fs-1"
												></i>
											</a>
										</span>
									</div>
									<!--end::Input-->
								</div>
								<!--end::Input group-->

								<!--begin::Actions-->
								<div class="text-center">
									<!--begin::Submit button-->
									<button
										type="submit"
										id="kt_sign_in_submit"
										class="btn btn-lg btn-primary w-100 mb-5"
										:class="loadingReg ? 'disabled' : ''"
									>
										<span v-if="!loadingReg">
											Continue
										</span>
										<span v-else>
											Signing In...
											<span
												class="spinner-border spinner-border-sm align-middle ms-2"
												role="status"
												aria-hidden="true"
											></span>
										</span>
									</button>
									<!--end::Submit button-->

									<p
										v-if="loginError != null"
										class="alert alert-danger p-3 py-1"
									>
										{{ loginError }}
									</p>
								</div>
								<!--end::Actions-->
							</form>

							<!--begin::Form-->
							<form
								v-else
								class="form w-100"
								novalidate="novalidate"
								id="kt_sign_up_form"
								@submit.prevent="register()"
							>
								<!--begin::Heading-->
								<div class="mb-10 text-center">
									<!--begin::Title-->
									<h1 class="text-dark mb-3">
										Create an Account
									</h1>
									<!--end::Title-->

									<!--begin::Link-->
									<div class="text-gray-400 fw-semibold fs-4">
										Already have an account?

										<a
											@click="signIn = true"
											role="button"
											class="link-primary fw-bold"
										>
											Sign in here
										</a>
									</div>
									<!--end::Link-->
								</div>
								<!--end::Heading-->

								<!--begin::Separator-->
								<div class="d-flex align-items-center mb-10">
									<div
										class="border-bottom border-gray-300 mw-50 w-100"
									></div>
									<span
										class="fw-semibold text-gray-400 fs-7 mx-2"
										>YES</span
									>
									<div
										class="border-bottom border-gray-300 mw-50 w-100"
									></div>
								</div>
								<!--end::Separator-->

								<!--begin::Input group-->
								<div class="row fv-row mb-7">
									<!--begin::Col-->
									<div class="col">
										<label
											class="form-label fw-bold text-dark fs-6"
											>Name</label
										>
										<input
											class="form-control form-control-lg form-control-solid"
											type="text"
											placeholder=""
											name="first-name"
											autocomplete="off"
											v-model="form.name"
										/>
									</div>
									<!--end::Col-->
								</div>
								<!--end::Input group-->

								<!--begin::Input group-->
								<div class="fv-row mb-7">
									<label
										class="form-label fw-bold text-dark fs-6"
										>Email</label
									>
									<input
										class="form-control form-control-lg form-control-solid"
										type="email"
										placeholder=""
										name="email"
										autocomplete="off"
										v-model="form.email"
									/>
								</div>
								<!--end::Input group-->

								<!--begin::Input group-->
								<div
									class="mb-10 fv-row"
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
										<div class="input-group position-relative mb-3">
											<input
												class="form-control form-control-lg form-control-solid"
												:type="passType"
												name="password"
												autocomplete="off"
												v-model="form.password"
											/>
											<span
												class="input-group-text border-0"
											>
												<a
													role="button"
													@click="
														passType == 'text'
															? (passType =
																	'password')
															: (passType =
																	'text')
													"
												>
													<i
														:class="
															passType == 'text'
																? 'la-eye-slash'
																: 'la-eye'
														"
														class="las fs-1"
													></i>
												</a>
											</span>
										</div>
										<!--end::Input wrapper-->
									</div>
									<!--end::Wrapper-->

									<!--begin::Hint-->
									<div class="text-muted">
										Use 8 or more characters with a mix of
										letters, numbers & symbols.
									</div>
									<!--end::Hint-->
								</div>
								<!--end::Input group--->

								<!--begin::Input group-->
								<div class="fv-row mb-5">
									<label
										class="form-label fw-bold text-dark fs-6"
										>Confirm Password</label
									>
									<input
										class="form-control form-control-lg form-control-solid"
										:type="passType"
										placeholder=""
										name="confirm-password"
										autocomplete="off"
										v-model="form.cPassword"
									/>
								</div>
								<!--end::Input group-->

								<!--begin::Input group-->
								<div class="fv-row mb-10">
									<label
										class="form-check form-check-custom form-check-solid form-check-inline"
									>
										<input
											class="form-check-input"
											type="checkbox"
											name="toc"
											checked
											required
										/>
										<span
											class="form-check-label fw-semibold text-gray-700 fs-6"
										>
											I Agree
											<a
												href="#"
												class="ms-1 link-primary"
												>Terms and conditions</a
											>.
										</span>
									</label>
								</div>
								<!--end::Input group-->

								<!--begin::Actions-->
								<div class="text-center">
									<button
										type="submit"
										id="kt_sign_up_submit"
										class="btn btn-lg btn-primary"
										:class="loadingReg ? 'disabled' : ''"
									>
										<span v-if="!loadingReg"> Submit </span>
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

								<p
									v-if="regError != null"
									class="alert alert-danger p-3 py-1 mt-3"
								>
									{{ regError }}
								</p>
								<!--end::Actions-->
							</form>
							<!--end::Form-->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

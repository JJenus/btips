<script setup>
	import { ref } from "vue";
	import { inject } from "vue";
	import axios from "axios";
	import { alert } from "../../stores/utility";

	const env = import.meta.env;
	const signIn = inject("authMode");

	const resetSubmitted = ref(false);
	const loadingReset = ref(false);
	const form = ref({ email: "" });
	const wasValidated = ref(null);

	function submitReset() {
		if (!form.value.email) {
			wasValidated.value = "was-validated";
			return;
		}
		let config = {
			method: "Post",
			url: `${env.VITE_BE_API}/auth/reset-password`,
			data: form.value,
			timeout: 20000,
		};

		loadingReset.value = true;

		axios
			.request(config)
			.then((response) => {
				console.log(response.data);
				alert.success("Check your email for further instructions");
				resetSubmitted.value = true;
			})
			.catch(function (error) {
				if (error.message.includes("timeout")) {
					window.debug.log("Request timed out");
					alert.error("Please check your internet connection");
				} else {
					window.debug.log(error);
					alert.success("Email does not exist")
				}
			})
			.finally(() => {
				loadingReset.value = false;
			});
	}

	function validate() {
		wasValidated.value = null;
	}
</script>

<template>
	<form
		@keyup="validate()"
		:class="wasValidated"
		class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
		novalidate="novalidate"
		id="kt_password_reset_form"
	>
		<!--begin::Heading-->
		<div class="text-center mb-10">
			<!--begin::Title-->
			<h1 class="text-dark mb-3">Forgot Password ?</h1>
			<!--end::Title-->

			<!--begin::Link-->
			<div class="text-gray-400 fw-semibold fs-4">
				<span v-if="!resetSubmitted">
					Enter your email to reset your password.
				</span>
				<span v-else> Check your email to complete the process </span>
			</div>
			<!--end::Link-->
		</div>
		<!--begin::Heading-->

		<!--begin::Input group-->
		<div
			v-if="!resetSubmitted"
			class="fv-row mb-10 fv-plugins-icon-container"
		>
			<label class="form-label fw-bold text-gray-900 fs-6">Email</label>
			<input
				class="form-control form-control-solid"
				type="email"
				placeholder="Enter your account email"
				name="email"
				autocomplete="on"
				v-model="form.email"
				required
			/>
			<div class="fv-plugins-message-container invalid-feedback"></div>
		</div>
		<!--end::Input group-->

		<!--begin::Actions-->
		<div class="d-flex flex-wrap justify-content-center pb-lg-0">
			<button
				v-if="resetSubmitted"
				@click="resetSubmitted = false"
				class="btn btn-lg btn-warning fw-bold me-4"
			>
				Change email
			</button>
			<button
				v-else
				@click="submitReset()"
				type="button"
				id="kt_password_reset_submit"
				class="btn btn-lg btn-primary fw-bold me-4"
			>
				<span v-if="!loadingReset"> Submit </span>
				<span v-else>
					Please wait...
					<span
						class="spinner-border spinner-border-sm align-middle ms-2"
						role="status"
						aria-hidden="true"
					></span>
				</span>
			</button>

			<a
				@click="signIn = 'login'"
				role="button"
				class="btn btn-lg btn-light-primary fw-bold"
				>Back</a
			>
		</div>
		<!--end::Actions-->
		<div></div>
	</form>
</template>

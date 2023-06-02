<script setup>
	import axios from "axios";
	import { onMounted, ref } from "vue";
	import { alert } from "../../stores/utility";

	import Plan from "@/components/admin/Plan.vue";

	const env = import.meta.env;
	const plans = ref([]);
	const loading = ref(false);

	const form = ref({
		title: "",
		amount: 0,
		description: null,
		duration: "daily",
		type: "primary",
	});

	function submit($evt) {
		if (!$evt.target.checkValidity()) return;

		loading.value = true;

		let config = {
			method: "POST",
			data: form.value,
			url: `${env.VITE_BE_API}/subscriptions`,
		};

		window.debug.log(form.value);

		axios
			.request(config)
			.then((res) => {
				loadPlans();
				$evt.target.reset();
				alert.success("Created");
			})
			.catch((error) => {
				window.debug.log(error);
			})
			.finally(() => {
				loading.value = false;
			});
	}

	async function loadPlans() {
		let config = {
			method: "GET",
			url: `${env.VITE_BE_API}/subscriptions?type=all`,
		};

		axios
			.request(config)
			.then((res) => {
				window.debug.log(res);
				plans.value = res.data;
			})
			.catch((error) => {
				window.debug.log(error);
			})
			.finally(() => {});
	}

	function validateForms() {
		// Fetch all the forms we want to apply custom Bootstrap validation styles to
		var forms = document.querySelectorAll(".needs-validation");

		// Loop over them and prevent submission
		Array.prototype.slice.call(forms).forEach(function (form) {
			form.addEventListener(
				"submit",
				function (event) {
					if (!form.checkValidity()) {
						event.preventDefault();
						event.stopPropagation();
					}

					form.classList.add("was-validated");
				},
				false
			);
		});
	}

	onMounted(() => {
		loadPlans();
		validateForms();
	});
</script>

<template>
	<div
		class="card mb-5 mb-xl-10"
		id="subscription_plans"
		data-kt-scroll-offset="{default: 80, md: 30}"
	>
		<!--begin::Card header-->
		<div
			class="card-header border-0 cursor-pointer"
			role="button"
			data-bs-toggle="collapse"
			data-bs-target="#kt_account_connected_accounts"
			aria-expanded="true"
			aria-controls="kt_account_connected_accounts"
		>
			<div class="card-title m-0">
				<h3 class="fw-bold m-0">Manage Subscriptions</h3>
			</div>
		</div>
		<!--end::Card header-->

		<!--begin::Content-->
		<div class="collapse show">
			<!--begin::Card body-->
			<div class="card-body border-top p-9">
				<div class="mb-10">
					<form
						@submit.prevent="submit($event)"
						id="form"
						class="row g-3 needs-validation"
						novalidate
					>
						<div class="col-md-4">
							<label for="validationCustom01" class="form-label">
								Title
							</label>
							<input
								v-model="form.title"
								type="text"
								class="form-control"
								id="validationCustom01"
								required
							/>
							<div class="valid-feedback">Looks good!</div>
						</div>
						<div class="col-md-4">
							<label for="validationCustom02" class="form-label">
								Amount
								<small class="text-warning">
									(Do not add the currency symbol)
								</small>
							</label>
							<input
								v-model="form.amount"
								type="text"
								class="form-control"
								id="validationCustom02"
								required
							/>
							<div class="valid-feedback">Looks good!</div>
						</div>
						<div class="col-md-4">
							<label for="validationCustom04" class="form-label"
								>Duration</label
							>
							<select
								v-model="form.duration"
								class="form-select"
								id=""
								required
							>
								<option value="daily">Daily</option>
								<option value="weekly">Weekly</option>
								<option value="monthly">Monthly</option>
								<option value="yearly">Yearly</option>
							</select>
							<div class="invalid-feedback">
								Please select a valid duration.
							</div>
						</div>
						<div class="col-md-4">
							<label for="validationCustom01" class="form-label"
								>Type</label
							>
							<!-- radio-->
							<div class="d-flex">
								<div class="form-check me-3">
									<input
										v-model="form.type"
										class="form-check-input"
										type="radio"
										name="planType"
										id="flexRadioDefault1"
										:value="'primary'"
										checked
									/>
									<label
										class="form-check-label"
										for="flexRadioDefault1"
									>
										General
										<span class="small text-muted">
											(visible to all users)
										</span>
									</label>
								</div>
								<div class="form-check">
									<input
										v-model="form.type"
										class="form-check-input"
										type="radio"
										name="planType"
										id="flexRadioDefault2"
										:value="'personal'"
									/>
									<label
										class="form-check-label"
										for="flexRadioDefault2"
									>
										Personal
										<span class="small text-muted">
											(only admin can assign to a specific
											user)
										</span>
									</label>
								</div>
							</div>
						</div>

						<div class="col-md-8">
							<label for="validationCustom03" class="form-label"
								>Description</label
							>
							<textarea
								v-model="form.description"
								class="form-control"
								id="validationCustom03"
								required
								placeholder="An example description"
							></textarea>
							<div class="invalid-feedback">
								Field must not be empty.
							</div>
						</div>

						<div
							class="col-12 d-flex justify-content-end pt-9 pb-3"
						>
							<button
								:class="loading ? 'disabled' : ''"
								class="btn btn-primary btn-lg"
								type="submit"
							>
								<span v-if="!loading"> Create plan </span>
								<span v-else>
									<span
										class="spinner-border spinner-border-sm"
										role="status"
										aria-hidden="true"
									></span>
									Loading..
								</span>
							</button>
						</div>
					</form>
				</div>
				<!--begin::Notice-->
				<div
					v-if="plans.length == 0"
					class="notice d-flex bg-light-primary rounded border-primary border border-dashed my-9 p-6"
				>
					<!--begin::Icon-->
					<!--begin::Svg Icon | path: icons/duotune/art/art006.svg-->
					<span class="svg-icon svg-icon-2tx svg-icon-primary me-4"
						><svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								opacity="0.3"
								d="M22 19V17C22 16.4 21.6 16 21 16H8V3C8 2.4 7.6 2 7 2H5C4.4 2 4 2.4 4 3V19C4 19.6 4.4 20 5 20H21C21.6 20 22 19.6 22 19Z"
								fill="currentColor"
							/>
							<path
								d="M20 5V21C20 21.6 19.6 22 19 22H17C16.4 22 16 21.6 16 21V8H8V4H19C19.6 4 20 4.4 20 5ZM3 8H4V4H3C2.4 4 2 4.4 2 5V7C2 7.6 2.4 8 3 8Z"
								fill="currentColor"
							/>
						</svg>
					</span>
					<!--end::Svg Icon-->
					<!--end::Icon-->

					<!--begin::Wrapper-->
					<div class="d-flex flex-stack flex-grow-1">
						<!--begin::Content-->
						<div class="fw-semibold">
							<div class="fs-6 text-gray-700">
								Created Subscriptions will show here.
							</div>
						</div>
						<!--end::Content-->
					</div>
					<!--end::Wrapper-->
				</div>
				<!--end::Notice-->

				<h1 v-else class="mb-5">Testimonies</h1>

				<!--begin::Items-->
				<div class="py-2 g-4 row row-cols-md-2 row-cols-lg-3">
					<Plan v-for="plan in plans" :plan="plan" :admin="true" />
				</div>
				<!--end::Items-->
			</div>
			<!--end::Card body-->
		</div>
		<!--end::Content-->
	</div>
</template>

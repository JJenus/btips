<script setup>
	import { onMounted, ref } from "vue";
	import axios from "axios";
	import { util } from "../../stores/utility.js";
	import { computed } from "@vue/reactivity";

	//CODES
	const env = import.meta.env;

	const users = ref([]);
	const plans = ref([]);
	const userSubs = ref([]);

	const totalSubsAmount = computed(() => {
		return userSubs.value.reduce((p, sub) => {
			const amount = sub.subscription.amount.replace("$", "");
			return p + Number(amount);
		}, 0);
	});

	async function loadUsers() {
		let config = {
			method: "GET",
			url: `${env.VITE_BE_API}/users/`,
		};

		axios
			.request(config)
			.then((response) => {
				console.log(response);
				users.value = response.data.filter((user) => {
					if (user.roles[0].name !== "ADMIN") return user;
				});
			})
			.catch(function (error) {
				console.log(error);
			})
			.finally(() => {});
	}

	async function loadUserSubs() {
		let config = {
			method: "GET",
			url: `${env.VITE_BE_API}/user-subscriptions`,
		};

		axios
			.request(config)
			.then((response) => {
				console.log(response);
				userSubs.value = response.data;
			})
			.catch(function (error) {
				console.log(error);
			})
			.finally(() => {});
	}

	async function loadPlans() {
		let config = {
			method: "GET",
			url: `${env.VITE_BE_API}/subscriptions`,
		};

		axios
			.request(config)
			.then((res) => {
				console.log(res);
				let data = res.data;
				plans.value = data;
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {});
	}

	onMounted(() => {
		loadPlans();
		loadUsers();
		loadUserSubs();
	});
</script>

<template>
	<div
		class="card mb-5 mb-xl-10"
		id="dashboard"
		data-kt-scroll-offset="{default: 100, md: 125}"
	>
		<!--begin::Card header-->
		<div
			class="card-header border-0 cursor-pointer"
			role="button"
			data-bs-toggle="collapse"
			data-bs-target="#kt_account_overview"
		>
			<div class="card-title">
				<h3 class="fw-bold m-0">Dashboard</h3>
			</div>
		</div>
		<!--end::Card header-->

		<!--begin::Content-->
		<div id="kt_account_settings_overview" class="collapse show">
			<!--begin::Card body-->
			<div class="card-body border-top p-9">
				<div class="row align-items-stretched g-4">
					<div
						class="col-xl-6 col-md-6 stretch-card grid-margin grid-margin-sm-0 pb-sm-3"
					>
						<div class="card border-gray-300 h-100">
							<div
								class="card-body d-block d-flex align-items-center justify-content-between"
							>
								<div>
									<span class="d-block h6 fw-bold"
										>Users</span
									>
									<h5 class="h3 fw-bold mb-1">
										{{ users.length }}
									</h5>
								</div>
								<div
									class="icon icon-shape icon-md icon-shape-primary rounded-circle me-3 mb-4 mb-md-0"
								>
									<i class="bi display-6 bi-people-fill"></i>
								</div>
							</div>
						</div>
					</div>
					<div
						class="col-xl-6 col-md-6 stretch-card grid-margin grid-margin-sm-0 pb-sm-3"
					>
						<div class="card border-gray-300 h-100">
							<div
								class="card-body d-block d-flex align-items-center justify-content-between"
							>
								<div>
									<span class="d-block h6 fw-bold">
										Subscription Plans
									</span>
									<h5 class="h3 fw-bold mb-1">
										{{ plans.length }}
									</h5>
								</div>
								<div
									class="icon icon-shape icon-md icon-shape-primary rounded-circle me-3 mb-4 mb-md-0"
								>
									<i
										class="bi display-6 bi-card-checklist"
									></i>
								</div>
							</div>
						</div>
					</div>

					<div class="col-xl-6 col-md-6 stretch-card pb-sm-3 pb-lg-0">
						<div class="card border-gray-300 h-100">
							<div
								class="card-body d-block d-flex align-items-center justify-content-between"
							>
								<div>
									<span class="d-block h6 fw-bold">
										Total Subscriptions
									</span>
									<h5 class="h3 fw-bold mb-1">
										{{ userSubs.length }}
									</h5>
								</div>
								<div
									class="icon icon-shape icon-md icon-shape-primary rounded-circle me-3 mb-4 mb-md-0"
								>
									<i
										class="bi display-6 bi-card-checklist"
									></i>
								</div>
							</div>
						</div>
					</div>

					<div
						class="col-xl-6 col-md-6 stretch-card grid-margin grid-margin-sm-0 pb-sm-3 pb-lg-0 pb-xl-3"
					>
						<div class="card border-gray-300 h-100">
							<div
								class="card-body d-block d-flex align-items-center justify-content-between"
							>
								<div>
									<span class="d-block h6 fw-bold">
										Subscribed Amount
									</span>
									<h5 class="h3 fw-bold mb-1">
										${{ totalSubsAmount }}
									</h5>
								</div>
								<div
									class="icon icon-shape icon-md icon-shape-primary rounded-circle me-3 mb-4 mb-md-0"
								>
									<i class="fa-solid fa-coins display-6"></i>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--end::Card body-->
		</div>
		<!--end::Content-->
	</div>
</template>

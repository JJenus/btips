<script setup>
	import axios from "axios";
	import { inject, onMounted, ref } from "vue";
	import { user } from "@/stores/user";

	const avatar = ref(user.defaultAvatar());
	const User = inject("user", user.getUser());

	const env = import.meta.env;
	const subscriptions = ref([]);

	function openChatApp() {
		window.tidioChatApi.open();
	}

	async function loadSubscriptions() {
		let config = {
			method: "GET",
			url: `${env.VITE_BE_API}/user-subscriptions/${User.value.id}`,
		};

		axios
			.request(config)
			.then((res) => {
				console.log(res.data);
				window.debug.log(res);
				let data = res.data;
				subscriptions.value = data;
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {});
	}

	function status(stat) {
		if (!stat) return "pending";
		return stat;
	}

	onMounted(() => {
		loadSubscriptions();
	});
</script>

<template>
	<div
		class="card mb-5 mb-xl-10"
		id="overview"
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
				<h3 class="fw-bold m-0">Overview</h3>
			</div>
		</div>
		<!--end::Card header-->

		<!--begin::Content-->
		<div id="kt_account_settings_overview" class="collapse show">
			<!--begin::Card body-->
			<div class="card-body border-top p-9">
				<div class="d-flex align-items-start flex-wrap mb-7">
					<div class="d-flex flex-wrap flex-row">
						<!--begin::Avatar-->
						<div
							class="symbol symbol-125px shadow mb-7 me-7 position-relative"
						>
							<img :src="avatar" alt="image" />
						</div>
						<!--end::Avatar-->

						<!--begin::Profile-->
						<div class="d-flex flex-column">
							<div class="d-flex flex-column">
								<div class="fs-2 fw-bold mb-1">
									{{ User.email }}
								</div>
								<a
									href="#"
									class="text-gray-400 text-hover-primary fs-6 fw-semibold mb-5"
								>
									{{ User.email }}
								</a>
							</div>
							<div class="d-flex flex-row align-items-center">
								<div
									v-if="subscriptions.length == 0"
									class="me-6"
								>
									<div
										class="badge badge-light-danger text-danger fw-bold fs-7 me-auto px-4 py-3"
									>
										<i
											class="fa-solid fa-question-circle me-2 text-danger"
										></i>
										Not Subscribed
									</div>
								</div>
								<div>
									<a
										href="#subscription_plans"
										data-kt-scroll-toggle="true"
										class="btn btn-primary btn-sm"
									>
										<i class="fa-solid fa-check-circle"></i>
										Subscribe
									</a>
								</div>
							</div>
						</div>
						<!--end::Profile-->
					</div>
				</div>

				<!--begin::Notice-->
				<div
					class="notice mb-10 d-flex bg-light-warning rounded border-warning border border-dashed rounded p-6"
				>
					<!--begin::Icon-->
					<!--begin::Svg Icon | path: icons/duotune/general/gen044.svg-->
					<span class="svg-icon svg-icon-2tx svg-icon-warning me-4"
						><svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect
								opacity="0.3"
								x="2"
								y="2"
								width="20"
								height="20"
								rx="10"
								fill="currentColor"
							/>
							<rect
								x="11"
								y="14"
								width="7"
								height="2"
								rx="1"
								transform="rotate(-90 11 14)"
								fill="currentColor"
							/>
							<rect
								x="11"
								y="17"
								width="2"
								height="2"
								rx="1"
								transform="rotate(-90 11 17)"
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
							<h4 class="text-gray-900 fw-bold">
								We need your attention!
							</h4>

							<div class="fs-6 text-gray-700">
								Subscribe to a plan now.
								<a href="#subscription_plans">Click to Subscribe</a>
							</div>
						</div>
						<!--end::Content-->
					</div>
					<!--end::Wrapper-->
				</div>
				<!--end::Notice-->

				<div class="mt-4">
					<h1 class="h3 mb-5 mt-4">My Subscriptions</h1>
					<div
						v-if="subscriptions.length == 0"
						class="text-center text-muted"
					>
						No subscriptions found
					</div>
					<div class="row row-cols-md-2 g-4">
						<!--begin::Tab link-->
						<div v-for="plan in subscriptions" class="col h-100">
							<div
								class="btn btn-outline btn-outline-dashed h-100 btn-color-dark border-primary btn-active btn-active-primary d-flex flex-stack text-start p-6"
							>
								<!--end::Description-->
								<div class="d-flex align-items-center me-2">
									<!--begin::Radio-->
									<div
										class="form-check form-check-custom form-check-solid form-check-success flex-shrink-0 me-6"
									>
										<input
											class="form-check-input"
											value=""
											checked
											type="radio"
										/>
									</div>
									<!--end::Radio-->

									<!--begin::Info-->
									<div class="flex-grow-1">
										<div
											class="d-flex align-items-center fs-2 fw-bold flex-wrap"
										>
											{{ plan.subscription.title }}
										</div>
										<div class="fw-semibold opacity-75">
											{{ plan.subscription.description }}
										</div>
									</div>
									<!--end::Info-->
								</div>
								<!--end::Description-->

								<!--begin::Price-->
								<div class="ms-5">
									<span class="mb-2">$</span>

									<span
										class="fs-3x fw-bold"
									>
										{{ plan.subscription.amount }}
									</span>

									<span class="fs-7 opacity-50"
										>/
										<span data-kt-element="period">
											{{ plan.subscription.duration }}
										</span>
									</span>
								</div>
								<!--end::Price-->
							</div>
						</div>
						<!--end::Tab link-->
					</div>
				</div>
			</div>
			<!--end::Card body-->
		</div>
		<!--end::Content-->
	</div>
</template>

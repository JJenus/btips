<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import Plan from "@/components/admin/Plan.vue";

const env = import.meta.env;
const plans = ref([]);

async function loadPlans() {
	let config = {
		method: "GET",
		url: `${env.VITE_BE_API}/subscriptions?type=primary`,
	};

	axios
		.request(config)
		.then((res) => {
			window.debug.log(res);
			let data = res.data;
			plans.value = data;
		})
		.catch((error) => {
			window.debug.log(error);
		})
		.finally(() => {});
}

onMounted(() => {
	loadPlans();
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
				<h3 class="fw-bold m-0">Available Subscriptions</h3>
			</div>
		</div>
		<!--end::Card header-->

		<!--begin::Content-->
		<div class="collapse show">
			<!--begin::Card body-->
			<div class="card-body border-top p-9">
				<!--begin::Notice-->
				<div
					class="notice d-flex bg-light-primary rounded border-primary border border-dashed mb-9 p-6"
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
								Select any of the available subscription plans
								for best outcome or contact supprt for
								personalised plans.
							</div>
						</div>
						<!--end::Content-->
					</div>
					<!--end::Wrapper-->
				</div>
				<!--end::Notice-->

				<!--begin::Items-->
				<div class="py-2 row row-cols-md-2 row-cols-lg-3">
					<Plan v-for="plan in plans" :plan="plan" />
				</div>
				<!--end::Items-->
			</div>
			<!--end::Card body-->
		</div>
		<!--end::Content-->
	</div>
</template>

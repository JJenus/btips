<script setup>
	import { onMounted, ref } from "vue";
	import User from "../../components/admin/User.vue";
	import axios from "axios";
	import { util } from "../../stores/utility.js";

	//CODES
	const env = import.meta.env;

	const users = ref([]);
	const plans = ref([]);
	const searchKey = ref("");

	function loadUsers() {
		let config = {
			method: "GET",
			url: `${env.VITE_BE_API}/users/`,
		};

		axios
			.request(config)
			.then((response) => {
				console.log(response);
				users.value = response.data;
			})
			.catch(function (error) {
				console.log(error);
			})
			.finally(() => {});
	}

	function search(evt) {
		util.search(".user", evt.target.value);
		// console.log(evt.target.value);
	}

	async function loadPlans() {
		let config = {
			method: "GET",
			url: `${env.VITE_BE_API}/subscriptions?type=personal`,
		};

		axios
			.request(config)
			.then((res) => {
				console.log(res);
				let data = res.data;
				plans.value = data;
				loadUsers();
			})
			.catch((error) => {
				console.log(error);
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
		id="users"
		data-kt-scroll-offset="{default: 80, md: 30}"
	>
		<!--begin::Card header-->
		<div
			class="card-header border-0 cursor-pointer d-flex justify-content-between"
			role="button"
			data-bs-toggle="collapse"
		>
			<div class="card-title m-0">
				<h3 class="fw-bold m-0">Users</h3>
			</div>
			<div>
				<input
					@keyup="search($event)"
					type="text"
					class="form-control text-right"
					placeholder="Search users"
				/>
			</div>
		</div>
		<!--end::Card header-->

		<!--begin::Content-->
		<div class="collapse show">
			<!--begin::Card body-->
			<div class="card-body border-top p-9">
				<!--begin::Separator-->
				<div class="separator separator-dashed my-6"></div>
				<!--end::Separator-->

				<!--begin::Notice-->
				<div
					class="notice d-flex bg-light-primary rounded border-primary border border-dashed p-6"
				>
					<!--begin::Icon-->
					<!--begin::Svg Icon | path: icons/duotune/general/gen048.svg-->
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
								d="M20.5543 4.37824L12.1798 2.02473C12.0626 1.99176 11.9376 1.99176 11.8203 2.02473L3.44572 4.37824C3.18118 4.45258 3 4.6807 3 4.93945V13.569C3 14.6914 3.48509 15.8404 4.4417 16.984C5.17231 17.8575 6.18314 18.7345 7.446 19.5909C9.56752 21.0295 11.6566 21.912 11.7445 21.9488C11.8258 21.9829 11.9129 22 12.0001 22C12.0872 22 12.1744 21.983 12.2557 21.9488C12.3435 21.912 14.4326 21.0295 16.5541 19.5909C17.8169 18.7345 18.8277 17.8575 19.5584 16.984C20.515 15.8404 21 14.6914 21 13.569V4.93945C21 4.6807 20.8189 4.45258 20.5543 4.37824Z"
								fill="currentColor"
							/>
							<path
								d="M10.5606 11.3042L9.57283 10.3018C9.28174 10.0065 8.80522 10.0065 8.51412 10.3018C8.22897 10.5912 8.22897 11.0559 8.51412 11.3452L10.4182 13.2773C10.8099 13.6747 11.451 13.6747 11.8427 13.2773L15.4859 9.58051C15.771 9.29117 15.771 8.82648 15.4859 8.53714C15.1948 8.24176 14.7183 8.24176 14.4272 8.53714L11.7002 11.3042C11.3869 11.6221 10.874 11.6221 10.5606 11.3042Z"
								fill="currentColor"
							/>
						</svg>
					</span>
					<!--end::Svg Icon-->
					<!--end::Icon-->

					<!--begin::Wrapper-->
					<div
						class="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap"
					>
						<!--begin::Content-->
						<div class="mb-3 mb-md-0 fw-semibold">
							<h4 class="text-gray-900 fw-bold">Manage Users</h4>

							<div class="fs-6 text-gray-700 pe-7">
								All subscribed users will show here
							</div>
						</div>
						<!--end::Content-->
					</div>
					<!--end::Wrapper-->
				</div>
				<!--end::Notice-->

				<div
					class="mt-3 row g-3 row-cols-1 row-cols-md-2 row-cols-xxl-3 align-items-stretched"
				>
					<div
						v-for="user in users"
						class="col user"
						bis_skin_checked="1"
					>
						<User :user="user" :plans="plans" />
					</div>
				</div>
			</div>
			<!--end::Card body-->
		</div>
		<!--end::Content-->
	</div>
</template>

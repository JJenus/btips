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
				<span class="text-muted">Empty</span>
			</div>
			<!--end::Card body-->
		</div>
		<!--end::Content-->
	</div>
</template>

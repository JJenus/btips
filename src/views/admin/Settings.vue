<script setup>
	import { ref, inject } from "vue";
	import axios from "axios";
	import { alert } from "../../stores/utility";
	import { user as appUser } from "../../stores/user";

	const env = import.meta.env;

	const user = inject("user");
	const permitDelete = ref(false);
	const loading = ref(false);

	function closeAccount() {
		if (permitDelete.value) {
			loading.value = true;
			user.value.status = "deleted";
			let config = {
				method: "PUT",
				url: `${env.VITE_BE_API}/users`,
				data: user.value,
			};
			axios
				.request(config)
				.then((res) => {
					const data = res.data;
					console.log(data);
					appUser.logout();

					alert.error("Account Deleted");

					setTimeout(() => {
						user.logout();
					}, 5000);
				})
				.catch((err) => {
					alert.error("Failed");
					console.log(err);
				})
				.finally(() => {
					loading.value = false;
				});
		} else {
			alert.info("Check yes to permit action");
		}
	}

	function disable() {
		let stat = "disabled";
		if (permitDelete.value) stat = "";
		if (loading.value) stat = "disabled";

		return stat;
	}
</script>

<template>
	<div
		class="card"
		id="settings"
		data-kt-scroll-offset="{default: 80, md: 30}"
	>
		<!--begin::Card header-->
		<div
			class="card-header cursor-pointer"
			role="button"
			data-bs-toggle="collapse"
			aria-expanded="true"
		>
			<div class="card-title m-0">
				<h3 class="fw-bold m-0">Settings</h3>
			</div>
		</div>
		<!--end::Card header-->

		<!--begin::Content-->
		<div class="card-body p-9">
			<span class="text-muted">empty</span>
		</div>
		<!--end::Content-->
	</div>
</template>

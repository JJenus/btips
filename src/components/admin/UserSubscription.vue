<script setup>
	import axios from "axios";
	import { alert } from "../../stores/utility";
	import { inject, ref } from "vue";

	const env = import.meta.env;

	const props = defineProps({
		sub: {
			required: true,
		},
	});
	let subscription = props.sub;
	const loading = ref(false);

	const appUser = inject("user", user.getUser());

	const loadSubscriptions = inject("loadSubs");

	function confirm() {
		subscription.status = "active";

		console.log(subscription);

		let config = {
			method: "PUT",
			url: `${env.VITE_BE_API}/user-subscriptions`,
			data: subscription,
		};

		axios
			.request(config)
			.then((res) => {
				console.log(res);
				const data = res.data;
				if (!data.error) subscription = res.data;
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {});
	}

	function del() {
		console.log(subscription);

		let config = {
			method: "DELETE",
			url: `${env.VITE_BE_API}/user-subscriptions/${subscription.id}`,
		};

		loading.value = true;

		axios
			.request(config)
			.then((res) => {
				console.log("deleted: ");
				loadSubscriptions();
				alert.success("Deleted");
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				loading.value = false;
			});
	}

	function isPending() {
		if (subscription.status == "pending" || subscription.status == null) {
			return true;
		}
		return false;
	}

	function status() {
		return subscription.status || "pending";
	}
</script>

<template>
	<div
		:class="isPending() ? 'border-warning' : 'border-success'"
		class="card border"
	>
		<div class="card-body pb-2 position-relative">
			<div class="d-flex justify-content-between align-items-center">
				<h5 class="m-0 p-0">
					{{ sub.subscription.title }}
					<small class="fs-6 ms-2">
						<small
							style="font-size: xx-small"
							class="badge bg-primary"
						>
							{{ sub.subscription.type }}
						</small>
					</small>
				</h5>

				<div
					class="ms-2 d-flex flex-column justify-content-end align-items-end"
				>
					<span
						style="font-size: xx-small"
						:class="isPending() ? 'bg-warning' : 'bg-success'"
						class="badge"
						>{{ status() }}</span
					>
				</div>
			</div>
			<div
				class="mt-3 fs-6 d-flex justify-content-between align-items-center"
			>
				<span> {{appUser.currency || "USD"}} {{ sub.subscription.amount }} </span>

				<div class="d-flex">
					<a
						v-if="isPending()"
						@click="confirm()"
						class="btn btn-sm btn-primary me-2"
					>
						<i class="fa-solid fa-check-circle"></i>
						Confirm
					</a>
					<button
						@click="del()"
						class="btn-icon ms-2 btn btn-light-danger btn-sm"
					>
						<i class="fa-solid fa-trash-can"></i>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

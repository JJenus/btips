<script setup>
	import axios from "axios";
	import { inject, ref } from "vue";
	import { alert } from "../../stores/utility";

	const env = import.meta.env;

	const props = defineProps({
		plan: {
			required: true,
		},
		admin: {
			required: false,
		},
	});

	const user = inject("user");
	const loading = ref(false);

	const form = ref({
		userId: null,
		subscriptionId: null,
		length: 1,
	});

	function join() {
		loading.value = true;
		form.value.userId = user.value.id;
		form.value.subscriptionId = props.plan.id;


		let config = {
			method: "POST",
			data: form.value,
			url: `${env.VITE_BE_API}/user-subscriptions`,
		};

		const userMessage = `Hello ${user.value.name}, please confirm your request.`;
		const planMessage = `SUBSCRIPTION \n\nPlan: ${props.plan.title} \nAmount: $${props.plan.amount}`;

		axios
			.request(config)
			.then((res) => {
				window.debug.log(res);
				alert.success("Success", "Chat support to activate");
				window.debug.log(userMessage);

				if (window.tidioChatApi) {
					setTimeout(() => {
						window.tidioChatApi.open();
						window.tidioChatApi.messageFromOperator(userMessage);
						window.tidioChatApi.messageFromOperator(planMessage);
					}, 3000);
				}
			})
			.catch((error) => {
				window.debug.log(error);
			})
			.finally(() => {
				loading.value = false;
			});
	}

	function delet() {
		let config = {
			method: "DELETE",
			url: `${env.VITE_BE_API}/subscriptions/${props.plan.id}`,
		};

		axios
			.request(config)
			.then((res) => {
				window.debug.log(res);
				window.location.reload();
			})
			.catch((error) => {
				window.debug.log(error);
			})
			.finally(() => {});
	}
</script>

<template>
	<div class="col-lg-4">
		<div class="d-flex h-100 align-items-center">
			<!--begin::Option-->
			<div
				class="w-100 d-flex position-relative flex-column shadow flex-center rounded-3 bg-gray-100 py-15 px-10"
			>
				<span
					v-if="admin"
					class="ms-3 position-absolute top-0 end-0 m-3 me-5"
				>
					<span
						style="font-size: xx-small"
						:class="
							plan.type == 'personal'
								? 'bg-warning'
								: 'bg-primary'
						"
						class="badge text-miuted pt-1"
						>{{
							plan.type == "primary" ? "general" : plan.type
						}}</span
					>
				</span>
				<!--begin::Heading-->
				<div class="mb-7 text-center">
					<!--begin::Title-->
					<h1 class="text-dark mb-5 fw-bolder">
						{{ plan.title }}
					</h1>
					<!--end::Title-->

					<!--begin::Description-->
					<div class="text-gray-400 fw-semibold mb-5">
						{{ plan.description }}
					</div>
					<!--end::Description-->

					<!--begin::Price-->
					<div class="text-center">
						<span class="mb-2 text-primary">{{user.currency || "$"}}</span>

						<span class="fs-3x fw-bold text-primary">
							{{ plan.amount }}
						</span>

						<span class="fs-7 fw-semibold opacity-50">
							{{ plan.duration }}
						</span>
					</div>
					<!--end::Price-->
				</div>
				<!--end::Heading-->

				<!--begin::Select-->
				<button
					v-if="!admin"
					:class="loading ? 'disabled' : ''"
					@click="join()"
					class="btn btn-primary btn-sm fw-bold rounded-1"
				>
					<span v-if="!loading">Select</span>
					<span
						v-else
						class="spinner-border spinner-border-sm"
					></span>
				</button>
				<!--end::Select-->
				<button
					v-else
					type="button"
					:class="loading ? 'disabled' : ''"
					@click="delet()"
					class="btn btn-light-danger btn-sm fw-bold rounded-1"
				>
					<span v-if="!loading">Delete</span>
					<span
						v-else
						class="spinner-border spinner-border-sm"
					></span>
				</button>
			</div>
			<!--end::Option-->
		</div>
	</div>
</template>

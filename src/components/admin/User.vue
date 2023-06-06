<script setup>
	import { onBeforeMount, provide, ref } from "vue";
	import moment from "moment";
	import axios from "axios";
	import UserModal from "./UserModal.vue";
	import { alert } from "../../stores/utility";

	import { user as User } from "../../stores/user";

	const env = import.meta.env;

	const props = defineProps({
		user: {
			required: true,
		},
		plans: {
			required: true,
		},
	});

	const avatar = ref(User.defaultAvatar());

	const assign = ref(false);

	const form = ref({
		userId: null,
		subscriptionId: null,
		length: 1,
	});

	const subscriptions = ref([]);
	const loading = ref(false);

	function submit(ele) {
		if (!ele.target.checkValidity()) return;
		loading.value = true;
		form.value.userId = props.user.id;
		console.log(form.value);

		let config = {
			method: "POST",
			data: form.value,
			url: `${env.VITE_BE_API}/user-subscriptions`,
		};

		axios
			.request(config)
			.then((res) => {
				// ele.target.reset();
				loadSubscriptions();
				alert.success();
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				loading.value = false;
			});
	}

	async function updateStatus() {
		if (props.user.status !== "new" && props.user.status !== null) return;

		const user = props.user;
		user.status = "active";

		let config = {
			method: "PUT",
			data: user,
			url: `${env.VITE_BE_API}/users`,
		};

		axios
			.request(config)
			.then((res) => {
				console.log("update", res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	async function loadSubscriptions() {
		// console.log("Loading subs");
		let config = {
			method: "GET",
			url: `${env.VITE_BE_API}/user-subscriptions/${props.user.id}`,
		};

		axios
			.request(config)
			.then((res) => {
				// console.log(res);
				let data = res.data;
				subscriptions.value = data;
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {});
	}

	provide("loadSubs", loadSubscriptions);

	function date(strDate) {
		return moment(strDate).format("MMM Do, YYYY");
	}

	function createdAt() {
		return moment(props.user.createdAt).format("MMM Do, YYYY");
	}

	function status() {
		return props.user.status || "New";
	}

	onBeforeMount(() => {
		loadSubscriptions();
	});
</script>

<template>
	<!--begin::Card-->
	<div class="card h-100" bis_skin_checked="1">
		<!--begin::Card body-->
		<div
			class="card-body d-flex flex-center flex-column py-9 px-5"
			bis_skin_checked="1"
		>
			<!--begin::Avatar-->
			<div
				:class="user.imgUrl ? '' : 'shadow-sm border-dashed'"
				class="symbol symbol-65px symbol-circle mb-5"
				bis_skin_checked="1"
			>
				<img :src="user.imgUrl || avatar" alt="image" />
			</div>
			<!--end::Avatar-->

			<!--begin::Name-->
			<a
				href="#"
				class="fs-4 text-gray-800 text-hover-primary fw-bold mb-0"
				>{{ user.name }}</a
			>
			<!--end::Name-->

			<!--begin::Position-->
			<div
				class="fw-semibold text-gray-400 mb-6 text-center"
				bis_skin_checked="1"
			>
				{{ user.email }} <br />
				<span class="fw-bold">Joined:</span> {{ date(user.createdAt) }}
			</div>
			<!--end::Position-->

			<div v-if="!assign" class="d-flex justify-content-center">
				<!--begin::Follow-->
				<button
					class="btn btn-sm btn-light-primary me-2"
					@click="assign = true"
				>
					<i class="fa-solid fa-user-plus"></i>
					Add Plan
				</button>
				<button
					data-bs-toggle="modal"
					:data-bs-target="`#admin-user-modal-${user.id}`"
					class="btn btn-sm btn-light-primary"
				>
					View Plans
					<i class="fa-solid fa-arrow-right ms-2"></i>
				</button>
				<!--end::Follow-->
			</div>

			<div v-else class="mt-2">
				<h6 class="mb-2 d-flex justify-content-between">
					<a
						class="text-dark me-2"
						role="button"
						@click="assign = false"
					>
						<i class="bi bi-arrow-left-short fs-2"></i>
					</a>
					Add personal plan to user
				</h6>
				<form @submit.prevent="submit($event)">
					<label for="" class="label">Plans</label>
					<select
						v-model="form.subscriptionId"
						id="select-plan"
						class="form-select my-2"
						required
					>
						<option v-for="plan in plans" :value="plan.id">
							{{ plan.title }} ${{ plan.amount }}
						</option>
					</select>
					<button
						:class="loading ? 'disabled' : ''"
						type="submit"
						class="btn btn-outline-primary w-100 mt-2"
					>
						<span
							v-if="loading"
							class="spinner-border spinner-border-sm"
						></span>
						<span v-else>Save</span>
					</button>
				</form>
			</div>
		</div>
		<!--begin::Card body-->
	</div>
	<!--begin::Card-->
	<UserModal :user="user" :plans="subscriptions" />
</template>

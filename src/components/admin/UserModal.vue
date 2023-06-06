<script setup>
	import UserSubscription from "./UserSubscription.vue";
	import { util } from "../../stores/utility";

	const props = defineProps({
		user: {
			required: true,
		},
		plans: {
			required: true,
		},
	});

	function search(evt) {
		util.search(".plan", evt.target.value);
	}
</script>

<template>
	<div
		class="modal fade modal-lg"
		:id="`admin-user-modal-${user.id}`"
		tabindex="-1"
		:aria-labelledby="`admin-user-modal-${user.id}`"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-fullscreen-sm-down">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5">
						{{ user.name }}'s subscriptions
					</h1>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
					></button>
				</div>
				<div class="modal-body">
					<div class="d-flex justify-content-end mb-3">
						<form>
							<input
								@keyup="search($event)"
								type="text"
								class="form-control text-left"
								placeholder="search"
							/>
						</form>
					</div>
					<div class="row g-4">
						<div v-for="plan in plans" class="col-md-6 plan">
							<UserSubscription :sub="plan" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

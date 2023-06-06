<script setup>
	import axios from "axios";
	import { inject, ref } from "vue";
	import { alert } from "../../stores/utility";
	import { user } from "../../stores/user";

	const env = import.meta.env;
	const testimonials = inject("testimonials");
	const loading = ref(false);

	const props = defineProps({
		testimony: {
			required: true,
		},
		isUser: {
			required: false,
		},
	});

	function delet() {
		let config = {
			method: "DELETE",
			url: `${env.VITE_BE_API}/testimonials/${props.testimony.id}`,
		};

		loading.value = true;

		axios
			.request(config)
			.then((res) => {
				console.log(res);
				// window.location.href = "/dashboard/testimonials";
				alert.success();
				testimonials();
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				loading.value = false;
			});
	}
</script>

<template>
	<div class="col-md-6 col-xl-4 col-12 mb-4 mb-lg-0 align-items-stretched">
		<div class="card h-100 shadow-sm">
			<div
				class="pe-7 card-body flex-column d-flex align-items-center justify-content-end"
			>
				<!--begin::Text-->
				<div class="mb-7">
					<span class="text-gray-700 d-block fw-semibold fs-4">
						{{ testimony.testimony }}
					</span>
				</div>
				<!--end::Text-->

				<!--begin::Item-->
				<div class="d-flex align-items-center justify-content-between">
					<!--begin::Avatar-->
					<div
						class="symbol symbol-50px border-dashed symbol-circle me-4"
					>
						<img
							:src="testimony.imgUrl || user.defaultAvatar()"
							class=""
							alt=""
						/>
					</div>
					<!--end::Avatar-->

					<!--begin::User-->
					<div class="flex-grow-1">
						<a
							role="button"
							class="text-dark fw-bold text-hover-primary fs-6"
						>
							{{ testimony.userName }}
						</a>

						<div class="d-flex align-items-center mb-0">
							<div
								v-for="i of testimony.rating"
								class="rating-label me-1 checked"
							>
								<i class="bi bi-star-fill fs-6"></i>
							</div>
						</div>
					</div>
					<!--end::User-->

					<button
						v-if="!isUser"
						type="button"
						@click="delet()"
						class="btn btn-light-danger btn-icon ms-4"
					>
						<i v-if="!loading" class="fa-solid fa-trash"></i>
						<span
							v-else
							class="spinner-border spinner-border-sm"
						></span>
					</button>
				</div>
				<!--end::Item-->
			</div>
		</div>
	</div>
</template>

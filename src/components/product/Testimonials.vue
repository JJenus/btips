<script setup>
	import axios from "axios";
	import { onMounted, ref } from "vue";
	import Testimony from "../admin/Testimony.vue";

	const env = import.meta.env;

	const testimonials = ref([]);

	function loadTestifiers() {
		let config = {
			method: "GET",
			url: `${env.VITE_BE_API}/testimonials`,
		};

		axios
			.request(config)
			.then((res) => {
				// window.debug.log(res);
				let data = res.data;
				testimonials.value = data;
			})
			.catch((error) => {
				window.debug.log(error);
			})
			.finally(() => {});
	}

	onMounted(() => {
		loadTestifiers();
	});
</script>

<template>
	<div class="py-10 pt-md-20 mb-lg-5">
		<!--begin::Container-->
		<div class="container">
			<!--begin::Plans-->
			<div class="d-flex flex-column position-relative z-index-2">
				<!--begin::Title-->
				<h1
					class="fs-lg-2tx fs-2x fw-bold text-dark mb-7 mb-lg-15 text-center lh-base"
				>
					Good Rated a Very Strong 5 Star by Users <br />
					Because It’s Strong Quality
				</h1>
				<!--end::Title-->

				<!--begin::Wrapper-->
				<div class="row g-4">
					<!--begin::Item-->
					<Testimony
						v-for="testimony in testimonials"
						:testimony="testimony"
						:is-user="true"
					/>
					<!--end::Item-->
				</div>
				<!--end::Wrapper-->
			</div>
			<!--end::Plans-->
		</div>
		<!--end::Container-->
	</div>
</template>

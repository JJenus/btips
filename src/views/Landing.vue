<script setup>
	import Nav from "../components/product/Nav.vue";
	import HowItWorks from "../components/product/HowItWorks.vue";
	import Features from "../components/product/Features.vue";
	import Testimonials from "../components/product/Testimonials.vue";
	import GliderBanner from "../components/product/GliderBanner.vue";
	import Footer from "../components/product/Footer.vue";
	import Projects from "../components/product/Projects.vue";
	import AuthModal from "../components/AuthModal.vue";
	import { onBeforeMount, provide, ref } from "vue";

	const bodyEl = document.querySelector("#kt_app_body");

	bodyEl.setAttribute("data-bs-target", "#kt_landing_menu");
	bodyEl.setAttribute("data-bs-offset", "200");
	bodyEl.setAttribute("data-kt-app-layout", "light-sidebar");
	bodyEl.setAttribute("data-kt-app-layout", "light-sidebar");

	const env = import.meta.env;

	const signIn = ref(true);
	provide("authMode", signIn);

	async function mountChat() {
		const plugin = document.createElement("script");
		plugin.setAttribute("src", `//code.tidio.co/${env.VITE_TIDIO_KEY}.js`);
		plugin.async = true;
		document.head.appendChild(plugin);
	}

	onBeforeMount(async () => {
		// mountChat();
	});
</script>

<template>
	<AuthModal />

	<!--begin::Body-->
	<!--begin::Theme mode setup on page load-->

	<!--begin::Root-->
	<div class="d-flex flex-column flex-root" id="kt_app_root">
		<!--begin::Header Section-->
		<div class="m-0">
			<!--begin::Header-->
			<Nav />
			<!--end::Header-->

			<!--begin::Landing hero-->
			<div class="mb-lg-20 mx-0 position-relative d-flex justify-content-center align-items-center">
				<div class="w-100 m-0 p-0 z-index-2">
					<GliderBanner />
				</div>
				<!--begin::Container-->
				<div class="position-relative z-index-2 position-absolute">
					<!--begin::Row-->
					<div class="row align-items-center gx-0">
						<!--begin::Col-->
						<div class="col-sm-12">
							<!--begin::Wrapper-->
							<div class="pe-5">
								<!--begin::Title-->
								<h1 class="text-center fw-bold fs-5x fs-md-4x mb-14" id="home">
									{{ $t('hero.title') }}
								</h1>
								<!--end::Title-->

								<!--begin::Action-->
								<div class="d-flex flex-center flex-shrink-0 me-5">
									<!--begin::Link-->
									<button
										data-bs-toggle="modal"
										data-bs-target="#authModal"
										@click="signIn = 'login'"
										class="btn btn-white btn-lg btn-color-gray-700 shadow me-2 flex-shrink-0 my-1 fw-bold btn-active-light-primary"
									>
										{{ $t('auth.signIn') }}
									</button>
									<!--end::Link-->
									<!--begin::Link-->
									<button
										data-bs-toggle="modal"
										data-bs-target="#authModal"
										@click="signIn = 'create'"
										class="btn btn-primary btn-lg flex-shrink-0 fw-bold me-2 me-md-4 my-1"
									>
										{{ $t('auth.signUp') }}
									</button>
									<!--end::Link-->
								</div>
								<!--end::Action-->
							</div>
							<!--end::Wrapper-->
						</div>
						<!--end::Col-->
					</div>
					<!--end::Row-->
				</div>
				<!--end::Container-->
			</div>
			<!--end::Landing hero-->
		</div>
		<!--end::Header Section-->

		<!--begin::How It Works Section-->
		<HowItWorks />
		<!--end::How It Works Section-->

		<!--begin::Features section-->
		<Features />
		<!--end::Features section-->

		<!--begin::Testimonials section-->
		<Testimonials />
		<!--end::Testimonials section-->

		<!--begin::Pricing post-->
		<div class="pt-lg-20 mb-lg-20 mb-12 d-flex mt-5">
			<div class="container position-relative row">
				<div class="col-md-8 pe5">
					<h3 class="fs-lg-2tx fs-2x fw-bold text-gray-900 fw-bold mb-7 lh-base">
						{{ $t('pricing.title') }}
					</h3>
					<span class="text-gray-700 d-block fw-semibold fs-4 pb-5 lh-lg">
						{{ $t('pricing.description') }}
					</span>
				</div>
			</div>
		</div>
		<!--end::Pricing post-->

		<!--begin::Projects Section-->
		<Projects />
		<!--end::Projects Section-->

		<!--begin::Footer Section-->
		<Footer />
		<!--end::Footer Section-->
	</div>
	<!--end::Root-->
</template>


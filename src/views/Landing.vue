<script setup>
import Nav from "../components/product/Nav.vue";
import HowItWorks from "../components/product/HowItWorks.vue";
import Features from "../components/product/Features.vue";
import Testimonials from "../components/product/Testimonials.vue";
import GliderBanner from "../components/product/GliderBanner.vue";
import Footer from "../components/product/Footer.vue";
import Projects from "../components/product/Projects.vue";
import AuthModal from "../components/AuthModal.vue";
import { provide, ref } from "vue";

const bodyEl = document.querySelector("#kt_app_body");

bodyEl.setAttribute("data-bs-target", "#kt_landing_menu");
bodyEl.setAttribute("data-bs-offset", "200");
bodyEl.setAttribute("data-kt-app-layout", "light-sidebar");
bodyEl.setAttribute("data-kt-app-layout", "light-sidebar");

const signIn = ref(true);
provide("authMode", signIn);
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
			<div
				class="mb-lg-20 mx-0 position-relative d-flex justify-content-center align-items-center"
			>
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
								<h1
									class="text-center fw-bold fs-5x fs-md-4x mb-14"
									id="home"
								>
									The <br />
									Bettors <br />
									Tips
								</h1>
								<!--end::Title-->

								<!--begin::Action-->
								<div
									class="d-flex flex-center flex-shrink-0 me-5"
								>
									<!--begin::Link-->
									<button
										data-bs-toggle="modal"
										data-bs-target="#authModal"
										@click="signIn = true"
										class="btn btn-white btn-lg btn-color-gray-700 shadow me-2 flex-shrink-0 my-1 fw-bold btn-active-light-primary"
									>
										Sign In
									</button>
									<!--end::Link-->
									<!--begin::Link-->
									<button
										data-bs-toggle="modal"
										data-bs-target="#authModal"
										@click="signIn = false"
										class="btn btn-primary btn-lg flex-shrink-0 fw-bold me-2 me-md-4 my-1"
									>
										Sign Up
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

				<!--begin::Image-->
				<div
					class="position-absolute top-0 end-0 overflow-hidden w-150px h-450px h-lg-auto w-lg-auto"
				>
					<img src="/assets/media/svg/layout/1.svg" class=" " alt="" />
				</div>
				<!--end::Image-->
			</div>
			<!--end::Landing hero-->
		</div>
		<!--end::Header Section-->

		<!--begin::How It Works Section-->
		<HowItWorks />
		<!--end::How It Works Section-->
		<div class="mb-0">
			<!--begin::Wrapper-->

			<!--begin::Fatures section-->
			<Features />
			<!--end::Fatures section-->

			<!--begin::Visual section-->
			<Testimonials />
			<!--end::Visual section-->

			<!--end::Wrapper-->
		</div>

		<!--begin::Pricing post-->
		<div class="pt-lg-20 mb-lg-20 mb-12 d-flex mt-5">
			<!--begin::Container-->
			<div class="container position-relative row">
				<!--begin::Wrapper-->
				<div class="col-md-8 pe5">
					<!--begin::Content-->
					<div class="mb-11 position-relative z-index-3">
						<!--begin::Title-->
						<h3
							class="fs-lg-2tx fs-2x fw-bold text-gray-900 fw-bold mb-7 lh-base"
						>
							Bettorstips - Your All-in-One Solution for Betting
							Success!
						</h3>
						<!--end::Title-->

						<!--begin::Text-->
						<span
							class="text-gray-700 d-block fw-semibold fs-4 pb-5 lh-lg"
						>
							Experience the power of instant results, a seamless
							user experience, and reliable predictions all in one
							place. With "Bettorstips" your betting journey is
							simplified, giving you the ultimate advantage to
							maximize your chances of success. Trust in our
							platform to deliver accurate predictions, providing
							you with the insights you need to make informed
							decisions. Say goodbye to uncertainty and embrace a
							streamlined betting experience with "Bettorstips".
						</span>
						<!--end::Text-->

						<!--begin::Text-->
						<span class="text-gray-700 fw-semibold fs-4 lh-lg">
							In fact "Bettorstips" offers instant results, a
							seamless user experience, and reliable predictions,
							simplifying your betting journey and maximizing your
							chances of success.
						</span>
						<!--end::Text-->
					</div>
					<!--end::Content-->

					<!--begin::Item-->
					<div class="d-flex mb-lg-15 position-relative z-index-3">
						<!--begin::Item-->
						<div class="me-lg-19 me-7">
							<div class="text-dark fw-semibold fs-1">
								<span
									class="m-0"
									data-kt-countup="true"
									data-kt-countup-value="100"
									>0</span
								>
								%
							</div>

							<span class="text-gray-700 d-block fw-semibold fs-4"
								>Satisfication</span
							>
						</div>
						<!--end::Item-->

						<!--begin::Item-->
						<div class="me-lg-19 me-7">
							<div class="text-dark fw-semibold fs-1">
								<span
									class="m-0"
									data-kt-countup="true"
									data-kt-countup-value="124"
									>0</span
								>
								K
							</div>

							<span class="text-gray-700 d-block fw-semibold fs-4"
								>Customers</span
							>
						</div>
						<!--end::Item-->

						<!--begin::Item-->
						<div class="me-lg-19 me-7">
							<div class="text-dark fw-semibold fs-1">
								<span
									class="m-0"
									data-kt-countup="true"
									data-kt-countup-value="24"
									data-kt-countup-prefix="$"
									>0</span
								>
								K
							</div>

							<span class="text-gray-700 d-block fw-semibold fs-4"
								>Transactions</span
							>
						</div>
						<!--end::Item-->
					</div>
					<!--end::Item-->
				</div>
				<!--end::Wrapper-->

				<div class="col-md-4 mx-n5">
					<img
						src="/assets/media/svg/illustrations/easy-2/4.svg"
						class="position-absolute ms-5 top-50 end-0 translate-middle z-index-2 w-200px w-lg-auto d-none d-md-block"
						alt=""
					/>
				</div>
			</div>
			<!--end::Container-->

			<!--begin::Content-->
			<div class="position-relative">
				<img
					src="/assets/media/svg/layout/2.svg"
					class="position-absolute top-50 end-0 translate-middle-y overflow-hidden w-250px w-lg-350px h-lg-auto w-xl-auto"
					alt=""
				/>
			</div>
			<!--end::Content-->
		</div>
		<!--end::Pricing post-->

		<!--begin::Projects Section-->
		<Projects />
		<!--end::Projects Section-->

		<!--begin::Footer Section-->
		<Footer />
		<!--end::Footer Section-->
	</div>
	<!--end::Root--><!--begin::Engage drawers-->
</template>

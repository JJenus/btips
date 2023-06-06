<script setup>
const AppName = import.meta.env.VITE_APP_NAME;
</script>

<template>
	<div class="mb-0">
		<!--begin::Wrapper-->
		<div class="landing-dark-bg pt-lg-20 pt-5">
			<!--begin::Container-->
			<div class="container">
				<!--begin::Row-->
				<div class="row py-10 py-lg-20">
					<!--begin::Col-->
					<div class="col-lg-6 mb-10 mb-lg-0">
						<!--begin::Block-->
						<div class="rounded landing-border p-9 mb-6">
							<!--begin::Title-->
							<h2 class="text-gray-900 fw-semibold mb-3">
								Do you need a Seemless Communication?
							</h2>
							<!--end::Title-->

							<!--begin::Text-->
							<span class="fw-normal fs-4 text-gray-600">
								Email us to

								<a
									href="mailto:support@thebettortips.com"
									class="fw-semibold fs-4 text-gray-800 text-hover-primary"
								>
									support@thebettortips.com
								</a>
							</span>
							<!--end::Text-->
						</div>
						<!--end::Block-->

						<!--begin::Block-->
						<div class="rounded landing-border p-9">
							<!--begin::Title-->
							<h2 class="text-gray-900 fw-semibold mb-3">
								How About You Start Winning?
							</h2>
							<!--end::Title-->

							<!--begin::Text-->
							<span class="fw-normal fs-4 text-gray-700">
								Sign up now to have a beautiful journey

								<a
									class="fw-semibold fs-4 text-gray-800 text-hover-primary"
									>Click to Sign Up</a
								>
							</span>
							<!--end::Text-->
						</div>
						<!--end::Block-->
					</div>
					<!--end::Col-->

					<!--begin::Col-->
					<div class="col-lg-6">
						<!--begin::Navs-->
						<div class="d-flex justify-content-center">
							<!--begin::Links-->
							<div
								class="d-flex fw-semibold flex-column me-20 d-none"
							>
								<!--begin::Subtitle-->
								<h4 class="fw-bold text-gray-900 mb-6">
									More for Good
								</h4>
								<!--end::Subtitle-->

								<!--begin::Link-->
								<a
									href="https://keenthemes.com/faqs"
									class="text-gray-700 text-hover-primary fs-5 mb-6"
									>FAQ</a
								>
								<!--end::Link-->

								<!--begin::Link-->
								<a
									href="documentation/getting-started.html"
									class="text-gray-700 text-hover-primary fs-5 mb-6"
									>Documentaions</a
								>
								<!--end::Link-->

								<!--begin::Link-->
								<a
									href="https://www.youtube.com/c/KeenThemesTuts/videos"
									class="text-gray-700 text-hover-primary fs-5 mb-6"
									>Video Tuts</a
								>
								<!--end::Link-->

								<!--begin::Link-->
								<a
									href="documentation/getting-started/changelog.html"
									class="text-gray-700 text-hover-primary fs-5 mb-6"
									>Changelog</a
								>
								<!--end::Link-->

								<!--begin::Link-->
								<a
									href="https://devs.keenthemes.com/"
									class="text-gray-700 text-hover-primary fs-5 mb-6"
									>Support Forum</a
								>
								<!--end::Link-->

								<!--begin::Link-->
								<a
									href="https://keenthemes.com/blog"
									class="text-gray-700 text-hover-primary fs-5"
									>Blog</a
								>
								<!--end::Link-->
							</div>
							<!--end::Links-->

							<!--begin::Links-->
							<div
								class="d-flex fw-semibold flex-column ms-lg-20"
							>
								<!--begin::Subtitle-->
								<h4 class="fw-bold text-gray-900 mb-6">
									Stay Connected
								</h4>
								<!--end::Subtitle-->

								<!--begin::Link-->
								<a class="mb-6">
									<img
										src="/assets/media/svg/brand-logos/facebook-4.svg"
										class="h-20px me-2"
										alt=""
									/>

									<span
										class="text-gray-700 text-hover-primary fs-5 mb-6"
										>Facebook</span
									>
								</a>
								<!--end::Link-->

								<!--begin::Link-->
								<a class="mb-6">
									<img
										src="/assets/media/svg/brand-logos/twitter.svg"
										class="h-20px me-2"
										alt=""
									/>

									<span
										class="text-gray-700 text-hover-primary fs-5 mb-6"
										>Twitter</span
									>
								</a>
								<!--end::Link-->

								<!--begin::Link-->

								<!--end::Link-->

								<!--begin::Link-->
								<a class="mb-6">
									<img
										src="/assets/media/svg/brand-logos/instagram-2016.svg"
										class="h-20px me-2"
										alt=""
									/>

									<span
										class="text-gray-700 text-hover-primary fs-5 mb-6"
										>Instagram</span
									>
								</a>
								<!--end::Link-->
							</div>
							<!--end::Links-->
						</div>
						<!--end::Navs-->
					</div>
					<!--end::Col-->
				</div>
				<!--end::Row-->
			</div>
			<!--end::Container-->

			<!--begin::Separator-->
			<div class="separator separator-solid"></div>
			<!--end::Separator-->

			<!--begin::Container-->
			<div class="container">
				<!--begin::Wrapper-->
				<div class="d-flex flex-column flex-md-row flex-stack py-8">
					<!--begin::Copyright-->
					<div class="d-flex align-items-center order-2 order-md-1">
						<!--begin::Logo-->
						<a href="landing.html">
							<img
								alt="Logo"
								src="/assets/media/logos/logo-default.png"
								class="h-15px h-md-25px"
							/>
						</a>
						<!--end::Logo image-->

						<!--begin::Logo image-->
						<span
							class="mx-5 fs-6 fw-semibold text-gray-700 pt-1"
							href="https://keenthemes.com/"
						>
							Copyright &copy; {{ AppName }} 2023
						</span>
						<!--end::Logo image-->
					</div>
					<!--end::Copyright-->

					<!--begin::Menu-->
					<ul
						class="menu menu-gray-700 menu-hover-primary d-none fw-semibold fs-5 fs-md-5 order-1 mb-5 mb-md-0"
					>
						<li class="menu-item">
							<a
								href="https://keenthemes.com/"
								target="_blank"
								class="menu-link px-2"
								>About</a
							>
						</li>

						<li class="menu-item">
							<a
								href="https://devs.keenthemes.com/"
								target="_blank"
								class="menu-link px-2"
								>Support</a
							>
						</li>

						<li class="menu-item">
							<a
								href="https://themes.getbootstrap.com/product/good-bootstrap-5-admin-dashboard-template"
								target="_blank"
								class="menu-link px-2"
								>Purchase</a
							>
						</li>
					</ul>
					<!--end::Menu-->
				</div>
				<!--end::Wrapper-->
			</div>
			<!--end::Container-->
		</div>
		<!--end::Wrapper-->
	</div>

	<!--begin::Scrolltop-->
	<div id="kt_scrolltop" class="scrolltop" data-kt-scrolltop="true">
		<!--begin::Svg Icon | path: icons/duotune/arrows/arr066.svg-->
		<span class="svg-icon"
			><svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect
					opacity="0.5"
					x="13"
					y="6"
					width="13"
					height="2"
					rx="1"
					transform="rotate(90 13 6)"
					fill="currentColor"
				/>
				<path
					d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z"
					fill="currentColor"
				/>
			</svg>
		</span>
		<!--end::Svg Icon-->
	</div>
	<!--end::Scrolltop-->
</template>

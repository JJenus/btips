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
								{{ $t("footer.seamlessCommunication.title") }}
							</h2>
							<!--end::Title-->

							<!--begin::Text-->
							<span class="fw-normal fs-4 text-gray-600">
								{{ $t("footer.seamlessCommunication.description") }}
								<a
									href="mailto:support@thebettortips.com"
									class="fw-semibold fs-4 text-gray-800 text-hover-primary"
								>
									{{ $t("footer.seamlessCommunication.email") }}
								</a>
							</span>
							<!--end::Text-->
						</div>
						<!--end::Block-->

						<!--begin::Block-->
						<div class="rounded landing-border p-9">
							<!--begin::Title-->
							<h2 class="text-gray-900 fw-semibold mb-3">
								{{ $t("footer.startWinning.title") }}
							</h2>
							<!--end::Title-->

							<!--begin::Text-->
							<span class="fw-normal fs-4 text-gray-700">
								{{ $t("footer.startWinning.description") }}
								<a class="fw-semibold fs-4 text-gray-800 text-hover-primary">
									{{ $t("footer.startWinning.cta") }}
								</a>
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
							<div class="d-flex fw-semibold flex-column me-20 d-none">
								<!--begin::Subtitle-->
								<h4 class="fw-bold text-gray-900 mb-6">
									{{ $t("footer.moreForGood.title") }}
								</h4>
								<!--end::Subtitle-->

								<!--begin::Links-->
								<a href="#" class="text-gray-700 text-hover-primary fs-5 mb-6">
									{{ $t("footer.moreForGood.links.faq") }}
								</a>
								<a href="#" class="text-gray-700 text-hover-primary fs-5 mb-6">
									{{ $t("footer.moreForGood.links.documentation") }}
								</a>
								<a href="#" class="text-gray-700 text-hover-primary fs-5 mb-6">
									{{ $t("footer.moreForGood.links.videoTuts") }}
								</a>
							</div>
							<!--end::Links-->

							<!--begin::Links-->
							<div class="d-flex fw-semibold flex-column ms-lg-20">
								<h4 class="fw-bold text-gray-900 mb-6">
									{{ $t("footer.stayConnected.title") }}
								</h4>
								<a class="mb-6">{{ $t("footer.stayConnected.socials.facebook") }}</a>
								<a class="mb-6">{{ $t("footer.stayConnected.socials.twitter") }}</a>
								<a class="mb-6">{{ $t("footer.stayConnected.socials.instagram") }}</a>
							</div>
							<!--end::Links-->
						</div>
						<!--end::Navs-->
					</div>
					<!--end::Col-->
				</div>
			</div>
			<!--begin::Separator-->
			<div class="separator separator-solid"></div>
			<!--begin::Container-->
			<div class="container">
				<div class="d-flex flex-column flex-md-row flex-stack py-8">
					<span class="mx-5 fs-6 fw-semibold text-gray-700 pt-1">
						Copyright &copy; {{ AppName }} 2023
					</span>
				</div>
			</div>
		</div>
	</div>
</template>
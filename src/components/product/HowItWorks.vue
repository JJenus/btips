<script setup></script>

<template>
	<div class="mb-9 pt-15 z-index-2">
		<!--begin::Container-->
		<div class="container">
			<!--begin::Title-->
			<h3
				class="fs-lg-2tx fs-2x text-dark text-center mb-16 lh-base"
				id="how-it-works"
			>
				{{ $t("howItWorks.title") }}
			</h3>
			<!--end::Title-->

			<!--begin::Row-->
			<div class="row gy-10 mb-md-20">
				<!--begin::Col-->

				<div v-for="i in 3" :key="i" class="col-sm-4">
					<!--begin::Story-->
					<div class="text-center mb-10 mb-md-0">
						<!--begin::Illustration-->
						<img
							:src="$t(`howItWorks.steps.${i}.image`)"
							class="mb-11 h-125px"
							alt=""
						/>
						<!-- end::Illustration -->

						<!--begin::Heading-->
						<div class="d-flex flex-center mb-5">
							<!--begin::Badge-->
							<span
								class="badge badge-circle badge-light-danger fw-bold p-5 me-3 fs-3"
							>
								{{ i }}
							</span>
							<!--end::Badge-->

							<!--begin::Title-->
							<div class="fs-5 fs-lg-3 fw-bold text-dark">
								{{ $t(`howItWorks.steps.${i}.title`) }}
								<span class="text-muted">{{
									$t(`howItWorks.steps.${i}.subtitle`)
								}}</span>
							</div>
							<!--end::Title-->
						</div>
						<!--end::Heading-->

						<!--begin::Description-->
						<div class="fw-semibold fs-6 fs-lg-4 text-gray-700">
							{{ $t(`howItWorks.steps.${i}.description`) }}
						</div>
						<!--end::Description-->
					</div>
					<!--end::Story-->
				</div>
				<!--end::Col-->
			</div>
			<!--end::Row-->
		</div>
		<!--end::Container-->
	</div>
</template>

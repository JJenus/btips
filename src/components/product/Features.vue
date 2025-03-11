<template>
	<!--begin::Fatures section-->
	<div class="container-xxl">
		<!--begin::Title-->
		<h3
			class="fs-lg-2tx fs-2x text-dark text-center mb-7 mb-lg-16 lh-base position-relative z-index-2"
			id="fatures"
			data-kt-scroll-offset="{default: 100, lg: 150}"
		>
			{{ $t("features.title") }}
		</h3>
		<!--end::Title-->

		<!--begin::Row-->
		<div class="row mb-10 mb-lg-20 pb-lg-17">
			<!--begin::Col-->
			<div class="col-md-6">
				<!--begin::Section-->
				<div class="position-relative z-index-2 d-none d-md-block">
					<!--begin::Images-->
					<img
						src="https://img.freepik.com/premium-vector/football-soccer-abstract-background-soccer-field-soccer-field-illustration-vector_731129-192.jpg?w=2000"
						class="w-100 z-index-2"
						alt=""
					/>
				</div>
				<!--end::Section-->

				<img
					src="/assets/media/svg/layout/3.svg"
					class="position-absolute start-0 translate-middle-y overflow-hidden w-300px h-lg-auto w-lg-550px z-index-1"
					style="margin-top: 250px"
					alt=""
				/>
			</div>
			<!--end::Col-->

			<!--begin::Col-->
			<div class="col-md-6">
				<!--begin::Items-->
				<div class="pt-6">
					<!--begin::Item-->
					<div
						v-for="i in 4"
						:key="i"
						class="d-flex align-items-top position-relative z-index-2 mb-7 mb-lg-16"
					>
						<!--begin::Symbol-->
						<div class="symbol symbol-50px me-5 me-lg-9 pt-1">
							<span class="symbol-label bg-light">
								<span :class="`svg-icon svg-icon-2x `">
									<i
										:class="
											$t(`features.steps.${i}.icon`) +
											` ${$t(
												`features.steps.${i}.iconClass`
											)}`
										"
										class="fs-1"
									></i>
								</span>
							</span>
						</div>
						<!--end::Symbol-->

						<!--begin::Text-->
						<div class="d-flex flex-column">
							<span
								class="text-dark text-hover-primary fs-3 fw-bold mb-3"
							>
								{{ $t(`features.steps.${i}.title`) }}
							</span>

							<span class="text-gray-700 fw-semibold fs-4">
								{{ $t(`features.steps.${i}.description`) }}
							</span>
						</div>
						<!--end::Text-->
					</div>
					<!--end::Item-->
				</div>
				<!--end::Items-->
			</div>
			<!--end::Col-->
		</div>
		<!--end::Row-->
	</div>
	<!--end::Fatures section-->
</template>

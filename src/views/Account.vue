<script setup>
	import { user } from "../stores/user";
	import { onBeforeMount, provide, ref, watch } from "vue";
	import axios from "axios";
	import { useI18n } from "vue-i18n"; // Import useI18n

	import Header from "../components/app/Header.vue";
	import Footer from "../components/app/Footer.vue";
	import Navs from "../components/app/Navs.vue";
	import Overview from "./app/Overview.vue";
	import Tips from "./app/Tips.vue";
	import ProfileDetails from "./app/ProfileDetails.vue";
	import Subscriptions from "./app/Subscriptions.vue";
	import DeactivateAccount from "./app/DeactivateAccount.vue";
	import { util } from "../stores/utility";

	const { t } = useI18n(); // Destructure t from useI18n

	const env = import.meta.env;

	const AppName = env.VITE_APP_NAME;
	const User = ref(user.getUser());
	provide("user", User);

	const navs = ref([]);

	const initNavs = () => {
		navs.value = [
			{
				name: t("app.navs.overview"), // Use t() for translations
				target: "#overview",
			},
			{
				name: t("app.navs.tips"), // Use t() for translations
				target: "#tips",
			},
			{
				name: t("app.navs.subscriptionPlans"), // Use t() for translations
				target: "#subscription_plans",
			},
			{
				name: t("app.navs.profileDetails"), // Use t() for translations
				target: "#profile_details",
			},
			{
				name: t("app.navs.deactivateAccount"), // Use t() for translations
				target: "#deactivate_account",
			},
		];
	};

	watch(util.lang, (newVal) => {
		initNavs();
	});

	const bodyEl = document.querySelector("#kt_app_body");
	bodyEl.setAttribute("data-kt-app-layout", "overlay");
	bodyEl.setAttribute("data-kt-app-sidebar-push-header", "false");
	bodyEl.setAttribute("data-kt-app-sidebar-push-toolbar", "true");
	bodyEl.setAttribute("data-kt-app-sidebar-push-footer", "true");

	async function loadUser() {
		let config = {
			method: "GET",
			url: `${env.VITE_BE_API}/users/${User.value.id}`,
		};

		await axios
			.request(config)
			.then((response) => {
				User.value = response.data;
			})
			.catch((error) => {
				console.log(error);
			});
	}

	async function mountChat() {
		const plugin = document.createElement("script");
		plugin.setAttribute("src", `//code.tidio.co/${env.VITE_TIDIO_KEY}.js`);
		plugin.async = true;
		document.head.appendChild(plugin);
	}

	initNavs();

	onBeforeMount(async () => {
		// mountChat();
		await loadUser();
	});
</script>

<template>
	<!--begin::App-->
	<div class="d-flex flex-column flex-root app-root" id="kt_app_root">
		<!--begin::Page-->
		<div class="app-page flex-column flex-column-fluid" id="kt_app_page">
			<!--begin::Header-->
			<Header :navs="navs" :account="'Overview'" />
			<!--end::Header-->
			<!--begin::Wrapper-->
			<div
				class="app-wrapper flex-column flex-row-fluid"
				id="kt_app_wrapper"
			>
				<!--begin::Main-->
				<div
					class="app-main flex-column flex-row-fluid"
					id="kt_app_main"
				>
					<!--begin::Content wrapper-->
					<div class="d-flex flex-column flex-column-fluid">
						<!--begin::Content-->
						<div
							id="kt_app_content"
							class="app-content flex-column-fluid"
						>
							<!--begin::Content container-->
							<div
								id="kt_app_content_container"
								class="app-container container-xxl"
							>
								<div class="d-flex flex-column flex-lg-row">
									<!--begin::Aside-->
									<div
										class="flex-column flex-md-row-auto w-100 w-lg-250px w-xxl-275px"
									>
										<!--begin::Nav-->
										<div
											class="card mb-6 mb-xl-9 d-none d-lg-block nav-sticky-top"
											data-kt-sticky="true"
											data-kt-sticky-name="account-settings"
											data-kt-sticky-offset="{default: false, lg: 300}"
											data-kt-sticky-width="{lg: '250px', xxl: '275px'}"
											data-kt-sticky-left="auto"
											data-kt-sticky-top="100px"
											data-kt-sticky-zindex="95"
										>
											<!--begin::Card body-->
											<div class="card-body py-10 px-6">
												<!--begin::Menu-->
												<Navs :navs="navs" />
												<!--end::Menu-->
											</div>
											<!--end::Card body-->
										</div>
										<!--end::Nav-->
									</div>
									<!--end::Aside-->

									<!--begin::Layout-->
									<div class="flex-md-row-fluid ms-lg-12">
										<!--begin::Overview-->
										<Overview />
										<!--end::Overview-->
										<!--begin::Sign-in Method-->
										<Tips />
										<!--end::Sign-in Method-->

										<!--begin::Connected Accounts-->
										<Subscriptions />
										<!--end::Connected Accounts-->

										<!--begin::Basic info-->
										<ProfileDetails />
										<!--end::Basic info-->

										<!--begin::Deactivate Account-->
										<DeactivateAccount />
										<!--end::Deactivate Account-->
									</div>
									<!--end::Layout-->
								</div>
							</div>
							<!--end::Content container-->
						</div>
						<!--end::Content-->
					</div>
					<!--end::Content wrapper-->

					<!--begin::Footer-->
					<Footer />
					<!--end::Footer-->
				</div>
				<!--end:::Main-->
			</div>
			<!--end::Wrapper-->
		</div>
		<!--end::Page-->
	</div>
	<!--end::App-->
</template>

<style scoped>
	@media (max-width: 992px) {
		.c-sticky-top {
			position: sticky;
			top: 0;
			right: 0;
			left: 0;
			z-index: 1030;
		}
	}
</style>
